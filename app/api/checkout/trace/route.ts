// TEMPORARY: trace specific orders across Shopify and Shiprocket.
//
// Fields are allow-listed rather than filtered, so nothing about the customer
// can leak by accident — no names, emails, phones or addresses are read at
// all. Presence of an address is reported as a boolean only.
//
// Delete this route once the question is answered.

import { NextResponse } from "next/server";
import { getToken, shiprocketConfigured } from "@/lib/shiprocket/client";

export const dynamic = "force-dynamic";

const WANTED = ["1005", "1006", "1007", "1008"];
const matches = (label: string) =>
  WANTED.some((w) => label.replace(/^#/, "") === w);

async function shopify() {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_ADMIN_TOKEN;
  const version = process.env.SHOPIFY_API_VERSION || "2024-10";
  if (!domain || !token) return { error: "Admin API not configured" };

  const fields = [
    "name", "created_at", "processed_at", "financial_status",
    "fulfillment_status", "tags", "source_name", "payment_gateway_names",
    "gateway", "total_price", "currency", "total_weight", "note",
    "line_items", "shipping_address", "cancelled_at", "test",
  ].join(",");

  const res = await fetch(
    `https://${domain}/admin/api/${version}/orders.json?status=any&limit=50&fields=${fields}`,
    { headers: { "X-Shopify-Access-Token": token }, cache: "no-store" }
  );
  if (!res.ok) return { error: `Shopify ${res.status}` };

  const { orders } = (await res.json()) as {
    orders: Record<string, unknown>[];
  };

  // Allow-list, so PII is never even copied into the response.
  const shape = (o: Record<string, unknown>) => ({
    order: o.name,
    createdAt: o.created_at,
    processedAt: o.processed_at,
    financial: o.financial_status,
    fulfillment: o.fulfillment_status ?? "unfulfilled",
    cancelledAt: o.cancelled_at ?? null,
    isTestOrder: o.test ?? null,
    tags: o.tags || "(none)",
    sourceName: o.source_name ?? null,
    gateway: o.gateway ?? null,
    paymentGateways: o.payment_gateway_names ?? [],
    total: `${o.total_price} ${o.currency}`,
    totalWeightGrams: o.total_weight ?? null,
    note: typeof o.note === "string" ? o.note.slice(0, 120) : null,
    hasShippingAddress: Boolean(o.shipping_address),
    lines: ((o.line_items as Record<string, unknown>[]) ?? []).map((l) => ({
      sku: l.sku ?? null,
      qty: l.quantity ?? null,
      grams: l.grams ?? null,
      properties: ((l.properties as { name: string; value: string }[]) ?? [])
        .map((p) => `${p.name}=${p.value}`),
    })),
  });

  return {
    totalOrdersVisible: orders.length,
    allOrderNames: orders.map((o) => o.name),
    traced: orders.filter((o) => matches(String(o.name ?? ""))).map(shape),
  };
}

async function shiprocket() {
  if (!shiprocketConfigured()) return { error: "not configured" };
  const token = await getToken();
  if (!token) return { error: "login failed" };

  const res = await fetch(
    "https://apiv2.shiprocket.in/v1/external/orders?per_page=50",
    { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" }
  );
  if (!res.ok) return { error: `Shiprocket ${res.status}` };

  const json = (await res.json()) as { data?: Record<string, unknown>[] };
  const rows = json.data ?? [];

  const shape = (o: Record<string, unknown>) => ({
    shiprocketId: o.id,
    channelOrderId: o.channel_order_id,
    channelId: o.channel_id,
    channelName: o.channel_name,
    status: o.status,
    createdAt: o.created_at,
    paymentMethod: o.payment_method,
    total: o.total,
    courier: o.courier_name ?? null,
    awb: o.awb_data && typeof o.awb_data === "object"
      ? (o.awb_data as Record<string, unknown>).awb
      : null,
  });

  return {
    ordersVisible: rows.length,
    channelsSeen: [
      ...new Set(rows.map((o) => `${o.channel_id}:${o.channel_name}`)),
    ],
    allChannelOrderIds: rows.map((o) => o.channel_order_id),
    traced: rows
      .filter((o) => matches(String(o.channel_order_id ?? "")))
      .map(shape),
  };
}

export async function GET() {
  const [s, r] = await Promise.all([shopify(), shiprocket()]);
  return NextResponse.json(
    { looking_for: WANTED, shopify: s, shiprocket: r },
    { headers: { "Cache-Control": "no-store" } }
  );
}
