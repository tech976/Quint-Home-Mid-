// TEMPORARY probe: does Shopify keep the weight we send when an order is
// created through the Admin API?
//
// Our three live orders all carry total_weight 0, which is the zero Shiprocket
// reads. Line-item grams and an order total are now sent explicitly, but
// Shopify treats some order fields as computed-only, so this checks that the
// values actually survive rather than assuming they do.
//
// Creates one order, reads it back, and deletes it again — inventory bypassed
// and receipts suppressed, so no stock moves and nobody is emailed. POST-only
// so nothing can trigger it by following a link. Delete this route once the
// answer is known.

import { NextResponse } from "next/server";

const PEBBLE_VARIANT = 48849287348407; // The Pebble, 135 g in Shopify
const GRAMS = 135;

export const dynamic = "force-dynamic";

/** Lists any probe orders left behind and removes them. */
export async function GET() {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_ADMIN_TOKEN;
  const version = process.env.SHOPIFY_API_VERSION || "2024-10";
  if (!domain || !token) {
    return NextResponse.json({ error: "Admin API not configured" }, { status: 503 });
  }
  const h = { "Content-Type": "application/json", "X-Shopify-Access-Token": token };
  const res = await fetch(
    `https://${domain}/admin/api/${version}/orders.json?status=any&limit=50&fields=id,name,tags,created_at`,
    { headers: h, cache: "no-store" }
  );
  if (!res.ok) return NextResponse.json({ error: `Shopify ${res.status}` }, { status: 502 });
  const { orders } = (await res.json()) as {
    orders: { id: number; name: string; tags: string; created_at: string }[];
  };
  const strays = orders.filter((o) => (o.tags || "").includes("AUTOMATED-WEIGHT-PROBE"));
  const removed: string[] = [];
  for (const o of strays) {
    const d = await fetch(`https://${domain}/admin/api/${version}/orders/${o.id}.json`, {
      method: "DELETE", headers: h, cache: "no-store",
    });
    removed.push(`${o.name}:${d.ok ? "deleted" : "FAILED " + d.status}`);
  }
  return NextResponse.json({
    liveOrderCount: orders.length,
    strayProbeOrders: strays.length,
    removed,
    clean: strays.length === 0,
  });
}

export async function POST() {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_ADMIN_TOKEN;
  const version = process.env.SHOPIFY_API_VERSION || "2024-10";
  if (!domain || !token) {
    return NextResponse.json({ error: "Admin API not configured" }, { status: 503 });
  }

  const api = (path: string, init?: RequestInit) =>
    fetch(`https://${domain}/admin/api/${version}/${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": token,
        ...(init?.headers ?? {}),
      },
      cache: "no-store",
    });

  let orderId: number | null = null;
  try {
    const created = await api("orders.json", {
      method: "POST",
      body: JSON.stringify({
        order: {
          line_items: [
            { variant_id: PEBBLE_VARIANT, quantity: 1, grams: GRAMS },
          ],
          total_weight: GRAMS,
          financial_status: "paid",
          inventory_behaviour: "bypass",
          send_receipt: false,
          send_fulfillment_receipt: false,
          tags: "AUTOMATED-WEIGHT-PROBE",
          note: "Automated check that weight survives order creation. Safe to delete.",
        },
      }),
    });
    if (!created.ok) {
      return NextResponse.json(
        { step: "create", status: created.status, body: (await created.text()).slice(0, 400) },
        { status: 502 }
      );
    }
    const { order } = (await created.json()) as {
      order: { id: number; name: string; total_weight: number; line_items: { grams: number }[] };
    };
    orderId = order.id;

    // Read it back rather than trusting the creation response.
    const fetched = await api(`orders/${order.id}.json?fields=name,total_weight,line_items`);
    const readBack = fetched.ok
      ? ((await fetched.json()) as {
          order: { name: string; total_weight: number; line_items: { grams: number }[] };
        }).order
      : null;

    return NextResponse.json({
      sent: { total_weight: GRAMS, line_grams: GRAMS },
      onCreateResponse: { total_weight: order.total_weight, line_grams: order.line_items?.[0]?.grams },
      readBack: readBack
        ? { total_weight: readBack.total_weight, line_grams: readBack.line_items?.[0]?.grams }
        : "read failed",
      verdict:
        readBack && readBack.total_weight === GRAMS
          ? "Shopify KEEPS the weight — Shiprocket will see it"
          : "Shopify DISCARDED total_weight — needs another approach",
    });
  } finally {
    // Always clean up, even if the read above threw.
    if (orderId) await api(`orders/${orderId}.json`, { method: "DELETE" }).catch(() => {});
  }
}
