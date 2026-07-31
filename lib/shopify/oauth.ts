// One-time Shopify OAuth helper.
//
// Shopify has retired legacy custom apps (the ones that handed you a permanent
// `shpat_` token in the admin). Dev Dashboard apps issue tokens through OAuth
// instead, so we run the exchange once ourselves and store the resulting
// offline token — which does not expire — as SHOPIFY_ADMIN_TOKEN.

import crypto from "node:crypto";

export const OAUTH_STATE_COOKIE = "quint_shopify_oauth_state";

/** Scopes the checkout needs; must match what the app is configured for. */
export const REQUIRED_SCOPES = [
  "read_customers",
  "write_customers",
  "write_inventory",
  "read_orders",
  "write_orders",
  "read_products",
].join(",");

export const shopDomain = () => process.env.SHOPIFY_STORE_DOMAIN;
export const apiKey = () => process.env.SHOPIFY_API_KEY;
export const apiSecret = () => process.env.SHOPIFY_API_SECRET;

export const oauthConfigured = (): boolean =>
  Boolean(shopDomain() && apiKey() && apiSecret());

/**
 * Shopify signs the callback query string with the app secret. Verifying it is
 * what stops anyone from walking up to the callback with a made-up code.
 */
export function verifyHmac(params: URLSearchParams): boolean {
  const secret = apiSecret();
  const received = params.get("hmac");
  if (!secret || !received) return false;

  const message = [...params.entries()]
    .filter(([k]) => k !== "hmac" && k !== "signature")
    .map(([k, v]) => [k, v] as const)
    .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
    .map(([k, v]) => `${k}=${v}`)
    .join("&");

  const expected = crypto
    .createHmac("sha256", secret)
    .update(message)
    .digest("hex");

  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(received, "utf8");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

/** Domains get written with a protocol or a trailing slash often enough that a
 *  literal comparison rejects perfectly valid values. */
export function normalizeShop(value: string | null | undefined): string {
  return (value ?? "")
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/\/+$/, "");
}

/** Only ever talk to the shop this deployment is configured for. */
export function isExpectedShop(shop: string | null): boolean {
  const a = normalizeShop(shop);
  const b = normalizeShop(shopDomain());
  return a.length > 0 && a === b;
}

/** Exchanges the one-time code for a permanent offline access token. */
export async function exchangeCodeForToken(
  shop: string,
  code: string
): Promise<{ access_token: string; scope: string }> {
  const res = await fetch(`https://${shop}/admin/oauth/access_token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: apiKey(),
      client_secret: apiSecret(),
      code,
    }),
    cache: "no-store",
  });

  const text = await res.text();
  if (!res.ok) {
    throw new Error(`Token exchange failed (${res.status}): ${text.slice(0, 300)}`);
  }
  return JSON.parse(text) as { access_token: string; scope: string };
}
