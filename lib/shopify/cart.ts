import { storefront } from "./client";
import { oils } from "@/lib/data/oils";
import { diffusers } from "@/lib/data/diffusers";

/**
 * Shopify's product photos are generic stand-ins, and some handles still carry
 * the old product name (Terrain is filed as "quietude"), so a bag line could
 * show the wrong bottle and link through a redirect. Resolve the catalogue
 * entry from the handle, falling back to the title, and use our own artwork
 * and slug.
 */
const CATALOGUE = [...oils, ...diffusers];
const BY_SLUG = new Map(CATALOGUE.map((p) => [p.slug, p]));

/** Products Shopify still files under their previous name. Mirrors the
 *  redirects in next.config.ts. */
const RENAMED: Record<string, string> = {
  quietude: "terrain",
  "tabletop-a326": "monolith",
  "tabletop-fabric-a974": "loom",
  "clock-at370": "ember",
  "dual-mist-at302": "pillar",
  "plug-in-a815": "pebble",
};

const key = (v: string) =>
  v.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

/** Matches on the handle first, then the title, allowing for either still
 *  carrying the old name. */
/** Also keyed on the product name, since a Shopify handle can differ from our
 *  slug ("the-ember" vs "ember"). */
const BY_NAME = new Map(CATALOGUE.map((p) => [key(p.name), p]));

function localProduct(handle: string, title: string) {
  for (const raw of [handle, title]) {
    const k = key(raw);
    const hit =
      BY_SLUG.get(k) ?? BY_NAME.get(k) ?? BY_SLUG.get(RENAMED[k] ?? "");
    if (hit) return hit;
  }
  return undefined;
}

/** A single line in the Shopify cart, flattened for the UI. */
export interface CartLine {
  id: string;
  quantity: number;
  /** Buyer choices carried on the line, e.g. the included oil. */
  attributes: { key: string; value: string }[];
  merchandiseId: string;
  productTitle: string;
  variantTitle: string;
  handle: string;
  price: number;
  currency: string;
  image: string | null;
}

/** Normalised cart used across the app. */
export interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  subtotal: number;
  currency: string;
  lines: CartLine[];
}

const CART_FIELDS = `
  id
  checkoutUrl
  totalQuantity
  cost { subtotalAmount { amount currencyCode } }
  lines(first: 100) {
    edges { node {
      id
      quantity
      attributes { key value }
      merchandise {
        ... on ProductVariant {
          id
          title
          price { amount currencyCode }
          image { url }
          product { title handle }
        }
      }
    } }
  }
`;

interface RawCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: { subtotalAmount: { amount: string; currencyCode: string } };
  lines: {
    edges: {
      node: {
        id: string;
        quantity: number;
        attributes: { key: string; value: string }[];
        merchandise: {
          id: string;
          title: string;
          price: { amount: string; currencyCode: string };
          image: { url: string } | null;
          product: { title: string; handle: string };
        };
      };
    }[];
  };
}

function normalise(c: RawCart | null | undefined): Cart | null {
  if (!c) return null;
  return {
    id: c.id,
    checkoutUrl: c.checkoutUrl,
    totalQuantity: c.totalQuantity,
    subtotal: Math.round(Number(c.cost.subtotalAmount.amount)),
    currency: c.cost.subtotalAmount.currencyCode,
    lines: c.lines.edges.map(({ node }) => ({
      id: node.id,
      quantity: node.quantity,
      attributes: node.attributes ?? [],
      merchandiseId: node.merchandise.id,
      productTitle:
        localProduct(
          node.merchandise.product.handle,
          node.merchandise.product.title
        )?.name ?? node.merchandise.product.title,
      variantTitle: node.merchandise.title,
      handle:
        localProduct(
          node.merchandise.product.handle,
          node.merchandise.product.title
        )?.slug ?? node.merchandise.product.handle,
      price: Math.round(Number(node.merchandise.price.amount)),
      currency: node.merchandise.price.currencyCode,
      image:
        localProduct(
          node.merchandise.product.handle,
          node.merchandise.product.title
        )?.image ??
        node.merchandise.image?.url ??
        null,
    })),
  };
}

// Mutations must never be cached.
const noCache = 0;

export async function cartCreate(): Promise<Cart> {
  const data = await storefront<{ cartCreate: { cart: RawCart } }>(
    `mutation { cartCreate(input: {}) { cart { ${CART_FIELDS} } } }`,
    undefined,
    noCache
  );
  return normalise(data.cartCreate.cart)!;
}

export async function cartGet(id: string): Promise<Cart | null> {
  const data = await storefront<{ cart: RawCart | null }>(
    `query getCart($id: ID!) { cart(id: $id) { ${CART_FIELDS} } }`,
    { id },
    noCache
  );
  return normalise(data.cart);
}

export async function cartLinesAdd(
  cartId: string,
  lines: {
    merchandiseId: string;
    quantity: number;
    attributes?: { key: string; value: string }[];
  }[]
): Promise<Cart> {
  const data = await storefront<{ cartLinesAdd: { cart: RawCart } }>(
    `mutation add($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) { cart { ${CART_FIELDS} } }
    }`,
    { cartId, lines },
    noCache
  );
  return normalise(data.cartLinesAdd.cart)!;
}

export async function cartLinesUpdate(
  cartId: string,
  lines: { id: string; quantity: number }[]
): Promise<Cart> {
  const data = await storefront<{ cartLinesUpdate: { cart: RawCart } }>(
    `mutation upd($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) { cart { ${CART_FIELDS} } }
    }`,
    { cartId, lines },
    noCache
  );
  return normalise(data.cartLinesUpdate.cart)!;
}

export async function cartLinesRemove(cartId: string, lineIds: string[]): Promise<Cart> {
  const data = await storefront<{ cartLinesRemove: { cart: RawCart } }>(
    `mutation rm($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) { cart { ${CART_FIELDS} } }
    }`,
    { cartId, lineIds },
    noCache
  );
  return normalise(data.cartLinesRemove.cart)!;
}
