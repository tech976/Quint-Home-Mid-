"use client";

import { useState } from "react";
import Image from "next/image";
import { formatINR } from "@/lib/utils";
import { useCart } from "@/components/cart/cart-provider";

export interface PairOption {
  slug: string;
  name: string;
  priceINR: number;
  image: string;
  /** Shopify variant id — without it the option cannot be added to the bag. */
  variantId?: string;
  /** Small supporting line, e.g. coverage or scent family. */
  meta?: string;
  /** Scent-note summary shown in the option label and under the picker. */
  note?: string;
}

interface Props {
  /** Price of the product whose page we're on. */
  basePriceINR: number;
  /** What the base product is called in the running total, e.g. "Plug-In Diffuser". */
  baseName: string;
  /** Shopify variant of the product whose page we're on. */
  baseVariantId?: string;
  /** Noun for the thing being added, lowercase singular: "diffuser" | "oil". */
  partnerNoun: string;
  /** Headline above the picker. */
  heading: string;
  options: PairOption[];
  /**
   * Bundle saving to advertise. Defaults to 0 — the discount shown here must
   * match a real Shopify automatic discount, otherwise the bag would total
   * more than the page promised. Set it only once that discount exists.
   */
  discountRate?: number;
}

/**
 * Bundle / pairing control for the buy box. Lets the customer add a companion
 * product (a diffuser to an oil, or an extra oil to a diffuser) at a bundle
 * discount, with a live running total. Quiet, rule-divided, no Shopify chrome.
 */
export function PairBundle({
  basePriceINR,
  baseName,
  baseVariantId,
  partnerNoun,
  heading,
  options,
  discountRate = 0,
}: Props) {
  const [paired, setPaired] = useState(false);
  const [slug, setSlug] = useState(options[0]?.slug ?? "");
  const { add, pending } = useCart();

  const partner = options.find((o) => o.slug === slug) ?? options[0];
  const partnerFull = partner?.priceINR ?? 0;
  const partnerBundled = Math.round(partnerFull * (1 - discountRate));
  const saving = partnerFull - partnerBundled;
  const total = basePriceINR + (paired ? partnerBundled : 0);
  const article = /^[aeiou]/i.test(partnerNoun) ? "an" : "a";

  if (options.length === 0) return null;

  return (
    <div className="w-[100%] overflow-hidden border border-[color:var(--color-rule)]">
      {/* Toggle row */}
      <label className="flex cursor-pointer items-start gap-4 p-5">
        <input
          type="checkbox"
          checked={paired}
          onChange={(e) => setPaired(e.target.checked)}
          className="mt-1 h-4 w-4 accent-[color:var(--color-clay)]"
        />
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="flex items-center gap-3 text-[0.95rem]">
            {heading}
            {discountRate > 0 && (
              <span className="rounded-full bg-[color:var(--color-clay)] px-2 py-0.5 text-[0.56rem] uppercase tracking-[0.24em] text-[color:var(--color-ivory)]">
                −{Math.round(discountRate * 100)}%
              </span>
            )}
          </span>
          <span className="mt-1 text-[0.78rem] leading-[1.5] text-[color:var(--color-charcoal-soft)]">
            {discountRate > 0
              ? `Add ${article} ${partnerNoun} to your order and save ${formatINR(saving)} on it.`
              : `Add ${article} ${partnerNoun} to your order.`}
          </span>
        </span>
      </label>

      {/* Picker – revealed when paired. Thumbnail + name select on the left,
          bundled price pinned right so the row reads balanced, never sparse. */}
      {paired && partner && (
        <div className="border-t border-[color:var(--color-rule)] p-5">
          <div className="flex items-center gap-4">
            <div className="relative h-14 w-12 shrink-0 overflow-hidden bg-[color:var(--color-stardust-soft)]">
              <Image
                src={partner.image}
                alt={partner.name}
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <label
                htmlFor="pair-select"
                className="text-[0.54rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)]"
              >
                Choose {article} {partnerNoun}
              </label>
              <div className="relative mt-1 min-w-0 overflow-hidden">
                <select
                  id="pair-select"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-[100%] min-w-0 cursor-pointer appearance-none truncate border-b border-[color:var(--color-charcoal)] bg-transparent py-1.5 pr-7 font-[family-name:var(--font-serif)] text-[0.98rem] text-[color:var(--color-charcoal)] outline-none transition-colors duration-300 focus:border-[color:var(--color-clay)]"
                >
                  {options.map((o) => (
                    <option key={o.slug} value={o.slug}>
                      {o.name}
                      {o.note ? ` – ${o.note}` : ""}
                    </option>
                  ))}
                </select>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-0.5 top-1/2 -translate-y-1/2 text-[0.68rem] text-[color:var(--color-charcoal-soft)]"
                >
                  ↓
                </span>
              </div>
              {partner.note && (
                <p className="mt-1.5 text-[0.72rem] leading-[1.4] text-[color:var(--color-charcoal-soft)]">
                  {partner.note}
                </p>
              )}
            </div>
            <span className="flex shrink-0 flex-col items-end leading-none">
              <span className="text-[0.68rem] text-[color:var(--color-charcoal-soft)] line-through">
                {formatINR(partnerFull)}
              </span>
              <span className="mt-1 text-[0.95rem] tabular-nums">
                {formatINR(partnerBundled)}
              </span>
            </span>
          </div>
        </div>
      )}

      {/* Running total + bundle action – only once a partner is added.
          The primary "Add to bag" lives in the buy box above; this stays
          secondary so it never competes with it. */}
      {paired && (
        <div className="border-t border-[color:var(--color-rule)] bg-[color:var(--color-stardust-soft)] p-5">
          <div className="flex items-center justify-between">
            <span className="text-[0.6rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)]">
              {baseName} + {partnerNoun}
            </span>
            <span className="text-[0.98rem] tabular-nums">
              {formatINR(total)}
            </span>
          </div>
          {/* Contained secondary button – not a full-bleed bar, so it reads as
              a button and never looks stretched. */}
          <button
            type="button"
            disabled={pending || !baseVariantId || !partner?.variantId}
            onClick={() => {
              // Both items go in: the running total above quotes the pair.
              if (baseVariantId) add(baseVariantId);
              if (partner?.variantId) add(partner.variantId);
            }}
            className="group mt-4 flex h-12 w-[100%] items-center justify-center gap-2.5 border border-[color:var(--color-charcoal)] px-6 text-[0.68rem] uppercase tracking-[0.26em] text-[color:var(--color-charcoal)] transition-colors duration-500 hover:bg-[color:var(--color-charcoal)] hover:text-[color:var(--color-ivory)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-[color:var(--color-charcoal)]"
          >
            <span>{pending ? "Adding…" : "Add bundle to bag"}</span>
            <span className="transition-transform duration-500 group-hover:translate-x-1">
              →
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
