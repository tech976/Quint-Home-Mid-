import Link from "next/link";
import { FadeUp } from "@/components/motion/fade-up";
import { Monogram } from "@/components/brand/logo";

/**
 * ============================================================================
 * BELOW-HERO SECTION  ·  isolated / swappable
 * ----------------------------------------------------------------------------
 * This is the first section under the hero. It is intentionally kept as a
 * standalone component so it can be redesigned or replaced later without
 * touching the rest of the home page — just swap <SmartHome /> in app/page.tsx.
 *
 * Palette: Stardust Veil variant (warm beige surface + soft veil bloom,
 * charcoal text). Colours only live here; no shared tokens were changed.
 * ============================================================================
 */
export function SmartHome() {
  return (
    <section className="relative overflow-hidden bg-[color:var(--color-stardust)] py-[var(--spacing-section)] text-[color:var(--color-charcoal)]">
      {/* Stardust Veil – soft light bloom from the top edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(245,239,230,0.9) 0%, rgba(238,228,216,0) 60%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[var(--container-content)] px-6 text-center md:px-10">
        <FadeUp>
          <div className="mx-auto flex items-center justify-center gap-4 text-[0.72rem] md:text-[0.95rem] uppercase tracking-[0.16em] md:tracking-[0.22em] text-[color:var(--color-charcoal-soft)]/70">
            <span className="h-px w-12 bg-[color:var(--color-charcoal-soft)]/25" />
            <span className="inline-flex items-center gap-2">
              <Monogram className="h-[0.9em] w-[0.9em]" />
              The Range
            </span>
            <span className="h-px w-12 bg-[color:var(--color-charcoal-soft)]/25" />
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <h2
            className="mx-auto mt-12 max-w-[34ch]"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "var(--text-3xl)",
              lineHeight: 1.16,
              letterSpacing: "-0.018em",
              fontWeight: 400,
              color: "var(--color-charcoal)",
            }}
          >
            Objects that elevate your home.
            <br />
            <em className="not-italic text-[color:var(--color-aerial-deep)]">
              Fragrances that stay
              <br />
              with you.
            </em>
          </h2>
        </FadeUp>

        <FadeUp delay={0.25}>
          <div className="mt-16 border-t border-[color:var(--color-charcoal)]/10 pt-12">
            <div className="mx-auto flex flex-col items-center gap-2.5 text-[0.86rem] uppercase tracking-[0.2em] text-[color:var(--color-charcoal-soft)] sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-6 sm:gap-y-3">
              <Link
                href="/shop#diffusers"
                className="transition-colors duration-300 hover:text-[color:var(--color-charcoal)]"
              >
                Waterless Diffusers
              </Link>
              <span className="hidden text-[color:var(--color-charcoal-soft)]/35 sm:inline">·</span>
              <Link
                href="/shop"
                className="transition-colors duration-300 hover:text-[color:var(--color-charcoal)]"
              >
                Reed Diffusers &amp; Candles
              </Link>
              <span className="hidden text-[color:var(--color-charcoal-soft)]/35 sm:inline">·</span>
              <Link
                href="/shop#oils"
                className="transition-colors duration-300 hover:text-[color:var(--color-charcoal)]"
              >
                Fragrance Oils
              </Link>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
