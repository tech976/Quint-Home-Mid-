"use client";

import Link from "next/link";
import { FadeUp } from "@/components/motion/fade-up";
import { ProductGallery } from "@/components/product/product-gallery";
import { AddToBag } from "@/components/product/add-to-bag";
import { PairBundle, type PairOption } from "@/components/product/pair-bundle";
import { diffusers } from "@/lib/data/diffusers";
import type { FragranceOil } from "@/lib/types";

/**
 * Oil PDP hero — large bottle study on the left, buy box on the right.
 * Carries the note pyramid, the standard one-time / subscribe purchase
 * control, and a bundle option to pair the oil with a diffuser.
 */
export function OilHero({ oil }: { oil: FragranceOil }) {
  // Pair-with-a-diffuser options for the bundle control.
  const diffuserOptions: PairOption[] = diffusers.map((d) => ({
    slug: d.slug,
    name: d.name,
    priceINR: d.priceINR,
    image: d.image,
    meta: d.coverageLabel,
  }));

  const facts = [
    { k: "Volume", v: `${oil.volumeML} ml` },
    { k: "Concentration", v: "70–90%" },
    { k: "Lasts", v: "60–140 days a fill" },
    { k: "Profile", v: oil.mood },
  ];

  return (
    <section className="border-b border-[color:var(--color-rule)] pt-10 md:pt-14">
      <div className="mx-auto grid max-w-[var(--container-full)] gap-12 px-6 md:px-10 lg:grid-cols-[minmax(0,37rem)_minmax(0,34rem)] lg:justify-center lg:gap-12">
        {/* Image — sticky bottle study + a swatch panel that carries the notes */}
        <div className="min-w-0 lg:sticky lg:top-28 lg:self-start">
          <FadeUp>
            <div className="mb-6 flex items-center gap-4 text-[0.6rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
              <Link href="/shop" className="hover:text-[color:var(--color-clay)]">
                Shop
              </Link>
              <span className="h-px w-6 bg-[color:var(--color-rule)]" />
              <span>Fragrance Oils</span>
            </div>
          </FadeUp>
          <FadeUp delay={0.05}>
            <ProductGallery
              images={[oil.image]}
              alt={`${oil.name} — bottle study`}
            />
          </FadeUp>
        </div>

        {/* Buy box */}
        <aside className="min-w-0">
          <div className="lg:pb-14">
            <FadeUp>
              <p className="flex items-center gap-3 text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
                Fragrance Oil · {oil.volumeML} ml
                {oil.tier === "hotel-credential" && (
                  <span className="rounded-full border border-current px-2 py-0.5 text-[0.5rem] tracking-[0.28em]">
                    Hotel Credential
                  </span>
                )}
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
                {oil.name}
              </h1>
            </FadeUp>

            <FadeUp delay={0.12}>
              <p className="mt-5 max-w-[42ch] text-[var(--text-lg)] leading-[1.5] text-[color:var(--color-charcoal-soft)]">
                {oil.tagline}
              </p>
            </FadeUp>

            <FadeUp delay={0.16}>
              <p className="mt-5 max-w-[52ch] text-[0.95rem] leading-[1.8] text-[color:var(--color-charcoal)]">
                {oil.description}
              </p>
            </FadeUp>

            {/* Note pyramid */}
            <FadeUp delay={0.2}>
              <dl className="mt-8 grid gap-1.5 border-t border-[color:var(--color-rule)] pt-6 text-[0.9rem] leading-[1.45]">
                {(
                  [
                    ["Top", oil.notes.top],
                    ["Heart", oil.notes.heart],
                    ["Base", oil.notes.base],
                  ] as const
                ).map(([label, arr]) => (
                  <div
                    key={label}
                    className="grid grid-cols-[3.5rem_1fr] gap-4 border-b border-[color:var(--color-rule)] py-2"
                  >
                    <dt className="pt-px text-[0.56rem] uppercase tracking-[0.28em] text-[color:var(--color-charcoal-soft)]">
                      {label}
                    </dt>
                    <dd className="text-[color:var(--color-charcoal)]">
                      {arr.join(", ")}
                    </dd>
                  </div>
                ))}
              </dl>
            </FadeUp>

            {/* Purchase — one-time / subscribe */}
            <FadeUp delay={0.24}>
              <div className="mt-8">
                <AddToBag priceINR={oil.priceINR} />
              </div>
            </FadeUp>

            {/* Bundle — pair with a diffuser */}
            <FadeUp delay={0.28}>
              <div className="mt-8">
                <p className="mb-3 text-[0.62rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)]">
                  Make it a set
                </p>
                <PairBundle
                  basePriceINR={oil.priceINR}
                  baseName={oil.name}
                  partnerNoun="diffuser"
                  heading="Add a diffuser"
                  options={diffuserOptions}
                />
              </div>
            </FadeUp>

            {/* Key facts */}
            <FadeUp delay={0.32}>
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

            <FadeUp delay={0.36}>
              <ul className="mt-8 grid gap-2.5 border-t border-[color:var(--color-rule)] pt-8 text-[0.8rem] leading-[1.5] text-[color:var(--color-charcoal-soft)]">
                <li className="flex items-baseline gap-3">
                  <span className="text-[color:var(--color-clay)]">—</span>
                  IFRA-compliant, blended like fine perfumery.
                </li>
                <li className="flex items-baseline gap-3">
                  <span className="text-[color:var(--color-clay)]">—</span>
                  Made for Quint waterless diffusers only.
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
