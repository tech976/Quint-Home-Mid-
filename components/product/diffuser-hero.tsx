"use client";

import { useState } from "react";
import Link from "next/link";
import { FadeUp } from "@/components/motion/fade-up";
import { ProductGallery } from "@/components/product/product-gallery";
import { AddToBag } from "@/components/product/add-to-bag";
import { PairBundle, type PairOption } from "@/components/product/pair-bundle";
import { oils } from "@/lib/data/oils";
import { cn } from "@/lib/utils";
import type { Diffuser } from "@/lib/types";

/**
 * Diffuser PDP hero — gallery + buy box. Client component so a colour
 * selector can swap the gallery + finish in place (for models that ship
 * in more than one colour, e.g. the A326 in gold / black).
 */
export function DiffuserHero({ product }: { product: Diffuser }) {
  const colors = product.colors;
  const [active, setActive] = useState(0);
  const color = colors?.[active];

  const gallery = color?.gallery ?? product.gallery;
  const finish = color?.finish ?? product.finish;

  // Included starting oil — chosen here rather than at checkout.
  const [oilSlug, setOilSlug] = useState(oils[0].slug);

  const connectivityLabel = product.bluetooth
    ? "Bluetooth · companion app"
    : "24-hour cyclic timer";

  const facts = [
    { k: "Coverage", v: product.coverageLabel },
    { k: "Connectivity", v: connectivityLabel },
    { k: "Dimensions", v: product.height },
    { k: "Finish", v: finish },
  ];

  // Bundle — add an extra oil to the order at a discount.
  const oilOptions: PairOption[] = oils.map((o) => ({
    slug: o.slug,
    name: o.name,
    priceINR: o.priceINR,
    image: o.image,
    meta: o.mood,
  }));

  return (
    <section className="border-b border-[color:var(--color-rule)] pt-10 md:pt-14">
      <div className="mx-auto grid max-w-[var(--container-full)] gap-12 px-6 md:px-10 lg:grid-cols-[minmax(0,37rem)_minmax(0,34rem)] lg:justify-center lg:gap-12">
        {/* Gallery — sticky so the image stays in view while the buy box scrolls */}
        <div className="min-w-0 lg:sticky lg:top-28 lg:self-start">
          <FadeUp>
            <div className="mb-6 flex items-center gap-4 text-[0.6rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
              <Link href="/shop" className="hover:text-[color:var(--color-clay)]">
                Shop
              </Link>
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

        {/* Buy box — scrolls normally past the pinned gallery */}
        <aside className="min-w-0">
          <div className="lg:pb-14">
            <FadeUp>
              <p className="text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
                Diffuser
              </p>
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
                <AddToBag priceINR={product.priceINR} />
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

            {/* Key facts */}
            <FadeUp delay={0.26}>
              <dl className="mt-10 grid grid-cols-2 gap-y-6 border-t border-[color:var(--color-rule)] pt-8 text-[0.82rem]">
                {facts.map((f) => (
                  <div key={f.k} className="pr-4">
                    <dt className="text-[0.58rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)]">
                      {f.k}
                    </dt>
                    <dd className="mt-1.5 leading-[1.5]">{f.v}</dd>
                  </div>
                ))}
              </dl>
            </FadeUp>

            <FadeUp delay={0.32}>
              <ul className="mt-8 grid gap-2.5 border-t border-[color:var(--color-rule)] pt-8 text-[0.8rem] leading-[1.5] text-[color:var(--color-charcoal-soft)]">
                <li className="flex items-baseline gap-3">
                  <span className="text-[color:var(--color-clay)]">—</span>
                  Ships with your chosen 100 ml oil, ready to use.
                </li>
                <li className="flex items-baseline gap-3">
                  <span className="text-[color:var(--color-clay)]">—</span>
                  2-year limited device warranty.
                </li>
                <li className="flex items-baseline gap-3">
                  <span className="text-[color:var(--color-clay)]">—</span>
                  Subscribe &amp; Save on refills — pause anytime.
                </li>
              </ul>
            </FadeUp>
          </div>
        </aside>
      </div>
    </section>
  );
}
