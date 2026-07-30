/** Cookie holding the Shopify cart id. Shared by the cart actions and the
 *  checkout routes so the two can never drift apart. */
export const CART_COOKIE = "quint_cart_id";

/** Short-lived cookie holding the order awaiting payment confirmation. */
export const PENDING_ORDER_COOKIE = "quint_pending_order";
