import Image from "next/image";
import Link from "next/link";
import { RevealLines } from "@/components/motion/fade-up";

/**
 * Hero 08 — Grid Lookbook.
 * A thin editorial masthead row sits above a 2x2 portrait grid (left) and a
 * vertical typographic column (right). Reads like a Vitruvi / Tom Dixon catalogue
 * spread — native portrait aspects, no harsh crops, plenty of paper between.
 */

const PLATES: ReadonlyArray<{
  src: string;
  alt: string;
  caption: string;
  position?: string;
}> = [
  {
    src: "/images/vibe/vibe-03.webp",
    alt: "Plate I — botanical study at dawn",
    caption: "Plate I · The Garden, Pre-Dawn",
    position: "center 40%",
  },
  {
    src: "/images/vibe/vibe-08.webp",
    alt: "Plate II — interior with diffused light",
    caption: "Plate II · A Room, Held Still",
    position: "center 35%",
  },
  {
    src: "/images/vibe/vibe-12.webp",
    alt: "Plate III — texture in golden hour",
    caption: "Plate III · The Hour Before Six",
    position: "center 50%",
  },
  {
    src: "/images/vibe/vibe-17.webp",
    alt: "Plate IV — hands and rain",
    caption: "Plate IV · Mumbai, In the Wet",
    position: "center 45%",
  },
];

export function HeroGridLookbook() {
  return (
    <section className="relative w-full bg-[color:var(--color-white)] text-[color:var(--color-charcoal)]">
      {/* Editorial masthead — thin row */}
      <div className="mx-auto w-full max-w-[var(--container-full)] border-b border-[color:var(--color-rule)] px-6 md:px-10">
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 py-5 text-[0.6rem] uppercase tracking-[0.4em] text-[color:var(--color-charcoal-soft)]">
          <span>
            <span className="text-[color:var(--color-clay)]">Volume 01</span>{" "}
            · The Mumbai Edition
          </span>
          <span className="hidden md:inline">A Lookbook in Four Plates</span>
          <span>Chapter I — The Mood</span>
          <span className="hidden md:inline">Est. 2026 · Issued in Mumbai</span>
        </div>
      </div>

      {/* Headline strip + chapter info, set above the grid */}
      <div className="mx-auto w-full max-w-[var(--container-full)] px-6 pt-12 md:px-10 md:pt-16">
        <div className="grid grid-cols-1 items-end gap-6 md:grid-cols-12">
          <div className="md:col-span-8">
            <RevealLines
              lines={["Air, Elevated."]}
              delayStart={0.25}
              className="block text-[color:var(--color-charcoal)]"
              lineStyle={{
                fontFamily: "var(--font-serif)",
                fontSize: "var(--text-5xl)",
                lineHeight: 0.96,
                letterSpacing: "-0.024em",
                fontWeight: 400,
              }}
            />
          </div>
          <div
            className="text-[0.62rem] uppercase tracking-[0.4em] text-[color:var(--color-charcoal-soft)] md:col-span-4 md:text-right animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            Folio One ·{" "}
            <span className="text-[color:var(--color-charcoal)]">Quint Home</span>
          </div>
        </div>
      </div>

      {/* Main composition: 2x2 grid (left) + vertical type column (right) */}
      <div className="mx-auto mt-10 grid w-full max-w-[var(--container-full)] grid-cols-1 gap-x-12 gap-y-12 px-6 pb-16 md:mt-14 md:grid-cols-12 md:px-10 md:pb-24">
        {/* 2x2 grid of plates — portrait aspect, native crops */}
        <div className="md:col-span-8">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:gap-x-8 md:gap-y-14">
            {PLATES.map((plate, i) => (
              <figure
                key={plate.src}
                className="animate-fade-up"
                style={{ animationDelay: `${0.35 + i * 0.08}s` }}
              >
                <div
                  className="relative w-full overflow-hidden bg-[color:var(--color-stardust-soft)]"
                  style={{ aspectRatio: "4 / 5" }}
                >
                  <Image
                    src={plate.src}
                    alt={plate.alt}
                    fill
                    priority={i < 2}
                    sizes="(min-width: 768px) 28vw, 45vw"
                    className="object-cover"
                    style={{ objectPosition: plate.position ?? "center" }}
                  />
                </div>
                <figcaption className="mt-3 flex items-baseline justify-between gap-3 text-[0.56rem] uppercase tracking-[0.36em] text-[color:var(--color-charcoal-soft)]">
                  <span>{plate.caption}</span>
                  <span className="text-[color:var(--color-clay)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* Vertical typographic column — name, tagline, CTAs */}
        <aside className="md:col-span-4">
          <div className="md:sticky md:top-24 flex flex-col gap-8 border-l border-[color:var(--color-rule)] pl-6 md:gap-10 md:pl-8">
            <span
              className="text-[0.6rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)] animate-fade-in"
              style={{ animationDelay: "0.4s" }}
            >
              The Imprint
            </span>

            <h2
              className="text-[color:var(--color-charcoal)] animate-fade-up"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "var(--text-3xl)",
                lineHeight: 1.0,
                letterSpacing: "-0.02em",
                fontWeight: 400,
                animationDelay: "0.5s",
              }}
            >
              Quint Home
            </h2>

            <p
              className="text-[var(--text-lg)] leading-[1.55] text-[color:var(--color-charcoal-soft)] animate-fade-up"
              style={{
                animationDelay: "0.6s",
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
              }}
            >
              Five seconds in a hotel corridor and the room changes character.
              We make that room your home.
            </p>

            <div className="h-px w-12 bg-[color:var(--color-clay)]" />

            {/* CTAs — stacked, catalogue style */}
            <div
              className="flex flex-col gap-4 animate-fade-up"
              style={{ animationDelay: "0.75s" }}
            >
              <Link
                href="/shop?category=diffusers"
                className="group inline-flex items-center justify-between gap-3 border-b border-[color:var(--color-charcoal)] pb-2 text-[0.72rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal)] transition-colors duration-500 hover:border-[color:var(--color-clay)] hover:text-[color:var(--color-clay)]"
              >
                <span>Discover the diffuser</span>
                <span className="transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <Link
                href="/about"
                className="group inline-flex items-center justify-between gap-3 border-b border-[color:var(--color-rule)] pb-2 text-[0.72rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)] transition-colors duration-500 hover:border-[color:var(--color-charcoal)] hover:text-[color:var(--color-charcoal)]"
              >
                <span>The founder&rsquo;s letter</span>
                <span className="transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>

            {/* Colophon */}
            <dl className="mt-2 grid grid-cols-2 gap-y-3 text-[0.55rem] uppercase tracking-[0.36em] text-[color:var(--color-charcoal-soft)]">
              <dt>Issue</dt>
              <dd className="text-right text-[color:var(--color-charcoal)]">
                No. 01
              </dd>
              <dt>Edition</dt>
              <dd className="text-right text-[color:var(--color-charcoal)]">
                Mumbai
              </dd>
              <dt>Pressed</dt>
              <dd className="text-right text-[color:var(--color-charcoal)]">
                MMXXVI
              </dd>
            </dl>
          </div>
        </aside>
      </div>
    </section>
  );
}
