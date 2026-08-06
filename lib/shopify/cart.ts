import { storefront } from "./client";

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
      productTitle: node.merchandise.product.title,
      variantTitle: node.merchandise.title,
      handle: node.merchandise.product.handle,
      price: Math.round(Number(node.merchandise.price.amount)),
      currency: node.merchandise.price.currencyCode,
      image: node.merchandise.image?.url ?? null,
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
