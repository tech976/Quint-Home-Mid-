import Image from "next/image";
import Link from "next/link";
import { RevealLines } from "@/components/motion/fade-up";

/**
 * Pattern 01 — Editorial Split.
 * Type left, single square image right, vertically centered.
 * Hairline metadata strip below. Cereal magazine register.
 */
export function HeroEditorialSplit() {
  return (
    <section className="relative w-full bg-[color:var(--color-white)] pt-10 md:pt-14">
      <div
        className="mx-auto flex max-w-[var(--container-full)] items-center gap-5 px-6 text-[0.62rem] uppercase tracking-[0.36em] text-[color:var(--color-charcoal-soft)] md:px-10 animate-fade-in"
        style={{ animationDelay: "0.2s" }}
      >
        <span>Volume 01</span>
        <span className="h-px flex-1 bg-[color:var(--color-rule)]" />
        <span className="hidden md:inline">The Mumbai Edition · Est. 2026</span>
      </div>

      <div className="mx-auto mt-10 grid max-w-[var(--container-full)] grid-cols-1 items-center gap-12 px-6 pb-14 md:mt-14 md:grid-cols-12 md:gap-14 md:px-10 md:pb-20">
        <div className="md:col-span-7">
          <RevealLines
            lines={["Air,", "Elevated."]}
            delayStart={0.4}
            className="block text-[color:var(--color-charcoal)]"
            lineStyle={{
              fontFamily: "var(--font-serif)",
              fontSize: "var(--text-display)",
              lineHeight: 0.96,
              letterSpacing: "-0.024em",
              fontWeight: 400,
            }}
          />

          <p
            className="mt-8 max-w-[44ch] text-[var(--text-lg)] leading-[1.55] text-[color:var(--color-charcoal-soft)] animate-fade-up"
            style={{ animationDelay: "1.0s" }}
          >
            Five seconds in a hotel corridor and the room changes character.
            We make that room your home.
          </p>

          <div
            className="mt-9 flex flex-wrap items-center gap-x-10 gap-y-3 animate-fade-up"
            style={{ animationDelay: "1.2s" }}
          >
            <Link
              href="/shop?category=diffusers"
              className="group inline-flex items-center gap-3 border-b border-[color:var(--color-charcoal)] pb-1.5 text-[0.72rem] uppercase tracking-[0.32em] transition-colors duration-500 hover:text-[color:var(--color-clay)] hover:border-[color:var(--color-clay)]"
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

        <div
          className="relative md:col-span-5 animate-fade-up"
          style={{ animationDelay: "0.6s" }}
        >
          <figure className="relative mx-auto w-full max-w-[440px]">
            <div className="relative aspect-square overflow-hidden bg-[color:var(--color-stardust-soft)]">
              <Image
                src="/images/vibe/vibe-05.webp"
                alt="Golden hour wildflowers"
                fill
                priority
                sizes="(min-width: 768px) 440px, 100vw"
                className="object-cover animate-hero-zoom"
                style={{ objectPosition: "center 35%" }}
              />
            </div>
            <figcaption className="mt-3 flex items-center justify-between text-[0.58rem] uppercase tracking-[0.36em] text-[color:var(--color-charcoal-soft)]">
              <span>Plate 01 · The Mood</span>
              <span>2026</span>
            </figcaption>
          </figure>
        </div>
      </div>

      <div className="mx-auto max-w-[var(--container-full)] border-t border-[color:var(--color-rule)] px-6 md:px-10">
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-5 text-[0.6rem] uppercase tracking-[0.36em] text-[color:var(--color-charcoal-soft)]">
          <span>Mumbai · India</span>
          <span className="hidden md:inline">Designed in Mumbai</span>
          <span className="hidden md:inline">IFRA-Compliant · 70–90%</span>
          <span className="hidden md:inline">{"<"} 18 dB Operation</span>
          <span>Scroll · Quietly</span>
        </div>
      </div>
    </section>
  );
}
