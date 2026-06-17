import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { diffusers, getDiffuser } from "@/lib/data/diffusers";
import { oils, getOil } from "@/lib/data/oils";
import { formatINR } from "@/lib/utils";
import { FadeUp } from "@/components/motion/fade-up";
import { DiffuserHero } from "@/components/product/diffuser-hero";
import { OilHero } from "@/components/product/oil-hero";
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
  return {
    title: product.name,
    description: product.tagline,
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

  // Companion scents — surface the two hotel-credential oils first.
  const relatedOils = oils
    .slice()
    .sort((a, b) => (a.tier === "hotel-credential" ? -1 : 1))
    .slice(0, 4);

  const descriptionParagraphs = product.description.split("\n\n");

  // How-to-use steps differ for the app models vs the plug-in timer model.
  const steps = product.bluetooth
    ? [
        { no: "01", title: "Fill", body: "Add your chosen oil to the reservoir. No water, no carrier liquid." },
        { no: "02", title: "Pair", body: "Connect once over Bluetooth in the Quint Home companion app." },
        { no: "03", title: "Schedule", body: "Set your times, intensity, and duration from your phone." },
        { no: "04", title: "Leave it", body: "The diffuser runs the schedule on its own, day after day." },
      ]
    : [
        { no: "01", title: "Plug in", body: "Insert the rotatable plug into any wall socket. No assembly." },
        { no: "02", title: "Add oil", body: "Add a few drops of your chosen oil to the glass bottle." },
        { no: "03", title: "Set the timer", body: "The 24-hour cyclic timer handles the on and off cycles." },
        { no: "04", title: "Leave it", body: "Steady fragrance through the day, with no app to manage." },
      ];

  // Lifestyle still for models WITHOUT a video — a distinct indoor interior per
  // product (video models show their video instead and use none of these).
  const LIFESTYLE_BY_SLUG: Record<string, string> = {
    "tabletop-a326": "/images/indoor/indoor-01.webp",
    "tabletop-fabric-a974": "/images/indoor/indoor-02.webp",
  };
  const lifestyleImage =
    LIFESTYLE_BY_SLUG[product.slug] ?? "/images/indoor/indoor-03.webp";

  return (
    <article id="top" className="bg-[color:var(--color-white)]">
      {/* §  PRODUCT  —  gallery + buy box (colour selector for multi-finish models) */}
      <DiffuserHero product={product} />

      {/* ====================================================
          §  OVERVIEW  —  the catalogue description, given room
          ==================================================== */}
      <section className="py-[var(--spacing-section)]">
        <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
          <FadeUp>
            <div className="mb-12 border-b border-[color:var(--color-rule)] pb-6">
              <p className="text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
                Overview
              </p>
            </div>
          </FadeUp>
          <div className="grid gap-12 md:grid-cols-12 md:items-start md:gap-16">
            <FadeUp delay={0.06} className="md:col-span-7">
              <div className="max-w-[62ch] space-y-6">
                {descriptionParagraphs.map((para, i) => (
                  <p
                    key={i}
                    className={
                      i === 0
                        ? "text-[var(--text-xl)] leading-[1.6] text-[color:var(--color-charcoal)]"
                        : "text-[var(--text-base)] leading-[1.85] text-[color:var(--color-charcoal-soft)]"
                    }
                  >
                    {para}
                  </p>
                ))}
              </div>

              {/* Best for — quiet inline line, no Shopify chips */}
              <div className="mt-10 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-[color:var(--color-rule)] pt-6">
                <span className="text-[0.58rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)]">
                  Best for
                </span>
                <span className="text-[0.92rem] text-[color:var(--color-charcoal)]">
                  {product.bestFor.join("  ·  ")}
                </span>
              </div>
            </FadeUp>

            {/* Image — kept at its native 4:5, never cropped, sized down and set to the right */}
            <FadeUp delay={0.12} className="md:col-span-5">
              <figure className="relative mx-auto aspect-[4/5] w-full max-w-[24rem] overflow-hidden bg-[color:var(--color-stardust-soft)] md:mr-0">
                <Image
                  src={product.gallery[2] ?? product.image}
                  alt={`${product.name} — in a room`}
                  fill
                  sizes="(min-width: 768px) 24rem, 100vw"
                  className="object-cover"
                />
              </figure>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ====================================================
          §  IN MOTION (video) — or one calm lifestyle image
          ==================================================== */}
      {product.video ? (
        <section className="bg-[color:var(--color-verdant)] py-[var(--spacing-section)] text-[color:var(--color-stardust)]">
          <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
            <div className="mb-12 grid gap-8 md:grid-cols-12 md:items-end md:gap-16">
              <FadeUp className="md:col-span-7">
                <div className="mb-7 flex items-center gap-4 text-[0.6rem] uppercase tracking-[0.42em] text-[color:var(--color-stardust)]/65">
                  <span className="h-px w-12 bg-[color:var(--color-stardust)]/25" />
                  <span>§ In Motion</span>
                </div>
                <h2
                  className="max-w-[18ch] text-balance text-[color:var(--color-stardust)]"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "var(--text-4xl)",
                    lineHeight: 1.06,
                    letterSpacing: "-0.022em",
                    fontWeight: 400,
                  }}
                >
                  See the {product.name}{" "}
                  <em className="not-italic text-[color:var(--color-aerial-soft)]">
                    in motion.
                  </em>
                </h2>
              </FadeUp>
              <FadeUp delay={0.08} className="md:col-span-5">
                <p
                  className="max-w-[42ch] text-[var(--text-base)] leading-[1.8]"
                  style={{ color: "rgba(238, 228, 216, 0.82)" }}
                >
                  A closer look at how it runs in a room. Waterless cold-air
                  diffusion, near-silent, a decor object you keep on the shelf.
                </p>
              </FadeUp>
            </div>

            {/* Full-width 16:9 video — landscape, shown in full (never cropped) */}
            <FadeUp delay={0.12}>
              <div className="relative aspect-video w-full overflow-hidden bg-black">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 h-full w-full object-contain"
                >
                  <source src={product.video} type="video/mp4" />
                </video>
              </div>
            </FadeUp>
          </div>
        </section>
      ) : (
        <section className="px-6 pb-[var(--spacing-section)] md:px-10">
          <div className="mx-auto max-w-[var(--container-full)]">
            <FadeUp>
              <figure className="relative aspect-[16/9] overflow-hidden bg-[color:var(--color-aerial-soft)] md:aspect-[2.4/1]">
                <Image
                  src={lifestyleImage}
                  alt={`${product.name}, at home`}
                  fill
                  sizes="(min-width: 1600px) 1520px, 100vw"
                  className="object-cover"
                />
                <figcaption className="absolute bottom-5 left-5 text-[0.58rem] uppercase tracking-[0.36em] text-[color:var(--color-stardust)] md:bottom-7 md:left-7">
                  A decor object, kept on the shelf
                </figcaption>
              </figure>
            </FadeUp>
          </div>
        </section>
      )}

      {/* ====================================================
          §  KEY FEATURES  —  given proper space
          ==================================================== */}
      <section className="border-y border-[color:var(--color-rule)] bg-[color:var(--color-stardust-soft)] py-[var(--spacing-section)]">
        <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
          <FadeUp>
            <div className="mb-12 flex flex-wrap items-end justify-between gap-4 border-b border-[color:var(--color-rule)] pb-6">
              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "var(--text-4xl)",
                  lineHeight: 1.04,
                  letterSpacing: "-0.02em",
                  fontWeight: 400,
                }}
              >
                Key{" "}
                <em className="text-[color:var(--color-aerial-deep)]">features.</em>
              </h2>
              <p className="text-[0.62rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)]">
                {product.keyFeatures.length} reasons it&rsquo;s built well
              </p>
            </div>
          </FadeUp>

          {/* Each feature split into a serif lead + plain description, in its own
              bordered cell — scannable and easy to understand. */}
          <FadeUp delay={0.06}>
            <ul className="grid grid-cols-1 border-l border-t border-[color:var(--color-rule)] md:grid-cols-2">
              {product.keyFeatures.map((feature, i) => {
                const dash = feature.indexOf(" — ");
                const lead = dash > -1 ? feature.slice(0, dash) : feature;
                const desc = dash > -1 ? feature.slice(dash + 3) : "";
                return (
                  <li
                    key={i}
                    className="group flex min-w-0 gap-5 border-b border-r border-[color:var(--color-rule)] bg-[color:var(--color-white)] p-7 transition-colors duration-500 hover:bg-[color:var(--color-ivory)] md:p-8"
                  >
                    <span
                      className="shrink-0 tabular-nums text-[color:var(--color-clay)]"
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "var(--text-2xl)",
                        lineHeight: 1,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <p
                        className="text-[color:var(--color-charcoal)]"
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontSize: "var(--text-xl)",
                          lineHeight: 1.2,
                          letterSpacing: "-0.012em",
                        }}
                      >
                        {lead}
                      </p>
                      {desc && (
                        <p className="mt-2.5 text-[0.9rem] leading-[1.6] text-[color:var(--color-charcoal-soft)]">
                          {desc}
                        </p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </FadeUp>
        </div>
      </section>

      {/* ====================================================
          §  HOW IT WORKS  —  waterless + simple steps
          ==================================================== */}
      <section className="py-[var(--spacing-section)]">
        <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
          <FadeUp>
            <div className="mb-14 grid gap-8 border-b border-[color:var(--color-rule)] pb-8 md:grid-cols-12 md:items-end md:gap-16">
              <h2
                className="md:col-span-7"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "var(--text-3xl)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.016em",
                  fontWeight: 400,
                }}
              >
                Waterless oil diffusion.{" "}
                <em className="text-[color:var(--color-aerial-deep)]">
                  Set it once.
                </em>
              </h2>
              <p className="max-w-[44ch] text-[var(--text-base)] leading-[1.75] text-[color:var(--color-charcoal-soft)] md:col-span-5">
                Cold air atomises the oil directly. Nothing is watered down, so
                you get the full 70–90% concentration in the room.
              </p>
            </div>
          </FadeUp>

          <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <FadeUp key={step.no} delay={i * 0.06}>
                <div className="border-t border-[color:var(--color-charcoal)] pt-5">
                  <span className="text-[0.62rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)]">
                    {step.no}
                  </span>
                  <h3
                    className="mt-4"
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "var(--text-2xl)",
                      lineHeight: 1.1,
                      letterSpacing: "-0.012em",
                      fontWeight: 400,
                    }}
                  >
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[0.9rem] leading-[1.65] text-[color:var(--color-charcoal-soft)]">
                    {step.body}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          §  SPECIFICATIONS  —  clean technical card
          ==================================================== */}
      <section className="border-y border-[color:var(--color-rule)] bg-[color:var(--color-stardust-soft)] py-[var(--spacing-section)]">
        <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
          <FadeUp>
            <div className="mb-12 flex flex-wrap items-end justify-between gap-4 border-b border-[color:var(--color-rule)] pb-6">
              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "var(--text-4xl)",
                  lineHeight: 1.04,
                  letterSpacing: "-0.02em",
                  fontWeight: 400,
                }}
              >
                Specifications.
              </h2>
              <p className="text-[0.62rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)]">
                IFRA-compliant oils
              </p>
            </div>
          </FadeUp>

          {/* Spec grid — each value set large in its own bordered cell, so the
              numbers read as the hero. Hairline grid, no shadows. */}
          <FadeUp delay={0.06}>
            <dl className="grid grid-cols-2 border-l border-t border-[color:var(--color-rule)] md:grid-cols-3 lg:grid-cols-4">
              {product.specs.map((spec, i) => (
                <div
                  key={spec.label}
                  className="group flex min-w-0 flex-col border-b border-r border-[color:var(--color-rule)] bg-[color:var(--color-white)] p-6 transition-colors duration-500 hover:bg-[color:var(--color-ivory)] md:p-7"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[0.56rem] tabular-nums text-[color:var(--color-clay)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <dt className="text-[0.56rem] uppercase tracking-[0.28em] text-[color:var(--color-charcoal-soft)]">
                      {spec.label}
                    </dt>
                  </div>
                  <dd
                    className="mt-5 break-words text-[color:var(--color-charcoal)]"
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "var(--text-xl)",
                      lineHeight: 1.2,
                      letterSpacing: "-0.012em",
                    }}
                  >
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>
          </FadeUp>
        </div>
      </section>

      {/* ====================================================
          §  PAIRS WITH  —  companion oils
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
                    alt={`${o.name} — bottle study`}
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

      {/* ====================================================
          §  CLOSING CTA
          ==================================================== */}
      <section className="border-t border-[color:var(--color-rule)] py-[var(--spacing-section)]">
        <div className="mx-auto max-w-[var(--container-content)] px-6 text-center md:px-10">
          <FadeUp>
            <p className="text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
              {product.name} · {formatINR(product.priceINR)}
            </p>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h2
              className="mx-auto mt-6 max-w-[20ch] text-balance"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "var(--text-3xl)",
                lineHeight: 1.1,
                letterSpacing: "-0.018em",
                fontWeight: 400,
              }}
            >
              Choose your scent.{" "}
              <em className="text-[color:var(--color-aerial-deep)]">
                Set the schedule once.
              </em>
            </h2>
          </FadeUp>
          <FadeUp delay={0.16}>
            <Link
              href="#top"
              className="group mt-9 inline-flex items-center gap-3 border-b border-[color:var(--color-charcoal)] pb-1.5 text-[0.72rem] uppercase tracking-[0.32em] transition-colors duration-500 hover:border-[color:var(--color-clay)] hover:text-[color:var(--color-clay)]"
            >
              Add {product.name} to bag
              <span className="transition-transform duration-500 group-hover:-translate-y-1">↑</span>
            </Link>
          </FadeUp>
        </div>
      </section>
    </article>
  );
}

