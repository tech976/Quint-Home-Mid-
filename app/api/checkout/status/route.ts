// Diagnostic: reports which checkout credentials the running deployment can
// see. Booleans only — no keys, salts or tokens are ever returned or logged.
// Handy when the bag is still handing off to Shopify and it is not obvious why.

import crypto from "node:crypto";
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

  // Names only — never values. A typo'd key shows up here immediately.
  const relatedKeys = Object.keys(process.env)
    .filter((k) => k.startsWith("SHOPIFY") || k.startsWith("PAYU"))
    .sort();

  return NextResponse.json(
    {
      headlessCheckout,
      checkoutGoesTo: headlessCheckout ? "/checkout (PayU)" : "Shopify checkout",
      shopifyAndPayuKeysVisibleToThisBuild: relatedKeys,
      // Enough to tell one credential from another, never enough to use them.
      // The merchant key is public anyway (it is posted to PayU in the form);
      // the salt is only ever shown as a one-way fingerprint.
      payuKeyPrefix: process.env.PAYU_MERCHANT_KEY
        ? `${process.env.PAYU_MERCHANT_KEY.slice(0, 3)}… (len ${process.env.PAYU_MERCHANT_KEY.length})`
        : null,
      payuSaltFingerprint: process.env.PAYU_MERCHANT_SALT
        ? crypto
            .createHash("sha256")
            .update(process.env.PAYU_MERCHANT_SALT)
            .digest("hex")
            .slice(0, 10)
        : null,
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
