// Where PayU returns the customer after payment (both surl and furl).
//
// Nothing here trusts the browser: the posted hash is re-computed with the
// merchant salt, then confirmed a second time straight from PayU's servers
// (their Verify API) before the order is written into Shopify.

import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";
import { cartGet } from "@/lib/shopify/cart";
import { CART_COOKIE, PENDING_ORDER_COOKIE } from "@/lib/shopify/cart-cookie";
import { verifyPayuResponse, verifyPaymentWithPayu } from "@/lib/payu/client";
import { createPaidOrder, shopifyAdminConfigured } from "@/lib/shopify/admin";
import { shippingFor } from "@/lib/checkout-config";

export const dynamic = "force-dynamic";

interface PendingOrder {
  txnid: string;
  cartId: string;
  customer: {
    email: string;
    phone?: string;
    firstName: string;
    lastName?: string;
    address1?: string;
    address2?: string;
    city?: string;
    province?: string;
    zip?: string;
    country?: string;
  };
}

function redirect(request: NextRequest, path: string) {
  return NextResponse.redirect(new URL(path, request.url), 303);
}

export async function POST(request: NextRequest) {
  const form = await request.formData();
  const p: Record<string, string> = {};
  for (const [k, v] of form.entries()) p[k] = String(v);

  const txnid = p.txnid ?? "";

  // 1. The postback must be signed with our salt.
  if (!verifyPayuResponse(p)) {
    console.error("[payu] response hash mismatch", { txnid, status: p.status });
    return redirect(request, "/order/failed?reason=verification");
  }

  if ((p.status ?? "").toLowerCase() !== "success") {
    return redirect(
      request,
      `/order/failed?reason=declined${p.error_Message ? "" : ""}`
    );
  }

  // 2. Independent confirmation from PayU (the browser could be replaying).
  const verified = await verifyPaymentWithPayu(txnid);
  if (!verified || verified.status !== "success") {
    console.error("[payu] verify API did not confirm", { txnid, verified });
    return redirect(request, "/order/failed?reason=unconfirmed");
  }

  const jar = await cookies();
  const raw = jar.get(PENDING_ORDER_COOKIE)?.value;
  if (!raw) {
    // Payment succeeded but we cannot tie it to a bag (expired/blocked cookie).
    // Never silently drop it — this needs manual reconciliation.
    console.error("[payu] PAID BUT NO PENDING ORDER — reconcile manually", {
      txnid,
      mihpayid: verified.mihpayid,
      amount: verified.amount,
    });
    return redirect(request, `/order/confirmed?ref=${encodeURIComponent(txnid)}&pending=1`);
  }

  let pending: PendingOrder;
  try {
    pending = JSON.parse(raw) as PendingOrder;
  } catch {
    console.error("[payu] unreadable pending order cookie", { txnid });
    return redirect(request, `/order/confirmed?ref=${encodeURIComponent(txnid)}&pending=1`);
  }

  // 3. Rebuild the order from Shopify and re-check the amount actually paid.
  const cart = await cartGet(pending.cartId);
  if (!cart || cart.lines.length === 0) {
    console.error("[payu] PAID BUT CART GONE — reconcile manually", {
      txnid,
      mihpayid: verified.mihpayid,
    });
    return redirect(request, `/order/confirmed?ref=${encodeURIComponent(txnid)}&pending=1`);
  }

  const subtotal = cart.subtotal;
  const shipping = shippingFor(subtotal);
  const expected = subtotal + shipping;
  const paid = Number(verified.amount || p.amount || 0);

  if (Math.abs(paid - expected) > 1) {
    console.error("[payu] amount mismatch — not creating order", {
      txnid,
      paid,
      expected,
    });
    return redirect(request, "/order/failed?reason=amount");
  }

  // 4. Write the paid order into Shopify.
  if (!shopifyAdminConfigured) {
    console.error("[payu] PAID BUT ADMIN API NOT CONFIGURED — reconcile manually", {
      txnid,
      mihpayid: verified.mihpayid,
    });
    return redirect(request, `/order/confirmed?ref=${encodeURIComponent(txnid)}&pending=1`);
  }

  try {
    const order = await createPaidOrder({
      lines: cart.lines.map((l) => ({
        merchandiseId: l.merchandiseId,
        quantity: l.quantity,
        attributes: l.attributes,
      })),
      customer: pending.customer,
      amountPaid: paid,
      shipping,
      txnid,
      mihpayid: verified.mihpayid,
      paymentMode: p.mode,
    });

    // Order placed — retire the bag and the pending record.
    jar.delete(PENDING_ORDER_COOKIE);
    jar.delete(CART_COOKIE);

    return redirect(
      request,
      `/order/confirmed?ref=${encodeURIComponent(order.name || txnid)}`
    );
  } catch (e) {
    console.error("[payu] PAID BUT SHOPIFY ORDER FAILED — reconcile manually", {
      txnid,
      mihpayid: verified.mihpayid,
      error: e instanceof Error ? e.message : String(e),
    });
    return redirect(request, `/order/confirmed?ref=${encodeURIComponent(txnid)}&pending=1`);
  }
}

/** PayU always posts; a GET here means someone opened the URL directly. */
export async function GET(request: NextRequest) {
  return redirect(request, "/cart");
}
