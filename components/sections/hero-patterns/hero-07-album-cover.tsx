import Image from "next/image";
import Link from "next/link";

/**
 * Hero 07 — Album Cover / Folio.
 * One centered square image, max 520px wide. Type wraps around the sleeve:
 *   "Air,"      top-left
 *   "Volume 01" top-right
 *   "2026"      bottom-left
 *   "Elevated." bottom-right
 * Calm white field, record-sleeve composition, no harsh crops.
 */
export function HeroAlbumCover() {
  const headlineStyle: React.CSSProperties = {
    fontFamily: "var(--font-serif)",
    fontSize: "var(--text-5xl)",
    lineHeight: 0.95,
    letterSpacing: "-0.024em",
    fontWeight: 400,
  };

  return (
    <section className="relative w-full bg-[color:var(--color-white)] text-[color:var(--color-charcoal)]">
      <div className="mx-auto flex w-full max-w-[var(--container-full)] flex-col px-6 pt-10 md:px-12 md:pt-14">
        {/* Top meta strip */}
        <div className="flex items-center gap-5 text-[0.6rem] uppercase tracking-[0.4em] text-[color:var(--color-charcoal-soft)]">
          <span>Quint Home</span>
          <span className="h-px flex-1 bg-[color:var(--color-rule)]" />
          <span>The Mumbai Edition · Est. 2026</span>
        </div>

        {/* The sleeve composition */}
        <div className="relative mx-auto my-16 w-full max-w-[1100px] md:my-24">
          {/* Top row: "Air," left  /  Volume 01 right */}
          <div className="flex items-start justify-between gap-6">
            <h1
              className="animate-fade-up text-[color:var(--color-charcoal)]"
              style={{ ...headlineStyle, animationDelay: "0.3s" }}
            >
              Air,
            </h1>
            <span
              className="mt-3 text-right text-[0.6rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)] animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              Volume 01
              <span className="mt-1 block text-[color:var(--color-clay)]">·</span>
              Side A
            </span>
          </div>

          {/* Centered square sleeve */}
          <figure
            className="relative mx-auto my-8 w-full max-w-[520px] md:my-10 animate-fade-up"
            style={{ animationDelay: "0.45s" }}
          >
            <div className="relative aspect-square overflow-hidden bg-[color:var(--color-stardust-soft)] shadow-[0_30px_60px_-30px_rgba(41,51,41,0.25)]">
              <Image
                src="/images/vibe/vibe-14.webp"
                alt="Quint Home — Volume 01, the sleeve"
                fill
                priority
                sizes="(min-width: 768px) 520px, 90vw"
                className="object-cover animate-hero-zoom"
                style={{ objectPosition: "center 45%" }}
              />
              {/* Catalog number on the sleeve */}
              <span className="absolute left-4 top-4 text-[0.55rem] uppercase tracking-[0.4em] text-white/80">
                QH · 001
              </span>
              <span className="absolute bottom-4 right-4 text-[0.55rem] uppercase tracking-[0.4em] text-white/80">
                33⅓ · The Mood
              </span>
            </div>
            <figcaption className="mt-4 text-center text-[0.58rem] uppercase tracking-[0.4em] text-[color:var(--color-charcoal-soft)]">
              A Sleeve in Five Notes · Pressed in Mumbai
            </figcaption>
          </figure>

          {/* Bottom row: 2026 left  /  Elevated. right */}
          <div className="flex items-end justify-between gap-6">
            <span
              className="mb-3 text-[0.6rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)] animate-fade-in"
              style={{ animationDelay: "0.5s" }}
            >
              MMXXVI
              <span className="mt-1 block text-[color:var(--color-clay)]">·</span>
              2026
            </span>
            <h2
              className="animate-fade-up text-right italic text-[color:var(--color-charcoal)]"
              style={{
                ...headlineStyle,
                fontStyle: "italic",
                animationDelay: "0.6s",
              }}
            >
              Elevated.
            </h2>
          </div>
        </div>

        {/* Tracklist-style copy + CTAs */}
        <div className="mx-auto mb-16 flex w-full max-w-[640px] flex-col items-center gap-7 text-center md:mb-24">
          <p
            className="text-[var(--text-lg)] leading-[1.55] text-[color:var(--color-charcoal-soft)] animate-fade-up"
            style={{ animationDelay: "0.75s" }}
          >
            Five seconds in a hotel corridor and the room changes character.
            We make that room your home.
          </p>

          <div
            className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 animate-fade-up"
            style={{ animationDelay: "0.9s" }}
          >
            <Link
              href="/shop?category=diffusers"
              className="group inline-flex items-center gap-3 border-b border-[color:var(--color-charcoal)] pb-1.5 text-[0.72rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal)] transition-colors duration-500 hover:border-[color:var(--color-clay)] hover:text-[color:var(--color-clay)]"
            >
              Discover the diffuser
              <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
            </Link>
            <Link
              href="/about"
              className="text-[0.72rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)] transition-colors duration-500 hover:text-[color:var(--color-charcoal)]"
            >
              The founder&rsquo;s letter
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
