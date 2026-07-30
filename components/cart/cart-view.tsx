"use client";

import Link from "next/link";
import { useCart } from "./cart-provider";
import { formatINR } from "@/lib/utils";
import { FadeUp } from "@/components/motion/fade-up";
import { Monogram } from "@/components/brand/logo";
import { FREE_SHIPPING_FROM } from "@/lib/checkout-config";

export function CartView({
  headlessCheckout = false,
}: {
  /** True once PayU + the Shopify Admin API are configured; until then the
   *  bag keeps handing off to the Shopify-hosted checkout. */
  headlessCheckout?: boolean;
}) {
  const { cart, update, remove, pending } = useCart();
  const lines = cart?.lines ?? [];
  const subtotal = cart?.subtotal ?? 0;
  const freeShipping = subtotal >= FREE_SHIPPING_FROM;

  /* ── Empty bag ─────────────────────────────────────────────── */
  if (lines.length === 0) {
    return (
      <div className="mx-auto flex max-w-[var(--container-content)] flex-col items-center px-6 py-[var(--spacing-section)] text-center md:px-10">
        <FadeUp>
          <p className="font-eyebrow">
            <Monogram className="mr-1.5 inline-block h-[0.9em] w-[0.9em] align-[-0.12em]" />
            Bag
          </p>
          <h1
            className="mt-7 max-w-[18ch]"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "var(--text-4xl)",
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
            }}
          >
            Your bag is currently empty.
          </h1>
          <p className="mt-8 max-w-[44ch] text-[var(--text-base)] leading-[1.75] text-[color:var(--color-charcoal-soft)]">
            Every Quint Home diffuser ships with the fragrance oil of your
            choice. Start with the range.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <Link
              href="/shop#diffusers"
              className="group inline-flex items-center gap-3 bg-[color:var(--color-charcoal)] px-8 py-4 text-[0.74rem] uppercase tracking-[0.32em] text-[color:var(--color-ivory)] transition-colors duration-500 hover:bg-[color:var(--color-clay-deep)]"
            >
              Shop diffusers
              <span className="transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </Link>
            <Link
              href="/find-your-scent"
              className="text-[0.72rem] uppercase tracking-[0.28em] text-[color:var(--color-charcoal-soft)] underline-offset-4 transition-colors duration-500 hover:text-[color:var(--color-charcoal)] hover:underline"
            >
              Find your scent
            </Link>
          </div>
        </FadeUp>
      </div>
    );
  }

  /* ── Bag with items ────────────────────────────────────────── */
  return (
    <div className="mx-auto max-w-[var(--container-full)] px-6 py-[var(--spacing-section-sm)] md:px-10">
      <FadeUp>
        <div className="border-b border-[color:var(--color-rule)] pb-8">
          <p className="font-eyebrow">
            <Monogram className="mr-1.5 inline-block h-[0.9em] w-[0.9em] align-[-0.12em]" />
            Bag
          </p>
          <h1
            className="mt-6"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "var(--text-4xl)",
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
              fontWeight: 400,
            }}
          >
            Your bag{" "}
            <em className="text-[color:var(--color-aerial-deep)]">
              ({cart?.totalQuantity ?? 0}).
            </em>
          </h1>
        </div>
      </FadeUp>

      <div className="grid gap-12 pt-10 md:grid-cols-12 md:gap-16">
        {/* Line items */}
        <div className="md:col-span-7">
          <ul>
            {lines.map((l) => (
              <li
                key={l.id}
                className="flex gap-5 border-b border-[color:var(--color-rule)] py-7 first:pt-0"
              >
                <Link
                  href={`/shop/${l.handle}`}
                  className="relative h-32 w-24 shrink-0 overflow-hidden bg-[color:var(--color-stardust-soft)] sm:h-40 sm:w-32"
                >
                  {/* Shopify CDN images are not in next.config remotePatterns,
                      so use a plain img (same as the drawer). */}
                  {l.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={l.image}
                      alt={l.productTitle}
                      className="h-[100%] w-[100%] object-cover"
                    />
                  )}
                </Link>

                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-baseline justify-between gap-4">
                    <Link
                      href={`/shop/${l.handle}`}
                      className="transition-colors duration-500 hover:text-[color:var(--color-clay)]"
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "var(--text-xl)",
                        lineHeight: 1.1,
                        letterSpacing: "-0.012em",
                        fontWeight: 400,
                      }}
                    >
                      {l.productTitle}
                    </Link>
                    <span className="shrink-0 text-[0.95rem] tabular-nums">
                      {formatINR(l.price * l.quantity)}
                    </span>
                  </div>

                  {l.variantTitle && l.variantTitle !== "Default Title" && (
                    <p className="mt-1.5 text-[0.72rem] uppercase tracking-[0.2em] text-[color:var(--color-charcoal-soft)]">
                      {l.variantTitle}
                    </p>
                  )}

                  {l.quantity > 1 && (
                    <p className="mt-1.5 text-[0.78rem] tabular-nums text-[color:var(--color-charcoal-soft)]">
                      {formatINR(l.price)} each
                    </p>
                  )}

                  <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-5">
                    <div className="flex items-center border border-[color:var(--color-rule)]">
                      <button
                        type="button"
                        aria-label={`Decrease quantity of ${l.productTitle}`}
                        disabled={pending}
                        onClick={() => update(l.id, l.quantity - 1)}
                        className="px-3 py-1.5 text-[0.95rem] transition-colors hover:text-[color:var(--color-clay)] disabled:opacity-50"
                      >
                        −
                      </button>
                      <span className="min-w-[2.5ch] text-center text-[0.85rem] tabular-nums">
                        {l.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label={`Increase quantity of ${l.productTitle}`}
                        disabled={pending}
                        onClick={() => update(l.id, l.quantity + 1)}
                        className="px-3 py-1.5 text-[0.95rem] transition-colors hover:text-[color:var(--color-clay)] disabled:opacity-50"
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      disabled={pending}
                      onClick={() => remove(l.id)}
                      className="text-[0.68rem] uppercase tracking-[0.28em] text-[color:var(--color-charcoal-soft)] underline-offset-4 transition-colors hover:text-[color:var(--color-clay)] hover:underline disabled:opacity-50"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <Link
            href="/shop"
            className="mt-8 inline-block text-[0.72rem] uppercase tracking-[0.28em] text-[color:var(--color-charcoal-soft)] underline-offset-4 transition-colors duration-500 hover:text-[color:var(--color-charcoal)] hover:underline"
          >
            ← Continue shopping
          </Link>
        </div>

        {/* Order summary */}
        <div className="md:col-span-5">
          <div className="border border-[color:var(--color-rule)] bg-[color:var(--color-stardust-soft)] p-7 md:sticky md:top-32 md:p-8">
            <p className="font-eyebrow">Order summary</p>

            <dl className="mt-7 grid gap-3.5 text-[0.9rem]">
              <div className="flex items-baseline justify-between">
                <dt className="text-[color:var(--color-charcoal-soft)]">
                  Subtotal
                </dt>
                <dd className="tabular-nums">{formatINR(subtotal)}</dd>
              </div>
              <div className="flex items-baseline justify-between">
                <dt className="text-[color:var(--color-charcoal-soft)]">
                  Shipping
                </dt>
                <dd
                  className={
                    freeShipping
                      ? "text-[color:var(--color-aerial-deep)]"
                      : "text-[color:var(--color-charcoal-soft)]"
                  }
                >
                  {freeShipping ? "Complimentary" : "At checkout"}
                </dd>
              </div>
            </dl>

            <div className="mt-5 flex items-baseline justify-between border-t border-[color:var(--color-rule)] pt-5">
              <span className="text-[0.62rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)]">
                Total
              </span>
              <span
                className="tabular-nums"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "var(--text-2xl)",
                  fontWeight: 400,
                }}
              >
                {formatINR(subtotal)}
              </span>
            </div>

            {!freeShipping && (
              <p className="mt-4 text-[0.78rem] leading-[1.6] text-[color:var(--color-charcoal-soft)]">
                Add {formatINR(FREE_SHIPPING_FROM - subtotal)} more for
                complimentary shipping.
              </p>
            )}

            {/* Checkout hand-off: our own checkout + PayU once configured,
                otherwise the Shopify-hosted checkout. */}
            {headlessCheckout ? (
              <Link
                href="/checkout"
                className="group mt-7 flex items-center justify-center gap-3 bg-[color:var(--color-charcoal)] px-8 py-4 text-[0.74rem] uppercase tracking-[0.32em] text-[color:var(--color-ivory)] transition-colors duration-500 hover:bg-[color:var(--color-clay-deep)]"
              >
                Proceed to checkout
                <span className="transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            ) : (
              <a
                href={cart?.checkoutUrl ?? "#"}
                aria-disabled={!cart?.checkoutUrl}
                className="group mt-7 flex items-center justify-center gap-3 bg-[color:var(--color-charcoal)] px-8 py-4 text-[0.74rem] uppercase tracking-[0.32em] text-[color:var(--color-ivory)] transition-colors duration-500 hover:bg-[color:var(--color-clay-deep)]"
              >
                Proceed to checkout
                <span className="transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </a>
            )}

            <p className="mt-5 text-[0.75rem] leading-[1.65] text-[color:var(--color-charcoal-soft)]">
              Taxes are calculated at checkout. A tracking link is emailed to
              you once your order ships.
            </p>

            <p className="mt-5 border-t border-[color:var(--color-rule)] pt-5 text-[0.75rem] leading-[1.65] text-[color:var(--color-charcoal-soft)]">
              Questions before you order? See our{" "}
              <Link
                href="/shipping"
                className="underline-offset-4 hover:text-[color:var(--color-charcoal)] hover:underline"
              >
                Shipping &amp; Returns
              </Link>{" "}
              policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
