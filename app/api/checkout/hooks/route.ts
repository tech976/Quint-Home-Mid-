// Diagnostic: which integrations are subscribed to our order events?
//
// Shiprocket pulls orders by subscribing to Shopify's orders/* webhooks. If
// that subscription is missing, the channel can read "Connected" in their
// panel and still never receive a new order.
//
// Reports webhook topics and the integration's hostname only — never full
// callback URLs, which can carry per-store tokens in their query string.

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_ADMIN_TOKEN;
  const version = process.env.SHOPIFY_API_VERSION || "2024-10";
  if (!domain || !token) {
    return NextResponse.json({ error: "Admin API not configured" }, { status: 503 });
  }

  const res = await fetch(
    `https://${domain}/admin/api/${version}/webhooks.json?limit=250`,
    { headers: { "X-Shopify-Access-Token": token }, cache: "no-store" }
  );
  if (!res.ok) {
    return NextResponse.json(
      { error: `Shopify ${res.status}`, body: (await res.text()).slice(0, 200) },
      { status: 502 }
    );
  }

  const { webhooks } = (await res.json()) as {
    webhooks: { topic: string; address: string; created_at: string }[];
  };

  const host = (url: string) => {
    try {
      return new URL(url).hostname;
    } catch {
      return "unparseable";
    }
  };

  return NextResponse.json(
    {
      total: webhooks.length,
      subscriptions: webhooks.map((w) => ({
        topic: w.topic,
        host: host(w.address),
        created: w.created_at,
      })),
      shiprocketListensToOrders: webhooks.some(
        (w) => /shiprocket/i.test(w.address) && w.topic.startsWith("orders/")
      ),
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
