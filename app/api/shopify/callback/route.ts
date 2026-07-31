// Step 2 of the one-time Shopify OAuth install.
// Shopify sends the customer back here with a code; we verify the signature,
// swap the code for a permanent offline token, and show it once so it can be
// pasted into Vercel. The token is never stored or logged by this route.

import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";
import {
  OAUTH_STATE_COOKIE,
  exchangeCodeForToken,
  isExpectedShop,
  oauthConfigured,
  verifyHmac,
} from "@/lib/shopify/oauth";

export const dynamic = "force-dynamic";

const esc = (s: string): string =>
  s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string
  );

function page(title: string, bodyHtml: string, status = 200) {
  return new NextResponse(
    `<!doctype html><html><head><meta charset="utf-8" /><title>${esc(title)}</title>
<style>
 body{font-family:ui-sans-serif,system-ui;max-width:44rem;margin:4rem auto;padding:0 1.5rem;color:#3a3532;line-height:1.6}
 code{background:#f5efe6;padding:.15rem .4rem;border-radius:3px}
 .tok{display:block;background:#293329;color:#f5efe6;padding:1rem;border-radius:6px;
      word-break:break-all;font-family:ui-monospace,monospace;font-size:.95rem;margin:1rem 0}
 .warn{background:#fdf3e7;border-left:3px solid #c15a27;padding:.75rem 1rem;margin:1.25rem 0}
 h1{font-weight:500}
</style></head><body>${bodyHtml}</body></html>`,
    { status, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" } }
  );
}

export async function GET(request: NextRequest) {
  if (!oauthConfigured()) {
    return page("Not configured", "<h1>Shopify OAuth is not configured</h1><p>Set SHOPIFY_API_KEY and SHOPIFY_API_SECRET, then redeploy.</p>", 400);
  }

  const params = request.nextUrl.searchParams;
  const shop = params.get("shop");
  const code = params.get("code");

  // 1. Must be the shop this deployment belongs to.
  if (!isExpectedShop(shop)) {
    return page("Wrong shop", "<h1>Unexpected shop</h1><p>This callback is only valid for the configured store.</p>", 400);
  }

  // 2. Shopify's signature must check out.
  if (!verifyHmac(params)) {
    return page("Invalid signature", "<h1>Signature check failed</h1><p>This request was not signed by Shopify.</p>", 400);
  }

  // 3. The nonce we issued must come back.
  const jar = await cookies();
  const expectedState = jar.get(OAUTH_STATE_COOKIE)?.value;
  if (!expectedState || expectedState !== params.get("state")) {
    return page(
      "Session expired",
      "<h1>Session expired</h1><p>Start again at <code>/api/shopify/install</code> (the link is valid for 10 minutes).</p>",
      400
    );
  }

  if (!code) {
    return page("Missing code", "<h1>No authorisation code</h1>", 400);
  }

  try {
    const { access_token, scope } = await exchangeCodeForToken(shop as string, code);
    jar.delete(OAUTH_STATE_COOKIE);

    return page(
      "Shopify token",
      `<h1>Your Shopify Admin token</h1>
       <p>Copy this now and paste it into Vercel as <code>SHOPIFY_ADMIN_TOKEN</code>, replacing whatever is there.</p>
       <span class="tok">${esc(access_token)}</span>
       <div class="warn"><strong>This page is shown once.</strong> It is not stored or logged anywhere.
       If you lose it, just visit <code>/api/shopify/install</code> again.</div>
       <p><strong>Granted scopes:</strong> ${esc(scope)}</p>
       <p>Then in Vercel: <em>Settings → Environment Variables → SHOPIFY_ADMIN_TOKEN</em> → Save →
       <em>Deployments → ⋯ → Redeploy</em>.</p>
       <p>Afterwards <code>/api/checkout/status</code> should report
       <code>REST / GraphQL : 200 / 200</code>.</p>`
    );
  } catch (e) {
    return page(
      "Exchange failed",
      `<h1>Token exchange failed</h1><p>${esc(e instanceof Error ? e.message : String(e))}</p>
       <p>Check that the Client ID and Secret in Vercel match this app, and that
       <code>/api/shopify/callback</code> is listed in the app's Redirect URLs.</p>`,
      500
    );
  }
}
