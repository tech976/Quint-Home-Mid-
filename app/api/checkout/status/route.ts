// Diagnostic: reports which checkout credentials the running deployment can
// see. Booleans only — no keys, salts or tokens are ever returned or logged.
// Handy when the bag is still handing off to Shopify and it is not obvious why.

import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { payuConfigured } from "@/lib/payu/client";
import { shopifyAdminConfigured } from "@/lib/shopify/admin";
import { getToken, shiprocketConfigured } from "@/lib/shiprocket/client";

export const dynamic = "force-dynamic";

/**
 * Harmless probe: can this token actually reach the Admin API, and does the
 * REST endpoint we use for order creation still exist for this app? Returns
 * status codes only — no shop or customer data.
 */
async function probeAdminApi() {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_ADMIN_TOKEN;
  const version = process.env.SHOPIFY_API_VERSION || "2024-10";
  if (!domain || !token) return { checked: false };

  const call = async (path: string) => {
    try {
      const r = await fetch(`https://${domain}/admin/api/${version}/${path}`, {
        headers: { "X-Shopify-Access-Token": token },
        cache: "no-store",
      });
      return r.status;
    } catch {
      return "network-error";
    }
  };

  const [rest, graphql] = await Promise.all([
    call("shop.json"),
    (async () => {
      try {
        const r = await fetch(
          `https://${domain}/admin/api/${version}/graphql.json`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Shopify-Access-Token": token,
            },
            body: JSON.stringify({ query: "{ shop { name } }" }),
            cache: "no-store",
          }
        );
        return r.status;
      } catch {
        return "network-error";
      }
    })(),
  ]);

  return {
    checked: true,
    restShopJson: rest, // 200 = REST usable, 401 = bad token, 403/404 = REST blocked
    graphql,
    // Admin API access tokens are prefixed `shpat_`. A Client Secret or Client
    // ID pasted here by mistake fails this check and explains a flat 401.
    tokenLooksLikeAdminToken: token.startsWith("shpat_"),
    tokenLength: token.length,
  };
}

export async function GET() {
  const payuKey = Boolean(process.env.PAYU_MERCHANT_KEY);
  const payuSalt = Boolean(process.env.PAYU_MERCHANT_SALT);
  const adminToken = Boolean(process.env.SHOPIFY_ADMIN_TOKEN);
  const headlessCheckout = payuConfigured && shopifyAdminConfigured;

  const adminApi = await probeAdminApi();

  const missing = [
    !payuKey && "PAYU_MERCHANT_KEY",
    !payuSalt && "PAYU_MERCHANT_SALT",
    !adminToken && "SHOPIFY_ADMIN_TOKEN",
  ].filter(Boolean);

  // Names only — never values. A typo'd key shows up here immediately.
  const relatedKeys = Object.keys(process.env)
    .filter(
      (k) =>
        k.startsWith("SHOPIFY") ||
        k.startsWith("PAYU") ||
        k.startsWith("SHIPROCKET") ||
        // catch a differently-named client id / secret
        /CLIENT|API_KEY|APIKEY|SECRET/i.test(k)
    )
    .filter((k) => !/^(npm_|NEXT_RUNTIME|VERCEL_|AWS_)/.test(k))
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
      adminApi,
      shiprocket: await (async () => {
        const base = {
          email: Boolean(process.env.SHIPROCKET_EMAIL),
          password: Boolean(process.env.SHIPROCKET_PASSWORD),
          pickupPin: process.env.SHIPROCKET_PICKUP_PIN ?? null,
        };
        if (!shiprocketConfigured()) return { ...base, auth: "not-configured" };
        const token = await getToken();
        if (!token) return { ...base, auth: "login-failed" };
        return { ...base, auth: "ok" };
      })(),
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
