import Image from "next/image";
import Link from "next/link";
import { FadeUp, RevealLines } from "@/components/motion/fade-up";

/**
 * Hero 09 — Asymmetric Collage.
 *
 * Designer-studio composition: three images at native aspect ratios laid out
 * on an irregular 12-column grid — a wide landscape "plate", a tall portrait
 * "spine", and a small square "footnote". Headline thins across the top in a
 * single editorial row; an italic running caption sits below the masthead rule.
 * Nothing is cropped harshly; whitespace carries the rhythm.
 */
export function HeroAsymmetricCollage() {
  return (
    <section className="relative w-full bg-[color:var(--color-white)] pt-10 md:pt-14">
      {/* Masthead — chapter strip */}
      <div className="mx-auto flex max-w-[var(--container-full)] items-center gap-5 px-6 text-[0.62rem] uppercase tracking-[0.36em] text-[color:var(--color-charcoal-soft)] md:px-10">
        <span>Volume 01</span>
        <span className="h-px flex-1 bg-[color:var(--color-rule)]" />
        <span className="hidden md:inline">The Mumbai Edition · Est. 2026</span>
        <span className="hidden h-px w-10 bg-[color:var(--color-rule)] md:inline-block" />
        <span className="hidden md:inline">Plates I — III</span>
      </div>

      {/* Headline as a thin row across the top */}
      <div className="mx-auto mt-10 max-w-[var(--container-full)] px-6 md:mt-14 md:px-10">
        <div className="flex flex-col items-baseline gap-y-3 md:flex-row md:items-end md:justify-between md:gap-x-12">
          <RevealLines
            lines={["Air, Elevated."]}
            delayStart={0.2}
            className="block text-[color:var(--color-charcoal)]"
            lineStyle={{
              fontFamily: "var(--font-serif)",
              fontSize: "var(--text-5xl)",
              lineHeight: 1.0,
              letterSpacing: "-0.022em",
              fontWeight: 400,
            }}
          />
          <p
            className="max-w-[34ch] text-[color:var(--color-charcoal-soft)] md:text-right animate-fade-up"
            style={{
              animationDelay: "0.55s",
              fontFamily: "var(--font-serif)",
              fontSize: "var(--text-lg)",
              fontStyle: "italic",
              lineHeight: 1.5,
              fontWeight: 400,
            }}
          >
            A study in three plates &mdash; the corridor, the doorway,
            the room you call yours.
          </p>
        </div>
        <div className="mt-7 h-px w-full bg-[color:var(--color-rule)]" />
      </div>

      {/* The irregular collage — 12-col grid, native aspects, offsets */}
      <div className="mx-auto mt-10 max-w-[var(--container-full)] px-6 pb-12 md:mt-14 md:px-10 md:pb-20">
        <div className="grid grid-cols-12 gap-x-5 gap-y-10 md:gap-x-8 md:gap-y-0">
          {/* PLATE I — wide landscape, top-left, spans 8 cols */}
          <FadeUp delay={0.1} className="col-span-12 md:col-span-8 md:row-start-1">
            <figure className="relative">
              <div className="relative aspect-[3/2] w-full overflow-hidden bg-[color:var(--color-stardust-soft)]">
                <Image
                  src="/images/vibe/vibe-05.webp"
                  alt="Golden-hour botanicals — the corridor that changes the room"
                  fill
                  preload
                  sizes="(min-width: 768px) 64vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 flex items-baseline justify-between text-[0.58rem] uppercase tracking-[0.36em] text-[color:var(--color-charcoal-soft)]">
                <span>Plate I &middot; The Corridor</span>
                <span>3 : 2</span>
              </figcaption>
            </figure>
          </FadeUp>

          {/* PLATE II — tall portrait, right side, offset down */}
          <FadeUp delay={0.3} className="col-span-7 md:col-span-4 md:row-start-1 md:translate-y-16">
            <figure className="relative">
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-[color:var(--color-stardust-soft)]">
                <Image
                  src="/images/vibe/vibe-11.webp"
                  alt="A quiet doorway — the spine of the room"
                  fill
                  sizes="(min-width: 768px) 32vw, 60vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 flex items-baseline justify-between text-[0.58rem] uppercase tracking-[0.36em] text-[color:var(--color-charcoal-soft)]">
                <span>Plate II &middot; Doorway</span>
                <span>3 : 4</span>
              </figcaption>
            </figure>
          </FadeUp>

          {/* PLATE III — square, lower-left, offset down + nudged right */}
          <FadeUp
            delay={0.5}
            className="col-span-7 col-start-1 md:col-span-3 md:col-start-3 md:row-start-2 md:-mt-8"
          >
            <figure className="relative">
              <div className="relative aspect-square w-full overflow-hidden bg-[color:var(--color-stardust-soft)]">
                <Image
                  src="/images/vibe/vibe-18.webp"
                  alt="A texture at rest — the footnote"
                  fill
                  sizes="(min-width: 768px) 24vw, 60vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 flex items-baseline justify-between text-[0.58rem] uppercase tracking-[0.36em] text-[color:var(--color-charcoal-soft)]">
                <span>Plate III &middot; Footnote</span>
                <span>1 : 1</span>
              </figcaption>
            </figure>
          </FadeUp>

          {/* Brand statement — placed in the negative space under Plate III */}
          <FadeUp
            delay={0.7}
            className="col-span-12 md:col-span-5 md:col-start-7 md:row-start-2 md:mt-12"
          >
            <div className="md:pl-2">
              <p
                className="max-w-[40ch] text-[color:var(--color-charcoal)]"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "var(--text-2xl)",
                  lineHeight: 1.35,
                  fontWeight: 400,
                  letterSpacing: "-0.005em",
                }}
              >
                Five seconds in a hotel corridor and the room changes
                character. We make that room your home.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-3">
                <Link
                  href="/shop?category=diffusers"
                  className="group inline-flex items-center gap-3 border-b border-[color:var(--color-charcoal)] pb-1.5 text-[0.72rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal)] transition-colors duration-500 hover:text-[color:var(--color-clay)] hover:border-[color:var(--color-clay)]"
                >
                  Discover the diffuser
                  <span className="transition-transform duration-500 group-hover:translate-x-1">
                    &rarr;
                  </span>
                </Link>
                <Link
                  href="/about"
                  className="text-[0.72rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)] transition-colors duration-500 hover:text-[color:var(--color-charcoal)]"
                >
                  The founder&rsquo;s letter
                </Link>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* Bottom hairline strip */}
      <div className="mx-auto max-w-[var(--container-full)] border-t border-[color:var(--color-rule)] px-6 md:px-10">
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-5 text-[0.6rem] uppercase tracking-[0.36em] text-[color:var(--color-charcoal-soft)]">
          <span>Mumbai &middot; India</span>
          <span className="hidden md:inline">Three plates, one room</span>
          <span className="hidden md:inline">IFRA-Compliant &middot; 70&ndash;90%</span>
          <span>Pattern 09 &middot; Collage</span>
        </div>
      </div>
    </section>
  );
}
