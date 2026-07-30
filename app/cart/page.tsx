import type { Metadata } from "next";
import { CartView } from "@/components/cart/cart-view";

export const metadata: Metadata = {
  title: "Your Bag",
  description:
    "Review the diffusers and fragrance oils in your Quint Home bag, then proceed to checkout.",
};

export default function CartPage() {
  return <CartView />;
}
