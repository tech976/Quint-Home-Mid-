// Diagnostic: are our PayU orders in a state Shiprocket can actually pull?
//
// Reports structure only — presence/absence of the fields a courier
// integration needs. No names, addresses, emails or phone numbers are
// returned, so this is safe to read from a terminal or paste into a ticket.

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface ShopifyOrder {
  name: string;
  created_at: string;
  financial_status: string | null;
  fulfillment_status: string | null;
  tags: string;
  total_weight?: number;
  shipping_address: Record<string, unknown> | null;
  line_items: { variant_id: number | null; sku: string | null; grams: number | null; quantity: number }[];
}

export async function GET() {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_ADMIN_TOKEN;
  const version = process.env.SHOPIFY_API_VERSION || "2024-10";
  if (!domain || !token) {
    return NextResponse.json({ error: "Admin API not configured" }, { status: 503 });
  }

  const res = await fetch(
    `https://${domain}/admin/api/${version}/orders.json?status=any&limit=10&fields=name,created_at,financial_status,fulfillment_status,tags,total_weight,shipping_address,line_items`,
    { headers: { "X-Shopify-Access-Token": token }, cache: "no-store" }
  );
  if (!res.ok) {
    return NextResponse.json(
      { error: `Shopify ${res.status}`, body: (await res.text()).slice(0, 200) },
      { status: 502 }
    );
  }

  const { orders } = (await res.json()) as { orders: ShopifyOrder[] };

  return NextResponse.json(
    {
      orderCount: orders.length,
      // A courier integration needs: a paid, unfulfilled order; a shipping
      // address complete enough to generate a label; and line items that
      // resolve to real variants with weight.
      orders: orders.map((o) => {
        const a = o.shipping_address ?? {};
        return {
          order: o.name,
          created: o.created_at,
          financial: o.financial_status,
          fulfillment: o.fulfillment_status ?? "unfulfilled",
          tags: o.tags,
          address: {
            present: Boolean(o.shipping_address),
            address1: Boolean(a.address1),
            city: Boolean(a.city),
            province: Boolean(a.province),
            zip: Boolean(a.zip),
            country: Boolean(a.country),
            phone: Boolean(a.phone),
          },
          totalWeightGrams: o.total_weight ?? null,
          lines: o.line_items.map((l) => ({
            hasVariant: Boolean(l.variant_id),
            hasSku: Boolean(l.sku),
            grams: l.grams,
            quantity: l.quantity,
          })),
        };
      }),
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
