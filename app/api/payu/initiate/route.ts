// Starts a PayU payment for the current bag.
//
// The customer's browser posts the checkout form here; we rebuild the order
// server-side (never trusting amounts from the client), sign it with the PayU
// salt, and hand back a self-submitting form that carries the customer to
// PayU's hosted payment page.

import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";
import { cartGet } from "@/lib/shopify/cart";
import { CART_COOKIE, PENDING_ORDER_COOKIE } from "@/lib/shopify/cart-cookie";
import {
  PAYU_PAYMENT_URL,
  buildPayuFields,
  formatAmount,
  newTxnId,
  payuConfigured,
} from "@/lib/payu/client";
import { shippingFor } from "@/lib/checkout-config";

/** Payment must never be served from a cache. */
export const dynamic = "force-dynamic";

const escapeHtml = (s: string): string =>
  s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string
  );

function field(form: FormData, name: string): string {
  return String(form.get(name) ?? "").trim();
}

export async function POST(request: NextRequest) {
  if (!payuConfigured) {
    // Nothing is configured yet — fall back to the bag rather than 500.
    return NextResponse.redirect(new URL("/cart?error=payments-unavailable", request.url), 303);
  }

  const form = await request.formData();

  const firstName = field(form, "firstName");
  const email = field(form, "email");
  const phone = field(form, "phone");
  if (!firstName || !email || !phone) {
    return NextResponse.redirect(new URL("/checkout?error=missing-details", request.url), 303);
  }

  // Rebuild the order from Shopify — the browser never dictates the amount.
  const cartId = (await cookies()).get(CART_COOKIE)?.value;
  const cart = cartId ? await cartGet(cartId) : null;
  if (!cart || cart.lines.length === 0) {
    return NextResponse.redirect(new URL("/cart?error=empty", request.url), 303);
  }

  const subtotal = cart.subtotal;
  const shipping = shippingFor(subtotal);
  const total = subtotal + shipping;
  const txnid = newTxnId();

  const origin = process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin;
  const callback = `${origin}/api/payu/callback`;

  const fields = buildPayuFields({
    txnid,
    amount: formatAmount(total),
    productinfo: "Quint Home order",
    firstname: firstName,
    email,
    phone,
    surl: callback,
    furl: callback,
    lastname: field(form, "lastName"),
    address1: field(form, "address1"),
    address2: field(form, "address2"),
    city: field(form, "city"),
    state: field(form, "state"),
    country: field(form, "country") || "India",
    zipcode: field(form, "zip"),
    udf1: txnid,
  });

  // Everything the callback needs to write the order once payment clears.
  // Amounts are re-derived from Shopify at that point, so only identifiers and
  // delivery details are carried here.
  const pending = {
    txnid,
    cartId: cart.id,
    customer: {
      email,
      phone,
      firstName,
      lastName: field(form, "lastName"),
      address1: field(form, "address1"),
      address2: field(form, "address2"),
      city: field(form, "city"),
      province: field(form, "state"),
      zip: field(form, "zip"),
      country: field(form, "country") || "India",
    },
  };

  const jar = await cookies();
  jar.set(PENDING_ORDER_COOKIE, JSON.stringify(pending), {
    httpOnly: true,
    // PayU posts back cross-site, so a Lax cookie would not be sent.
    sameSite: "none",
    secure: true,
    path: "/",
    maxAge: 60 * 30,
  });

  const inputs = Object.entries(fields)
    .map(
      ([k, v]) =>
        `<input type="hidden" name="${escapeHtml(k)}" value="${escapeHtml(v)}" />`
    )
    .join("");

  const html = `<!doctype html><html><head><meta charset="utf-8" />
<title>Redirecting to payment…</title></head>
<body style="font-family:system-ui;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;color:#3a3532">
<noscript><p>Please continue to payment.</p></noscript>
<p>Taking you to the secure payment page…</p>
<form id="payu" method="post" action="${PAYU_PAYMENT_URL}">${inputs}
<noscript><button type="submit">Continue</button></noscript></form>
<script>document.getElementById('payu').submit();</script>
</body></html>`;

  return new NextResponse(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
