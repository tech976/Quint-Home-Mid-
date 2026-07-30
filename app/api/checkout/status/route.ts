// Diagnostic: reports which checkout credentials the running deployment can
// see. Booleans only — no keys, salts or tokens are ever returned or logged.
// Handy when the bag is still handing off to Shopify and it is not obvious why.

import { NextResponse } from "next/server";
import { payuConfigured } from "@/lib/payu/client";
import { shopifyAdminConfigured } from "@/lib/shopify/admin";

export const dynamic = "force-dynamic";

export async function GET() {
  const payuKey = Boolean(process.env.PAYU_MERCHANT_KEY);
  const payuSalt = Boolean(process.env.PAYU_MERCHANT_SALT);
  const adminToken = Boolean(process.env.SHOPIFY_ADMIN_TOKEN);
  const headlessCheckout = payuConfigured && shopifyAdminConfigured;

  const missing = [
    !payuKey && "PAYU_MERCHANT_KEY",
    !payuSalt && "PAYU_MERCHANT_SALT",
    !adminToken && "SHOPIFY_ADMIN_TOKEN",
  ].filter(Boolean);

  return NextResponse.json(
    {
      headlessCheckout,
      checkoutGoesTo: headlessCheckout ? "/checkout (PayU)" : "Shopify checkout",
      present: {
        PAYU_MERCHANT_KEY: payuKey,
        PAYU_MERCHANT_SALT: payuSalt,
        SHOPIFY_ADMIN_TOKEN: adminToken,
      },
      missing,
      payuMode: process.env.PAYU_MODE === "production" ? "production" : "test",
      hint: headlessCheckout
        ? "Checkout is running on our own page."
        : "Add the missing variables in Vercel, then redeploy — env changes only take effect on a new deployment.",
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
