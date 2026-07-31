import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { diffusers, getDiffuser } from "@/lib/data/diffusers";
import { oils, getOil } from "@/lib/data/oils";
import { formatINR } from "@/lib/utils";
import { FadeUp } from "@/components/motion/fade-up";
import { DiffuserHero } from "@/components/product/diffuser-hero";
import { DiffuserCompare } from "@/components/sections/diffuser-compare";
import { OilHero } from "@/components/product/oil-hero";
import { getCommerceByName, getCommerceMap } from "@/lib/shopify/commerce";
import { ScentFinder } from "@/components/sections/scent-finder";
import type { FragranceOil } from "@/lib/types";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return [
    ...diffusers.map((d) => ({ slug: d.slug })),
    ...oils.map((o) => ({ slug: o.slug })),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getDiffuser(slug) ?? getOil(slug);
  if (!product) return { title: "Not found" };
  const kind = product.category === "oil" ? "Fragrance Oil" : "Diffuser";
  const description = `${product.tagline} ${product.name} — a Quint Home ${kind.toLowerCase()}, hotel-grade home fragrance from Mumbai.`;
  const ogTitle = `${product.name} — Quint Home ${kind}`;
  return {
    title: product.name,
    description,
    alternates: { canonical: `/shop/${slug}` },
    openGraph: {
      title: ogTitle,
      description,
      url: `/shop/${slug}`,
      type: "website",
      images: [{ url: product.image, alt: product.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [product.image],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const product = getDiffuser(slug);

  if (!product) {
    const oil = getOil(slug);
    if (!oil) notFound();
    return <OilProductPage oil={oil} />;
  }

  // Companion scents – surface the two hotel-credential oils first.
  const relatedOils = oils
    .slice()
    .sort((a, b) => (a.tier === "hotel-credential" ? -1 : 1))
    .slice(0, 4);

  const commerce = await getCommerceByName(product.name);
  const commerceMap = await getCommerceMap();

  return (
    <article id="top" className="bg-[color:var(--color-white)]">
      {/* §  PRODUCT  –  images left; overview, key features & technical specs on the right */}
      <DiffuserHero product={product} commerce={commerce} commerceMap={commerceMap} />

      {/* §  COMPARE  –  this device against the rest of the range */}
      <DiffuserCompare highlightModel={product.model} />


      {/* ====================================================
          §  PAIRS WITH  –  companion oils
          ==================================================== */}
      <section className="py-[var(--spacing-section)]">
        <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
          <FadeUp>
            <div className="mb-12 flex flex-wrap items-end justify-between gap-6 border-b border-[color:var(--color-rule)] pb-6">
              <h2
                className="text-balance"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "var(--text-3xl)",
                  lineHeight: 1.06,
                  letterSpacing: "-0.018em",
                  fontWeight: 400,
                }}
              >
                Pairs with{" "}
                <em className="text-[color:var(--color-aerial-deep)]">
                  the oils.
                </em>
              </h2>
              <Link
                href="/shop?category=oils"
                className="text-[0.72rem] uppercase tracking-[0.32em] underline-offset-4 hover:text-[color:var(--color-clay)] hover:underline"
              >
                All scents →
              </Link>
            </div>
          </FadeUp>

          <div className="grid gap-px overflow-hidden bg-[color:var(--color-rule)] sm:grid-cols-2 lg:grid-cols-4">
            {relatedOils.map((o, i) => (
              <FadeUp key={o.slug} delay={i * 0.05} className="contents">
                <Link
                  href={`/shop/${o.slug}`}
                  className="group relative flex aspect-[4/5] flex-col justify-between overflow-hidden p-6 text-[color:var(--color-stardust)]"
                >
                  <Image
                    src={o.image}
                    alt={`${o.name} – bottle study`}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="absolute inset-0 object-cover transition-transform duration-[1800ms] ease-[var(--ease-quint)] group-hover:scale-[1.04]"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(58,53,50,0.2) 0%, rgba(58,53,50,0.0) 38%, rgba(58,53,50,0.72) 100%)",
                    }}
                  />
                  <div className="relative flex items-start justify-end text-[0.58rem] uppercase tracking-[0.32em] opacity-90">
                    {o.tier === "hotel-credential" && (
                      <span className="rounded-full border border-current px-2 py-0.5 text-[0.5rem]">
                        Hotel Credential
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <h3
                      className="text-balance transition-transform duration-700 ease-[var(--ease-quint)] group-hover:-translate-y-1"
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "var(--text-2xl)",
                        lineHeight: 1.04,
                        letterSpacing: "-0.018em",
                        color: "var(--color-stardust)",
                      }}
                    >
                      {o.name}
                    </h3>
                    <div className="mt-3 flex items-end justify-between text-[0.66rem] opacity-90">
                      <span className="uppercase tracking-[0.18em] text-[0.56rem]">
                        {o.notes.heart[0]}
                      </span>
                      <span className="tabular-nums">{formatINR(o.priceINR)}</span>
                    </div>
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

    </article>
  );
}

// ============================================================
//  Oil PDP – hero buy box + editorial sections
//  NOTE: feature copy below is placeholder ("random for now") – to be
//  replaced with final per-oil detail once supplied.
// ============================================================
async function OilProductPage({ oil }: { oil: FragranceOil }) {
  // Diffusers this oil pairs into – the buy box bundles them; this reinforces it.
  const pairDiffusers = diffusers.slice(0, 4);

  const commerce = await getCommerceByName(oil.name);
  const commerceMap = await getCommerceMap();

  return (
    <article id="top" className="bg-[color:var(--color-white)]">
      {/* §  PRODUCT – gallery + buy box + bundle */}
      <OilHero oil={oil} commerce={commerce} commerceMap={commerceMap} />

      {/* §  FIND YOUR SCENT */}
      <ScentFinder />


      {/* §  PAIRS WITH – the diffusers (bundle in the buy box) */}
      <section className="py-[var(--spacing-section)]">
        <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
          <FadeUp>
            <div className="mb-12 flex flex-wrap items-end justify-between gap-6 border-b border-[color:var(--color-rule)] pb-6">
              <h2
                className="text-balance"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "var(--text-3xl)",
                  lineHeight: 1.06,
                  letterSpacing: "-0.018em",
                  fontWeight: 400,
                }}
              >
                Goes in{" "}
                <em className="text-[color:var(--color-aerial-deep)]">
                  the diffusers.
                </em>
              </h2>
              <Link
                href="/shop#diffusers"
                className="text-[0.72rem] uppercase tracking-[0.32em] underline-offset-4 hover:text-[color:var(--color-clay)] hover:underline"
              >
                All diffusers →
              </Link>
            </div>
          </FadeUp>

          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {pairDiffusers.map((d, i) => (
              <FadeUp key={d.slug} delay={i * 0.05}>
                <Link href={`/shop/${d.slug}`} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden bg-[color:var(--color-stardust-soft)]">
                    <Image
                      src={d.image}
                      alt={d.name}
                      fill
                      sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
                      className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-quint)] group-hover:scale-[1.05]"
                    />
                  </div>
                  <div className="mt-4 flex items-baseline justify-between gap-2 border-b border-[color:var(--color-rule)] pb-3">
                    <h3
                      className="transition-colors duration-300 group-hover:text-[color:var(--color-clay)]"
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "var(--text-xl)",
                        lineHeight: 1.06,
                        letterSpacing: "-0.014em",
                        fontWeight: 400,
                      }}
                    >
                      {d.name}
                    </h3>
                    <span className="shrink-0 tabular-nums text-[0.8rem]">
                      {formatINR(d.priceINR)}
                    </span>
                  </div>
                  <p className="mt-2 text-[0.74rem] leading-[1.4] text-[color:var(--color-charcoal-soft)]">
                    {d.coverageLabel}
                  </p>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
