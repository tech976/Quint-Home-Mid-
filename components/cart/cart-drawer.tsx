"use client";

import Link from "next/link";
import { useCart } from "./cart-provider";
import { formatINR } from "@/lib/utils";

export function CartDrawer() {
  const { cart, open, setOpen, update, remove, pending } = useCart();
  const lines = cart?.lines ?? [];

  return (
    <div
      aria-hidden={!open}
      className={`fixed inset-0 z-[100] ${open ? "" : "pointer-events-none"}`}
    >
      {/* Scrim */}
      <div
        onClick={() => setOpen(false)}
        className={`absolute inset-0 bg-[color:var(--color-charcoal)]/40 transition-opacity duration-500 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />
      {/* Panel */}
      <aside
        className={`absolute right-0 top-0 flex h-[100%] w-[90%] max-w-[26rem] flex-col bg-[color:var(--color-white)] shadow-xl transition-transform duration-500 ease-[var(--ease-quint)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-[color:var(--color-rule)] px-6 py-5">
          <p className="text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
            Your bag {cart?.totalQuantity ? `(${cart.totalQuantity})` : ""}
          </p>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close bag"
            className="text-[0.9rem] text-[color:var(--color-charcoal-soft)] hover:text-[color:var(--color-charcoal)]"
          >
            ✕
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <p className="font-[family-name:var(--font-serif)] text-[var(--text-xl)]">
              Your bag is empty.
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-[0.72rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)] underline-offset-4 hover:text-[color:var(--color-clay)] hover:underline"
            >
              Continue shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-2">
              {lines.map((l) => (
                <div
                  key={l.id}
                  className="flex gap-4 border-b border-[color:var(--color-rule)] py-5"
                >
                  <div className="relative h-20 w-16 shrink-0 overflow-hidden bg-[color:var(--color-stardust-soft)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {l.image && <img src={l.image} alt={l.productTitle} className="h-[100%] w-[100%] object-cover" />}
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <p className="text-[0.95rem] leading-tight">{l.productTitle}</p>
                    {l.variantTitle && l.variantTitle !== "Default Title" && (
                      <p className="mt-0.5 text-[0.72rem] text-[color:var(--color-charcoal-soft)]">
                        {l.variantTitle}
                      </p>
                    )}
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center border border-[color:var(--color-rule)]">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          disabled={pending}
                          onClick={() => update(l.id, l.quantity - 1)}
                          className="px-2.5 py-1 text-[0.9rem] hover:text-[color:var(--color-clay)] disabled:opacity-50"
                        >
                          −
                        </button>
                        <span className="min-w-[2ch] text-center text-[0.8rem] tabular-nums">
                          {l.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          disabled={pending}
                          onClick={() => update(l.id, l.quantity + 1)}
                          className="px-2.5 py-1 text-[0.9rem] hover:text-[color:var(--color-clay)] disabled:opacity-50"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-[0.9rem] tabular-nums">
                        {formatINR(l.price * l.quantity)}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    aria-label="Remove item"
                    disabled={pending}
                    onClick={() => remove(l.id)}
                    className="self-start text-[0.72rem] text-[color:var(--color-charcoal-soft)] hover:text-[color:var(--color-clay)] disabled:opacity-50"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t border-[color:var(--color-rule)] px-6 py-5">
              <div className="flex items-baseline justify-between">
                <span className="text-[0.62rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)]">
                  Subtotal
                </span>
                <span className="text-[1.05rem] tabular-nums">
                  {formatINR(cart?.subtotal ?? 0)}
                </span>
              </div>
              <p className="mt-1.5 text-[0.7rem] leading-[1.5] text-[color:var(--color-charcoal-soft)]">
                Shipping &amp; taxes calculated at checkout.
              </p>
              <a
                href={cart?.checkoutUrl ?? "#"}
                className="group mt-4 flex items-center justify-center gap-3 bg-[color:var(--color-charcoal)] px-8 py-4 text-[0.74rem] uppercase tracking-[0.32em] text-[color:var(--color-ivory)] transition-colors duration-500 hover:bg-[color:var(--color-clay-deep)]"
              >
                Checkout
                <span className="transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </a>
              <Link
                href="/cart"
                onClick={() => setOpen(false)}
                className="mt-3 block text-center text-[0.68rem] uppercase tracking-[0.28em] text-[color:var(--color-charcoal-soft)] underline-offset-4 transition-colors hover:text-[color:var(--color-charcoal)] hover:underline"
              >
                View full bag
              </Link>
              <p className="mt-3 text-center text-[0.7rem] leading-[1.5] text-[color:var(--color-charcoal-soft)]">
                A tracking link is emailed to you once your order ships.
              </p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
