// Step 1 of the one-time Shopify OAuth install.
// Visiting this in a browser sends you to Shopify's approval screen.

import crypto from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";
import {
  OAUTH_STATE_COOKIE,
  REQUIRED_SCOPES,
  apiKey,
  oauthConfigured,
  shopDomain,
} from "@/lib/shopify/oauth";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  if (!oauthConfigured()) {
    return NextResponse.json(
      {
        error: "Shopify OAuth is not configured.",
        needed: ["SHOPIFY_STORE_DOMAIN", "SHOPIFY_API_KEY", "SHOPIFY_API_SECRET"],
        hint: "Add the app's Client ID as SHOPIFY_API_KEY and Client Secret as SHOPIFY_API_SECRET in Vercel, then redeploy.",
      },
      { status: 400 }
    );
  }

  // Nonce, echoed back by Shopify, so a callback cannot be forged or replayed.
  const state = crypto.randomBytes(16).toString("hex");
  (await cookies()).set(OAUTH_STATE_COOKIE, state, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: 600,
  });

  const origin = process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin;
  const redirectUri = `${origin}/api/shopify/callback`;

  const authorize = new URL(`https://${shopDomain()}/admin/oauth/authorize`);
  authorize.searchParams.set("client_id", apiKey() as string);
  authorize.searchParams.set("scope", REQUIRED_SCOPES);
  authorize.searchParams.set("redirect_uri", redirectUri);
  authorize.searchParams.set("state", state);
  // No grant_options[] → an offline token, which does not expire.

  return NextResponse.redirect(authorize.toString(), 302);
}
