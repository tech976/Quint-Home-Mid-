// Shopify Admin API (server-side only).
//
// Used after PayU confirms a payment: the order is written into Shopify already
// marked as paid, so Shopify stays the source of truth for orders, inventory,
// customers and fulfilment — without the payment passing through Shopify
// Checkout (which is what attracts the third-party transaction fee).
//
// Requires a custom app token with `write_orders` (and `write_inventory` if you
// want stock decremented).

const DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN;
const VERSION = process.env.SHOPIFY_API_VERSION || "2024-10";

/** True once an Admin API token is present. */
export const shopifyAdminConfigured = Boolean(DOMAIN && ADMIN_TOKEN);

/** Storefront ids are GIDs ("gid://shopify/ProductVariant/123"); Admin wants 123. */
export function numericId(gid: string): number | null {
  const m = /(\d+)\s*$/.exec(gid);
  return m ? Number(m[1]) : null;
}

export interface OrderLine {
  merchandiseId: string; // Storefront GID
  quantity: number;
  /** Buyer choices, e.g. the included oil — recorded on the order line. */
  attributes?: { key: string; value: string }[];
  /** Shipping weight per unit, in grams, from the Shopify variant. */
  weightGrams?: number;
}

export interface OrderCustomer {
  email: string;
  phone?: string;
  firstName: string;
  lastName?: string;
  address1?: string;
  address2?: string;
  city?: string;
  province?: string;
  zip?: string;
  country?: string;
}

export interface CreateOrderInput {
  lines: OrderLine[];
  customer: OrderCustomer;
  /** Amount actually captured, in rupees. */
  amountPaid: number;
  /** Shipping charged, in rupees. */
  shipping?: number;
  /** PayU transaction id (ours) and PayU's own id, for reconciliation. */
  txnid: string;
  mihpayid?: string;
  paymentMode?: string;
}

export interface CreatedOrder {
  id: number;
  name: string; // e.g. "#1001"
}

/**
 * Creates a paid order in Shopify. Throws on failure so the caller can decide
 * how to surface it (payment has already been taken at this point, so failures
 * here must be logged and reconciled, never silently swallowed).
 */
export async function createPaidOrder(
  input: CreateOrderInput
): Promise<CreatedOrder> {
  if (!shopifyAdminConfigured) {
    throw new Error(
      "Shopify Admin API is not configured (missing SHOPIFY_ADMIN_TOKEN)."
    );
  }

  const line_items = input.lines
    .map((l) => ({
      variant_id: numericId(l.merchandiseId),
      quantity: l.quantity,
      // Shopify shows these as line-item properties on the order.
      properties: (l.attributes ?? []).map((a) => ({ name: a.key, value: a.value })),
      // Carried explicitly rather than left to Shopify: orders created through
      // the API do not get an order-level weight the way checkout orders do,
      // and a courier reading zero grams either refuses the shipment or bills
      // against the wrong slab.
      ...(l.weightGrams ? { grams: l.weightGrams } : {}),
    }))
    .filter(
      (l): l is {
        variant_id: number;
        quantity: number;
        properties: { name: string; value: string }[];
        grams?: number;
      } => l.variant_id !== null
    );

  // Sum of the parcel, for the same reason.
  const total_weight = input.lines.reduce(
    (g, l) => g + (l.weightGrams ?? 0) * l.quantity,
    0
  );

  if (line_items.length === 0) {
    throw new Error("Cannot create a Shopify order with no resolvable line items.");
  }

  const c = input.customer;
  const address = {
    first_name: c.firstName,
    last_name: c.lastName ?? "",
    address1: c.address1 ?? "",
    address2: c.address2 ?? "",
    city: c.city ?? "",
    province: c.province ?? "",
    zip: c.zip ?? "",
    country: c.country ?? "India",
    phone: c.phone ?? "",
  };

  const order: Record<string, unknown> = {
    line_items,
    ...(total_weight > 0 ? { total_weight } : {}),
    email: c.email,
    phone: c.phone,
    customer: {
      first_name: c.firstName,
      last_name: c.lastName ?? "",
      email: c.email,
      phone: c.phone,
    },
    billing_address: address,
    shipping_address: address,
    financial_status: "paid",
    currency: "INR",
    // Records the money as captured against a manual "PayU" gateway.
    transactions: [
      {
        kind: "sale",
        status: "success",
        amount: input.amountPaid.toFixed(2),
        gateway: "PayU",
      },
    ],
    // Without this Shopify does not touch stock levels for API-created orders.
    inventory_behaviour: "decrement_obeying_policy",
    send_receipt: true,
    send_fulfillment_receipt: false,
    tags: "PayU",
    note: `Paid via PayU · txnid ${input.txnid}${
      input.mihpayid ? ` · mihpayid ${input.mihpayid}` : ""
    }${input.paymentMode ? ` · mode ${input.paymentMode}` : ""}`,
  };

  if (input.shipping && input.shipping > 0) {
    order.shipping_lines = [
      { title: "Shipping", price: input.shipping.toFixed(2), code: "Standard" },
    ];
  }

  const res = await fetch(
    `https://${DOMAIN}/admin/api/${VERSION}/orders.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": ADMIN_TOKEN as string,
      },
      body: JSON.stringify({ order }),
      cache: "no-store",
    }
  );

  const body = await res.text();
  if (!res.ok) {
    throw new Error(`Shopify Admin orders.json ${res.status}: ${body.slice(0, 500)}`);
  }

  const json = JSON.parse(body) as { order?: { id: number; name: string } };
  if (!json.order?.id) {
    throw new Error(`Shopify Admin returned no order: ${body.slice(0, 500)}`);
  }
  return { id: json.order.id, name: json.order.name };
}

/**
 * Adds a newsletter subscriber as a Shopify customer with marketing consent, so
 * the list lives with everything else rather than in a separate tool.
 *
 * Returns "subscribed" for a new signup and "already" when Shopify reports the
 * address is taken — from the visitor's side both are a success.
 */
export async function subscribeToNewsletter(
  email: string
): Promise<"subscribed" | "already"> {
  if (!shopifyAdminConfigured) {
    throw new Error("Shopify Admin API is not configured.");
  }

  const res = await fetch(
    `https://${DOMAIN}/admin/api/${VERSION}/customers.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": ADMIN_TOKEN as string,
      },
      body: JSON.stringify({
        customer: {
          email,
          tags: "newsletter",
          email_marketing_consent: {
            state: "subscribed",
            opt_in_level: "single_opt_in",
            consent_updated_at: new Date().toISOString(),
          },
        },
      }),
      cache: "no-store",
    }
  );

  const body = await res.text();
  if (res.ok) return "subscribed";

  // Shopify answers 422 when the address already belongs to a customer.
  if (res.status === 422 && /already been taken/i.test(body)) return "already";

  throw new Error(`Shopify customers.json ${res.status}: ${body.slice(0, 300)}`);
}
