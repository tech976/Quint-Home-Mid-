// Commerce rules shared by the bag, the checkout and the order that is written
// into Shopify. Keeping them in one place stops the totals shown to the
// customer from drifting away from the amount PayU actually charges.

/** Complimentary shipping at or above this subtotal (see /shipping). */
export const FREE_SHIPPING_FROM = 5000;

/** Flat shipping charged below the threshold, in rupees. */
export const SHIPPING_FLAT = 99;

/** Shipping payable on a given subtotal. */
export function shippingFor(subtotal: number): number {
  return subtotal >= FREE_SHIPPING_FROM ? 0 : SHIPPING_FLAT;
}
