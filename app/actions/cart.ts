"use server";

import { cookies } from "next/headers";
import {
  cartCreate,
  cartGet,
  cartLinesAdd,
  cartLinesUpdate,
  cartLinesRemove,
  type Cart,
} from "@/lib/shopify/cart";

import { CART_COOKIE as COOKIE } from "@/lib/shopify/cart-cookie";

const MAX_AGE = 60 * 60 * 24 * 14; // 14 days

async function readCartId(): Promise<string | undefined> {
  return (await cookies()).get(COOKIE)?.value;
}
async function writeCartId(id: string): Promise<void> {
  (await cookies()).set(COOKIE, id, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
}

/** Read the current cart (or null). Never throws – returns null on any error. */
export async function getCartAction(): Promise<Cart | null> {
  try {
    const id = await readCartId();
    if (!id) return null;
    return await cartGet(id);
  } catch {
    return null;
  }
}

/** Ensure a live cart exists and return its id (creating one if needed). */
async function ensureCart(): Promise<string> {
  const id = await readCartId();
  if (id) {
    const existing = await cartGet(id);
    if (existing) return existing.id;
  }
  const created = await cartCreate();
  await writeCartId(created.id);
  return created.id;
}

export async function addToCartAction(
  merchandiseId: string,
  quantity = 1
): Promise<Cart> {
  const cartId = await ensureCart();
  return cartLinesAdd(cartId, [{ merchandiseId, quantity }]);
}

export async function updateLineAction(
  lineId: string,
  quantity: number
): Promise<Cart | null> {
  const id = await readCartId();
  if (!id) return null;
  if (quantity <= 0) return cartLinesRemove(id, [lineId]);
  return cartLinesUpdate(id, [{ id: lineId, quantity }]);
}

export async function removeLineAction(lineId: string): Promise<Cart | null> {
  const id = await readCartId();
  if (!id) return null;
  return cartLinesRemove(id, [lineId]);
}
