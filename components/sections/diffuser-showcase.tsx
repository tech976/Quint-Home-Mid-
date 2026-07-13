import Link from "next/link";
import Image from "next/image";
import { diffusers } from "@/lib/data/diffusers";
import { formatINR } from "@/lib/utils";
import { FadeUp } from "@/components/motion/fade-up";
import { HCarousel } from "@/components/ui/h-carousel";
import { Monogram } from "@/components/brand/logo";
import { getCommerceMap, shopifyHandle } from "@/lib/shopify/commerce";

/**
 * Diffuser Showcase – features the full diffuser range in editorial cards.
 * Replaces the old generic "Diffusers vs Oils" CategoryDuo with something that
 * actually tells the buyer what they are choosing between.
 */
export async function DiffuserShowcase() {
  const commerce = await getCommerceMap();
  return (
    <section className="bg-[color:var(--color-white)] pt-[var(--spacing-section)] pb-[var(--spacing-section-sm)]">
      <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
        {/* Section header */}
        <FadeUp>
          <div className="mb-14 flex flex-col gap-6 border-b border-[color:var(--color-rule)] pb-6 md:mb-20 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[0.72rem] md:text-[0.95rem] uppercase tracking-[0.16em] md:tracking-[0.22em] text-[color:var(--color-charcoal-soft)]">
                The Diffusers
              </p>
              <h2
                className="mt-5 max-w-[20ch] text-balance"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "var(--text-4xl)",
                  lineHeight: 1.04,
                  letterSpacing: "-0.02em",
                  fontWeight: 400,
                }}
              >
                There&rsquo;s one{" "}
                <em className="text-[color:var(--color-aerial-deep)]">
                  for every room.
                </em>
              </h2>
            </div>
            <p className="max-w-[32ch] text-[0.92rem] leading-[1.65] text-[color:var(--color-charcoal-soft)] md:text-right">
              Five sizes, from a little plug-in to a full column. Pick what
              your room needs.
            </p>
          </div>
        </FadeUp>

        {/* Product cards – single-line horizontal carousel */}
        <FadeUp>
          <HCarousel ariaLabel="Diffusers" arrowTop="top-[34%]">
            {diffusers.map((d, i) => (
              <Link
                key={d.slug}
                href={`/shop/${d.slug}`}
                className="group block w-[84%] shrink-0 snap-start sm:w-[46%] lg:w-[calc((100%_-_3.5rem)/3)]"
              >
                <div className="relative aspect-[8/9] overflow-hidden bg-[color:var(--color-stardust-soft)]">
                  <Image
                    src={d.image}
                    alt={d.name}
                    fill
                    sizes="(min-width: 768px) 30vw, 100vw"
                    className="object-cover transition-transform duration-[1600ms] ease-[var(--ease-quint)] group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5 text-[0.6rem] uppercase tracking-[0.32em] text-[color:var(--color-stardust)] md:p-6">
                    <span className="tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <Monogram className="h-6 w-6 text-[color:var(--color-stardust)]/70" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-[0.6rem] uppercase tracking-[0.32em] text-[color:var(--color-stardust)] md:p-6">
                    <span>{d.coverageLabel}</span>
                    <span className="transition-transform duration-500 group-hover:-translate-y-0.5">
                      Explore →
                    </span>
                  </div>
                </div>

                <div className="mt-7 grid gap-3">
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
                      {formatINR(commerce[shopifyHandle(d.name)]?.minPrice ?? d.priceINR)}
                    </span>
                  </div>
                  <p className="max-w-[36ch] text-[0.92rem] leading-[1.65] text-[color:var(--color-charcoal-soft)]">
                    {d.tagline}
                  </p>
                  <p className="text-[0.6rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)]">
                    {d.finish}
                  </p>
                </div>
              </Link>
            ))}
          </HCarousel>
        </FadeUp>
      </div>
    </section>
  );
}
