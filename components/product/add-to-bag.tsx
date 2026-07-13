"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { useCart } from "@/components/cart/cart-provider";

interface Props {
  priceINR: number;
  subscribeOffer?: boolean;
  /** Shopify variant id for the current selection – required to add to bag. */
  variantId?: string;
  /** Whether the selected variant is in stock. */
  available?: boolean;
}

export function AddToBag({
  priceINR,
  subscribeOffer = true,
  variantId,
  available = true,
}: Props) {
  const [mode, setMode] = useState<"one-time" | "subscribe">("one-time");
  const subscribePrice = Math.round(priceINR * 0.85);
  const { add, pending } = useCart();
  const soldOut = !available;

  return (
    <div className="grid gap-5">
      {/* Plain price line – shown when there's no subscribe/one-time chooser
          (e.g. diffusers), otherwise the price lives inside the options below. */}
      {!subscribeOffer && (
        <div className="flex items-baseline justify-between gap-3 border-b border-[color:var(--color-rule)] pb-5">
          <span className="text-[0.62rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)]">
            Price
          </span>
          <span
            className="tabular-nums text-[color:var(--color-charcoal)]"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.75rem",
              lineHeight: 1,
              letterSpacing: "-0.01em",
            }}
          >
            {formatINR(priceINR)}
          </span>
        </div>
      )}

      {subscribeOffer && (
        <fieldset className="grid gap-2">
          <legend className="mb-2 text-[0.62rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)]">
            Purchase
          </legend>

          <label
            className={cn(
              "group flex cursor-pointer items-start gap-4 border p-5 transition-colors duration-300",
              mode === "one-time"
                ? "border-[color:var(--color-charcoal)] bg-[color:var(--color-stardust-soft)]"
                : "border-[color:var(--color-rule)] hover:border-[color:var(--color-aerial)]"
            )}
          >
            <input
              type="radio"
              name="purchase-mode"
              value="one-time"
              checked={mode === "one-time"}
              onChange={() => setMode("one-time")}
              className="mt-1 h-4 w-4 accent-[color:var(--color-clay)]"
            />
            <span className="flex min-w-0 flex-1 items-baseline justify-between gap-3">
              <span>
                <span className="block text-[0.95rem]">One-time purchase</span>
                <span className="mt-1 block text-[0.78rem] text-[color:var(--color-charcoal-soft)]">
                  Ships from Mumbai · exchanges on damaged items
                </span>
              </span>
              <span className="text-[1rem] tabular-nums">
                {formatINR(priceINR)}
              </span>
            </span>
          </label>

          <label
            className={cn(
              "group flex cursor-pointer items-start gap-4 border p-5 transition-colors duration-300",
              mode === "subscribe"
                ? "border-[color:var(--color-charcoal)] bg-[color:var(--color-stardust-soft)]"
                : "border-[color:var(--color-rule)] hover:border-[color:var(--color-aerial)]"
            )}
          >
            <input
              type="radio"
              name="purchase-mode"
              value="subscribe"
              checked={mode === "subscribe"}
              onChange={() => setMode("subscribe")}
              className="mt-1 h-4 w-4 accent-[color:var(--color-clay)]"
            />
            <span className="flex min-w-0 flex-1 items-baseline justify-between gap-3">
              <span>
                <span className="flex items-center gap-3 text-[0.95rem]">
                  Subscribe &amp; save
                  <span className="rounded-full bg-[color:var(--color-clay)] px-2 py-0.5 text-[0.58rem] uppercase tracking-[0.24em] text-[color:var(--color-ivory)]">
                    −15%
                  </span>
                </span>
                <span className="mt-1 block text-[0.78rem] text-[color:var(--color-charcoal-soft)]">
                  Oil refill every 90 days · cancel anytime
                </span>
              </span>
              <span className="flex flex-col items-end leading-none">
                <span className="text-[0.78rem] text-[color:var(--color-charcoal-soft)] line-through">
                  {formatINR(priceINR)}
                </span>
                <span className="mt-1 text-[1rem] tabular-nums">
                  {formatINR(subscribePrice)}
                </span>
              </span>
            </span>
          </label>
        </fieldset>
      )}

      <button
        type="button"
        disabled={soldOut || !variantId || pending}
        onClick={() => variantId && add(variantId)}
        className="group relative mt-2 inline-flex h-14 items-center justify-center gap-3 overflow-hidden bg-[color:var(--color-charcoal)] px-8 text-[0.74rem] uppercase tracking-[0.32em] text-[color:var(--color-ivory)] transition-colors duration-500 hover:bg-[color:var(--color-clay-deep)] disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span className="relative z-10">
          {soldOut ? "Sold out" : pending ? "Adding…" : "Add to bag"}
        </span>
        {!soldOut && (
          <span className="relative z-10 transition-transform duration-500 group-hover:translate-x-1">
            →
          </span>
        )}
      </button>

      <p className="mt-1 text-[0.7rem] uppercase tracking-[0.24em] text-[color:var(--color-charcoal-soft)]">
        Free shipping over ₹5,000
      </p>
    </div>
  );
}

function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}