// ============================================================
//  Oil PDP — hero buy box + editorial sections
//  NOTE: feature copy below is placeholder ("random for now") — to be
//  replaced with final per-oil detail once supplied.
// ============================================================
function OilProductPage({ oil }: { oil: FragranceOil }) {
  // Placeholder feature set derived from the oil's data — swap for real copy later.
  const features = [
    "70–90% fragrance concentration — true perfumery strength, never watered down.",
    "IFRA-compliant, blended from responsibly sourced aromatics.",
    `${oil.volumeML} ml glass bottle — 60 to 140 days of scent per fill.`,
    "Engineered for Quint waterless cold-air diffusers — no heat, no water.",
    `A ${oil.mood.toLowerCase()} profile, built around ${oil.origin.toLowerCase()}.`,
    "Throw tuned for rooms up to 100 m² on a Quint diffuser.",
  ];

  // Diffusers this oil pairs into — the buy box bundles them; this reinforces it.
  const pairDiffusers = diffusers.slice(0, 4);

  return (
    <article id="top" className="bg-[color:var(--color-white)]">
      {/* §  PRODUCT — gallery + buy box + bundle */}
      <OilHero oil={oil} />

      {/* §  THE SCENT — mood + origin given room, on the oil's own colour */}
      <section
        className="py-[var(--spacing-section)]"
        style={{ backgroundColor: oil.swatch, color: oil.textColor }}
      >
        <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
          <div className="grid gap-10 md:grid-cols-12 md:items-end md:gap-16">
            <FadeUp className="md:col-span-7">
              <p
                className="text-[0.62rem] uppercase tracking-[0.42em]"
                style={{ opacity: 0.7 }}
              >
                The scent
              </p>
              <h2
                className="mt-6 max-w-[18ch] text-balance"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "var(--text-4xl)",
                  lineHeight: 1.04,
                  letterSpacing: "-0.022em",
                  fontWeight: 400,
                }}
              >
                {oil.mood}.
              </h2>
            </FadeUp>
            <FadeUp delay={0.08} className="md:col-span-5">
              <p className="max-w-[44ch] text-[var(--text-base)] leading-[1.85]" style={{ opacity: 0.88 }}>
                {oil.description}
              </p>
              <p className="mt-6 text-[0.62rem] uppercase tracking-[0.32em]" style={{ opacity: 0.7 }}>
                Origin · {oil.origin}
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* §  KEY FEATURES */}
      <section className="border-b border-[color:var(--color-rule)] bg-[color:var(--color-stardust-soft)] py-[var(--spacing-section)]">
        <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
          <FadeUp>
            <div className="mb-12 flex flex-wrap items-end justify-between gap-4 border-b border-[color:var(--color-rule)] pb-6">
              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "var(--text-4xl)",
                  lineHeight: 1.04,
                  letterSpacing: "-0.02em",
                  fontWeight: 400,
                }}
              >
                Key{" "}
                <em className="text-[color:var(--color-aerial-deep)]">features.</em>
              </h2>
              <p className="text-[0.62rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)]">
                {features.length} reasons it&rsquo;s blended well
              </p>
            </div>
          </FadeUp>

          {/* Each feature split into a serif lead + plain description, in its own
              bordered cell — scannable and easy to understand. */}
          <FadeUp delay={0.06}>
            <ul className="grid grid-cols-1 border-l border-t border-[color:var(--color-rule)] md:grid-cols-2">
              {features.map((feature, i) => {
                const dash = feature.indexOf(" — ");
                const lead = dash > -1 ? feature.slice(0, dash) : feature;
                const desc = dash > -1 ? feature.slice(dash + 3) : "";
                return (
                  <li
                    key={i}
                    className="group flex min-w-0 gap-5 border-b border-r border-[color:var(--color-rule)] bg-[color:var(--color-white)] p-7 transition-colors duration-500 hover:bg-[color:var(--color-ivory)] md:p-8"
                  >
                    <span
                      className="shrink-0 tabular-nums text-[color:var(--color-clay)]"
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "var(--text-2xl)",
                        lineHeight: 1,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <p
                        className="text-[color:var(--color-charcoal)]"
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontSize: "var(--text-xl)",
                          lineHeight: 1.2,
                          letterSpacing: "-0.012em",
                        }}
                      >
                        {lead}
                      </p>
                      {desc && (
                        <p className="mt-2.5 text-[0.9rem] leading-[1.6] text-[color:var(--color-charcoal-soft)]">
                          {desc}
                        </p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </FadeUp>
        </div>
      </section>

      {/* §  PAIRS WITH — the diffusers (bundle in the buy box) */}
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
                  <p className="mt-2 text-[0.74rem] text-[color:var(--color-charcoal-soft)]">
                    {d.coverageLabel}
                  </p>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* §  CLOSING CTA */}
      <section className="border-t border-[color:var(--color-rule)] py-[var(--spacing-section)]">
        <div className="mx-auto max-w-[var(--container-content)] px-6 text-center md:px-10">
          <FadeUp>
            <p className="text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
              {oil.name} · {formatINR(oil.priceINR)} · {oil.volumeML} ml
            </p>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h2
              className="mx-auto mt-6 max-w-[20ch] text-balance"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "var(--text-3xl)",
                lineHeight: 1.1,
                letterSpacing: "-0.018em",
                fontWeight: 400,
              }}
            >
              Add the oil.{" "}
              <em className="text-[color:var(--color-aerial-deep)]">
                Pair a diffuser and save.
              </em>
            </h2>
          </FadeUp>
          <FadeUp delay={0.16}>
            <Link
              href="#top"
              className="group mt-9 inline-flex items-center gap-3 border-b border-[color:var(--color-charcoal)] pb-1.5 text-[0.72rem] uppercase tracking-[0.32em] transition-colors duration-500 hover:border-[color:var(--color-clay)] hover:text-[color:var(--color-clay)]"
            >
              Add {oil.name} to bag
              <span className="transition-transform duration-500 group-hover:-translate-y-1">↑</span>
            </Link>
          </FadeUp>
        </div>
      </section>
    </article>
  );
}
