import type { Metadata } from "next";
import { CartView } from "@/components/cart/cart-view";
import { payuConfigured } from "@/lib/payu/client";
import { shopifyAdminConfigured } from "@/lib/shopify/admin";

export const metadata: Metadata = {
  title: "Your Bag",
  description:
    "Review the diffusers and fragrance oils in your Quint Home bag, then proceed to checkout.",
};

export default function CartPage() {
  // Our own checkout only takes over once payment *and* order creation are both
  // wired up; until then the bag keeps using the Shopify-hosted checkout.
  const headlessCheckout = payuConfigured && shopifyAdminConfigured;
  return <CartView headlessCheckout={headlessCheckout} />;
}
