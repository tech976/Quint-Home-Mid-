"use client";

import { useState } from "react";
import { FadeUp } from "@/components/motion/fade-up";
import { ProductGallery } from "@/components/product/product-gallery";
import { AddToBag } from "@/components/product/add-to-bag";
import { PairBundle, type PairOption } from "@/components/product/pair-bundle";
import { oils } from "@/lib/data/oils";
import { cn } from "@/lib/utils";
import type { Diffuser } from "@/lib/types";

/**
 * Diffuser PDP — images on the left (sticky), and a single right column that
 * carries the buy box, then the overview, key features and technical
 * specifications. Specs are sourced from the Quint Home website brief's
 * "Electronic Diffusers — Product Value Proposition", not the old catalogue
 * sheet. A colour selector swaps the gallery + finish in place for multi-finish
 * models (e.g. the A326 in gold / black).
 */
export function DiffuserHero({ product }: { product: Diffuser }) {
  const colors = product.colors;
  const [active, setActive] = useState(0);
  const color = colors?.[active];

  const gallery = color?.gallery ?? product.gallery;

  // Included starting oil — chosen here rather than at checkout.
  const [oilSlug, setOilSlug] = useState(oils[0].slug);

  const descriptionParagraphs = product.description.split("\n\n");

  // Bundle — add an extra oil to the order at a discount.
  const oilOptions: PairOption[] = oils.map((o) => ({
    slug: o.slug,
    name: o.name,
    priceINR: o.priceINR,
    image: o.image,
    meta: o.mood,
  }));

  // Technical specifications — sourced ONLY from the Quint Home website brief's
  // "Electronic Diffusers — Product Value Proposition" (no catalogue figures).
  // Connectivity / smart-home / scheduling apply per model.
  const isDualMist = product.slug === "dual-mist-at302";
  const techSpecs: { label: string; value: string }[] = [
    { label: "Type", value: "Waterless cold-air nebulising electronic diffuser" },
    { label: "Technology", value: "Cold-air nebulization — no water, no steam, no heat" },
    { label: "Coverage", value: "200 sq ft (bedroom) to 500+ sq ft (living / open plan), depending on model" },
    {
      label: "Connectivity",
      value: product.bluetooth
        ? "Bluetooth enabled — app-controlled, plus physical controls"
        : "Physical controls",
    },
    ...(product.bluetooth
      ? [{ label: "Smart home", value: "Apple Home · Amazon Alexa · Google Home" }]
      : []),
    ...(isDualMist
      ? [{ label: "Scheduling", value: "Set morning and evening schedules and intensity once via the app" }]
      : []),
    { label: "Operation", value: "Silent — no fan noise, no water gurgling" },
    { label: "Design", value: "A sculpted decor object, made to be displayed on a shelf, not hidden" },
    { label: "Fragrance oils", value: "70–90% concentration · IFRA-compliant · 100 ml refill" },
    { label: "Oil refill life", value: "Approximately 60–120 days, depending on usage" },
    { label: "Safety", value: "No open flame, no heat, no water — safe around children and pets" },
    { label: "Warranty", value: "1-year limited device warranty" },
  ];

  const sectionLabel =
    "text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]";

  return (
    <section className="border-b border-[color:var(--color-rule)] pt-10 md:pt-14">
      <div className="mx-auto grid max-w-[var(--container-full)] gap-12 px-6 pb-[var(--spacing-section)] md:px-10 lg:grid-cols-[minmax(0,38rem)_minmax(0,40rem)] lg:justify-center lg:gap-16">
        {/* ===== Gallery — sticky on the left ===== */}
        <div className="min-w-0 lg:sticky lg:top-28 lg:self-start">
          <FadeUp>
            <div className="mb-6 flex items-center gap-4 text-[0.6rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
              <span>Shop</span>
              <span className="h-px w-6 bg-[color:var(--color-rule)]" />
              <span>Diffusers</span>
            </div>
          </FadeUp>
          <FadeUp delay={0.05}>
            {/* key={active} remounts the gallery so it resets to the new colour's first image */}
            <ProductGallery
              key={active}
              images={gallery}
              alt={`${product.name}${color ? ` — ${color.name}` : ""} — Quint Home`}
            />
          </FadeUp>
        </div>

        {/* ===== Right column — buy box, overview, key features, specs ===== */}
        <aside className="min-w-0">
          {/* --- Buy box --- */}
          <FadeUp>
            <p className={sectionLabel}>Diffuser</p>
          </FadeUp>

          <FadeUp delay={0.06}>
            <h1
              className="mt-6 text-balance"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "var(--text-5xl)",
                lineHeight: 1.0,
                letterSpacing: "-0.024em",
                fontWeight: 400,
              }}
            >
              {product.name}
            </h1>
          </FadeUp>

          <FadeUp delay={0.12}>
            <p className="mt-5 max-w-[40ch] text-[var(--text-lg)] leading-[1.5] text-[color:var(--color-charcoal-soft)]">
              {product.tagline}
            </p>
          </FadeUp>

          {/* Colour selector — only when the model ships in more than one finish */}
          {colors && colors.length > 1 && (
            <FadeUp delay={0.16}>
              <div className="mt-8">
                <p className="text-[0.58rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)]">
                  Finish — {color?.name}
                </p>
                <div className="mt-3 flex items-center gap-3">
                  {colors.map((c, i) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setActive(i)}
                      aria-label={c.name}
                      aria-pressed={i === active}
                      title={c.name}
                      className={cn(
                        "relative h-8 w-8 rounded-full transition-transform duration-300 hover:scale-105",
                        i === active
                          ? "ring-1 ring-[color:var(--color-charcoal)] ring-offset-2 ring-offset-[color:var(--color-white)]"
                          : "ring-1 ring-[color:var(--color-rule)]"
                      )}
                      style={{ backgroundColor: c.swatch }}
                    />
                  ))}
                </div>
              </div>
            </FadeUp>
          )}

          {/* Starting oil selector — included free, on every diffuser */}
          <FadeUp delay={0.18}>
            <div className="mt-8">
              <label
                htmlFor="starting-oil"
                className="text-[0.58rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)]"
              >
                Choose your included oil
              </label>
              <div className="relative mt-3 min-w-0 overflow-hidden">
                <select
                  id="starting-oil"
                  value={oilSlug}
                  onChange={(e) => setOilSlug(e.target.value)}
                  className="w-full min-w-0 cursor-pointer appearance-none truncate border-b border-[color:var(--color-charcoal)] bg-transparent py-2.5 pr-8 font-[family-name:var(--font-serif)] text-[1.05rem] text-[color:var(--color-charcoal)] outline-none transition-colors duration-300 focus:border-[color:var(--color-clay)]"
                >
                  {oils.map((o) => (
                    <option key={o.slug} value={o.slug}>
                      {o.name}
                      {o.tier === "hotel-credential" ? " · Hotel Credential" : ""}
                    </option>
                  ))}
                </select>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-[0.72rem] text-[color:var(--color-charcoal-soft)]"
                >
                  ↓
                </span>
              </div>
              <p className="mt-2.5 text-[0.72rem] leading-[1.5] text-[color:var(--color-charcoal-soft)]">
                Your first 100 ml is included free. Swap scents or add more
                anytime.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.22}>
            <div className="mt-8">
              {/* No subscribe & save on diffusers — that offer is for the oils only */}
              <AddToBag priceINR={product.priceINR} subscribeOffer={false} />
            </div>
          </FadeUp>

          {/* Bundle — add another oil to the set */}
          <FadeUp delay={0.24}>
            <div className="mt-8">
              <p className="mb-3 text-[0.62rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)]">
                Build your set
              </p>
              <PairBundle
                basePriceINR={product.priceINR}
                baseName={product.name}
                partnerNoun="oil"
                heading="Add another oil"
                options={oilOptions}
              />
            </div>
          </FadeUp>

          {/* Assurances */}
          <FadeUp delay={0.26}>
            <ul className="mt-8 grid gap-2.5 border-t border-[color:var(--color-rule)] pt-8 text-[0.8rem] leading-[1.5] text-[color:var(--color-charcoal-soft)]">
              <li className="flex items-baseline gap-3">
                <span className="text-[color:var(--color-clay)]">—</span>
                Ships with your chosen 100 ml oil, ready to use.
              </li>
              <li className="flex items-baseline gap-3">
                <span className="text-[color:var(--color-clay)]">—</span>
                1-year limited device warranty.
              </li>
              <li className="flex items-baseline gap-3">
                <span className="text-[color:var(--color-clay)]">—</span>
                IFRA-compliant oils at 70–90% concentration.
              </li>
            </ul>
          </FadeUp>

          {/* --- Overview --- */}
          <FadeUp delay={0.06}>
            <div className="mt-14 border-t border-[color:var(--color-rule)] pt-10">
              <p className={sectionLabel}>Overview</p>
              <div className="mt-6 space-y-5">
                {descriptionParagraphs.map((para, i) => (
                  <p
                    key={i}
                    className={
                      i === 0
                        ? "text-[var(--text-lg)] leading-[1.6] text-[color:var(--color-charcoal)]"
                        : "text-[0.95rem] leading-[1.8] text-[color:var(--color-charcoal-soft)]"
                    }
                  >
                    {para}
                  </p>
                ))}
              </div>
              <div className="mt-7 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-[color:var(--color-rule)] pt-5">
                <span className="text-[0.58rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)]">
                  Best for
                </span>
                <span className="text-[0.9rem] text-[color:var(--color-charcoal)]">
                  {product.bestFor.join("  ·  ")}
                </span>
              </div>
            </div>
          </FadeUp>

          {/* --- Key features --- */}
          <FadeUp delay={0.06}>
            <div className="mt-12 border-t border-[color:var(--color-rule)] pt-10">
              <p className={sectionLabel}>Key features</p>
              <ul className="mt-6 grid gap-4">
                {product.keyFeatures.map((feature, i) => {
                  const dash = feature.indexOf(" — ");
                  const lead = dash > -1 ? feature.slice(0, dash) : feature;
                  const desc = dash > -1 ? feature.slice(dash + 3) : "";
                  return (
                    <li key={i} className="flex gap-4">
                      <span className="shrink-0 pt-0.5 text-[0.7rem] tabular-nums text-[color:var(--color-clay)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0">
                        <p className="text-[0.95rem] leading-[1.4] text-[color:var(--color-charcoal)]">
                          {lead}
                        </p>
                        {desc && (
                          <p className="mt-1 text-[0.84rem] leading-[1.55] text-[color:var(--color-charcoal-soft)]">
                            {desc}
                          </p>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </FadeUp>

          {/* --- Technical specifications --- */}
          <FadeUp delay={0.06}>
            <div className="mt-12 border-t border-[color:var(--color-rule)] pt-10">
              <p className={sectionLabel}>Technical specifications</p>
              <dl className="mt-6 border-t border-[color:var(--color-rule)]">
                {techSpecs.map((s) => (
                  <div
                    key={s.label}
                    className="grid grid-cols-[8.5rem_1fr] gap-4 border-b border-[color:var(--color-rule)] py-3.5"
                  >
                    <dt className="pt-0.5 text-[0.56rem] uppercase tracking-[0.26em] text-[color:var(--color-charcoal-soft)]">
                      {s.label}
                    </dt>
                    <dd className="text-[0.9rem] leading-[1.5] text-[color:var(--color-charcoal)]">
                      {s.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </FadeUp>
        </aside>
      </div>
    </section>
  );
}
