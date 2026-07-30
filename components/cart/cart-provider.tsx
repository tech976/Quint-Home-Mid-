"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useTransition,
} from "react";
import type { Cart } from "@/lib/shopify/cart";
import {
  getCartAction,
  addToCartAction,
  updateLineAction,
  removeLineAction,
} from "@/app/actions/cart";

interface CartContextValue {
  cart: Cart | null;
  count: number;
  open: boolean;
  pending: boolean;
  /** True once PayU + the Shopify Admin API are configured: checkout then runs
   *  on our own /checkout instead of the Shopify-hosted one. */
  headlessCheckout: boolean;
  setOpen: (v: boolean) => void;
  add: (merchandiseId: string, quantity?: number) => void;
  update: (lineId: string, quantity: number) => void;
  remove: (lineId: string) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({
  children,
  headlessCheckout = false,
}: {
  children: React.ReactNode;
  headlessCheckout?: boolean;
}) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  // Load any existing cart once on mount.
  useEffect(() => {
    getCartAction().then((c) => c && setCart(c)).catch(() => {});
  }, []);

  const add = useCallback((merchandiseId: string, quantity = 1) => {
    setOpen(true);
    startTransition(async () => {
      try {
        setCart(await addToCartAction(merchandiseId, quantity));
      } catch (e) {
        console.error("add to cart failed", e);
      }
    });
  }, []);

  const update = useCallback((lineId: string, quantity: number) => {
    startTransition(async () => {
      try {
        const c = await updateLineAction(lineId, quantity);
        setCart(c);
      } catch (e) {
        console.error("update line failed", e);
      }
    });
  }, []);

  const remove = useCallback((lineId: string) => {
    startTransition(async () => {
      try {
        const c = await removeLineAction(lineId);
        setCart(c);
      } catch (e) {
        console.error("remove line failed", e);
      }
    });
  }, []);

  const count = cart?.totalQuantity ?? 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        count,
        open,
        pending,
        headlessCheckout,
        setOpen,
        add,
        update,
        remove,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}
