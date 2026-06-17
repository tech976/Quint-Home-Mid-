import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { diffusers } from "@/lib/data/diffusers";
import { oils } from "@/lib/data/oils";
import { formatINR } from "@/lib/utils";
import { FadeUp } from "@/components/motion/fade-up";
import { ShopBrowser } from "@/components/shop/shop-browser";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Diffusers and fragrance oils — the Quint Home range. Editorial, considered, IFRA-compliant.",
};

export default function ShopPage() {
  return (
    <article className="bg-[color:var(--color-white)]">
      {/* ====================================================
          §  HERO MASTHEAD
          ==================================================== */}
      <section className="border-b border-[color:var(--color-rule)] pt-10 md:pt-14">
        <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
          <div className="grid items-end gap-10 pb-12 md:grid-cols-12 md:gap-16">
            <FadeUp delay={0.05} className="md:col-span-7">
              <p className="text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
                Shop · Diffusers · Oils
              </p>
              <h1
                className="mt-7 max-w-[16ch] text-balance"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "var(--text-5xl)",
                  lineHeight: 0.96,
                  letterSpacing: "-0.024em",
                  fontWeight: 400,
                }}
              >
                The diffusers, and{" "}
                <em className="text-[color:var(--color-aerial-deep)]">
                  the eight oils that go in them.
                </em>
              </h1>
            </FadeUp>

            <FadeUp delay={0.1} className="md:col-span-5 md:pl-2">
              <p className="max-w-[44ch] text-[var(--text-base)] leading-[1.85] text-[color:var(--color-charcoal-soft)]">
                Pick the diffuser that fits the room. Then choose a scent: eight
                oils at 70&ndash;90% concentrate, each blended like fine
                perfumery and built to fill a space quietly.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ====================================================
          §  BROWSE — search + category, inline product finder
          ==================================================== */}
      <ShopBrowser />

      {/* ====================================================
          §  ONE · DIFFUSERS
          ==================================================== */}
      <section id="diffusers" className="scroll-mt-24 py-[var(--spacing-section)]">
        <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
          <FadeUp>
            <div className="mb-12 flex flex-col gap-6 border-b border-[color:var(--color-rule)] pb-6 md:mb-16 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
                  § One · Diffusers
                </p>
                <h2
                  className="mt-5 max-w-[22ch] text-balance"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "var(--text-3xl)",
                    lineHeight: 1.08,
                    letterSpacing: "-0.016em",
                    fontWeight: 400,
                  }}
                >
                  Five diffusers.{" "}
                  <em className="text-[color:var(--color-aerial-deep)]">
                    Sized for the room you put them in.
                  </em>
                </h2>
              </div>
              <p className="max-w-[28ch] text-[0.86rem] leading-[1.65] text-[color:var(--color-charcoal-soft)] md:text-right">
                Aluminium, fabric, acrylic and glass. Waterless, near-silent, controlled from the app.
                <br />
                <span className="text-[0.6rem] uppercase tracking-[0.32em]">
                  Coverage to ~100 m² →
                </span>
              </p>
            </div>
          </FadeUp>

          <div className="grid gap-y-16 sm:grid-cols-2 md:grid-cols-3 md:gap-x-8 md:gap-y-20 lg:gap-x-10">
            {diffusers.map((d, i) => (
              <FadeUp key={d.slug} delay={i * 0.05}>
                <Link href={`/shop/${d.slug}`} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden bg-[color:var(--color-stardust-soft)]">
                    <Image
                      src={d.image}
                      alt={d.name}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                      className="object-cover transition-transform duration-[1600ms] ease-[var(--ease-quint)] group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5 text-[0.6rem] uppercase tracking-[0.32em] text-[color:var(--color-stardust)] md:p-6">
                      <span>№{String(i + 1).padStart(2, "0")}</span>
                      <span>{d.tier === "premium" ? "Premium" : "Entry"}</span>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-[0.6rem] uppercase tracking-[0.32em] text-[color:var(--color-stardust)] md:p-6">
                      <span>{d.coverageLabel}</span>
                      <span className="transition-transform duration-500 group-hover:-translate-y-0.5">
                        Explore →
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-3">
                    <div className="flex items-baseline justify-between border-b border-[color:var(--color-rule)] pb-3">
                      <h3
                        className="transition-colors duration-500 group-hover:text-[color:var(--color-clay)]"
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontSize: "var(--text-2xl)",
                          lineHeight: 1.05,
                          letterSpacing: "-0.014em",
                          fontWeight: 400,
                        }}
                      >
                        {d.name}
                      </h3>
                      <span className="tabular-nums text-[0.9rem]">
                        {formatINR(d.priceINR)}
                      </span>
                    </div>
                    <p className="max-w-[38ch] text-[0.92rem] leading-[1.65] text-[color:var(--color-charcoal-soft)]">
                      {d.tagline}
                    </p>
                    <div className="mt-1 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)]">
                        {d.colors ? (
                          <>
                            <span className="flex items-center gap-1">
                              {d.colors.map((c) => (
                                <span
                                  key={c.name}
                                  className="h-2.5 w-2.5 rounded-full ring-1 ring-[color:var(--color-rule)]"
                                  style={{ backgroundColor: c.swatch }}
                                />
                              ))}
                            </span>
                            <span>{d.colors.map((c) => c.name).join(" · ")}</span>
                          </>
                        ) : (
                          <span>{d.finish}</span>
                        )}
                      </div>
                      {d.bluetooth && (
                        <span className="text-[0.54rem] uppercase tracking-[0.28em] text-[color:var(--color-charcoal-soft)]">
                          Bluetooth
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          §  TWO · OILS — the editorial scent grid
          ==================================================== */}
      <section id="oils" className="scroll-mt-24 bg-[color:var(--color-stardust-soft)] py-[var(--spacing-section)]">
        <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
          <FadeUp>
            <div className="mb-12 flex flex-col gap-6 border-b border-[color:var(--color-rule)] pb-6 md:mb-16 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
                  § Two · The Oils
                </p>
                <h2
                  className="mt-5 max-w-[22ch] text-balance"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "var(--text-3xl)",
                    lineHeight: 1.08,
                    letterSpacing: "-0.016em",
                    fontWeight: 400,
                  }}
                >
                  Eight oils.{" "}
                  <em className="text-[color:var(--color-aerial-deep)]">
                    Read them top, heart, base.
                  </em>
                </h2>
              </div>
              <p className="max-w-[28ch] text-[0.86rem] leading-[1.65] text-[color:var(--color-charcoal-soft)] md:text-right">
                100 ml a bottle, 70–90% concentrate.
                <br />
                <span className="text-[0.6rem] uppercase tracking-[0.32em]">
                  60–140 days a fill →
                </span>
              </p>
            </div>
          </FadeUp>

          {/*
            Scent grid — uniform 3-up plates (eight oils). Symmetric
            and orderly, but kept editorial: hairline rules, swatch chips, and the
            top/heart/base note pyramid under each bottle. No card-shadow Shopify look.
          */}
          <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 md:gap-x-10 md:gap-y-16">
            {oils.map((o, i) => {
              const index = String(i + 1).padStart(2, "0");

              return (
                <FadeUp key={o.slug} delay={(i % 3) * 0.06}>
                  <Link
                    href={`/shop/${o.slug}`}
                    className="group flex h-full flex-col"
                  >
                    {/* Plate tile — every oil rendered identically for symmetry */}
                    <div className="relative aspect-[4/5] overflow-hidden border border-[color:var(--color-rule)] bg-[color:var(--color-stardust)]">
                      <Image
                        src={o.image}
                        alt={`${o.name} — bottle study`}
                        fill
                        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                        className="object-cover transition-transform duration-[1600ms] ease-[var(--ease-quint)] group-hover:scale-[1.04]"
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(58,53,50,0.20) 0%, rgba(58,53,50,0) 38%, rgba(58,53,50,0) 100%)",
                        }}
                      />
                      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4 text-[0.54rem] uppercase tracking-[0.3em] text-[color:var(--color-stardust)] md:p-5">
                        <span className="tabular-nums">№{index}</span>
                        {o.tier === "hotel-credential" && (
                          <span className="border border-current px-1.5 py-0.5 text-[0.46rem]">
                            Hotel Credential
                          </span>
                        )}
                      </div>
                      {/* Swatch chip, bottom-left, ties photo to the oil's colour */}
                      <span
                        className="absolute bottom-4 left-4 h-5 w-5 rounded-full ring-1 ring-[color:var(--color-stardust)]/60 md:bottom-5 md:left-5"
                        style={{ backgroundColor: o.swatch }}
                        aria-hidden="true"
                      />
                    </div>

                    <div className="mt-5 flex flex-1 flex-col">
                      <div className="flex items-baseline justify-between gap-3 border-b border-[color:var(--color-rule)] pb-3">
                        <h3
                          className="transition-colors duration-300 group-hover:text-[color:var(--color-clay)]"
                          style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "var(--text-2xl)",
                            lineHeight: 1.04,
                            letterSpacing: "-0.018em",
                            fontWeight: 400,
                          }}
                        >
                          {o.name}
                        </h3>
                        <span className="tabular-nums text-[0.9rem] text-[color:var(--color-charcoal)]">
                          {formatINR(o.priceINR)}
                        </span>
                      </div>

                      {/* Three note lines — the editorial pyramid, kept calm */}
                      <dl className="mt-3 grid gap-1 text-[0.78rem] leading-[1.45]">
                        {(
                          [
                            ["Top", o.notes.top],
                            ["Heart", o.notes.heart],
                            ["Base", o.notes.base],
                          ] as const
                        ).map(([label, arr]) => (
                          <div
                            key={label}
                            className="grid grid-cols-[2.75rem_1fr] gap-3"
                          >
                            <dt className="pt-px text-[0.52rem] uppercase tracking-[0.22em] text-[color:var(--color-charcoal-soft)]">
                              {label}
                            </dt>
                            <dd className="text-[color:var(--color-charcoal)]">
                              {arr.join(", ")}
                            </dd>
                          </div>
                        ))}
                      </dl>

                      <span className="mt-4 inline-flex items-center gap-2 text-[0.54rem] uppercase tracking-[0.28em] text-[color:var(--color-charcoal-soft)] transition-transform duration-500 group-hover:translate-x-1">
                        100 ml · View →
                      </span>
                    </div>
                  </Link>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================
          §  CLOSING — Pair & Save
          ==================================================== */}
      <section className="py-[var(--spacing-section)]">
        <div className="mx-auto max-w-[var(--container-content)] px-6 text-center md:px-10">
          <FadeUp>
            <p className="text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
              § Pair & Subscribe
            </p>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h2
              className="mx-auto mt-7 max-w-[22ch] text-balance"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "var(--text-3xl)",
                lineHeight: 1.1,
                letterSpacing: "-0.016em",
                fontWeight: 400,
              }}
            >
              One diffuser, one oil.{" "}
              <em className="text-[color:var(--color-aerial-deep)]">
                Subscribe and save 15% on refills.
              </em>
            </h2>
          </FadeUp>
          <FadeUp delay={0.16}>
            <p className="mx-auto mt-7 max-w-[52ch] text-[var(--text-base)] leading-[1.85] text-[color:var(--color-charcoal-soft)]">
              Start a diffuser with the oil you want and set a refill cadence
              you can pause or change anytime.
            </p>
          </FadeUp>
          <FadeUp delay={0.24}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              <Link
                href="/shop/tabletop-a326"
                className="group inline-flex items-center gap-3 border-b border-[color:var(--color-charcoal)] pb-1.5 text-[0.72rem] uppercase tracking-[0.32em] transition-colors duration-500 hover:text-[color:var(--color-clay)] hover:border-[color:var(--color-clay)]"
              >
                Configure the diffuser
                <span className="transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <Link
                href="/contact"
                className="text-[0.72rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)] hover:text-[color:var(--color-charcoal)]"
              >
                Speak to us
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </article>
  );
}
