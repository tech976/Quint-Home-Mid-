import Image from "next/image";
import Link from "next/link";
import { FadeUp } from "@/components/motion/fade-up";
import { Logo } from "@/components/brand/logo";

/**
 * Hero 10 — Newspaper Masthead.
 *
 * Editorial broadsheet: wordmark masthead with date / edition / volume rules,
 * a large serif headline beneath, then three columns of body copy (CSS
 * multi-column) with a small portrait image inset that the text wraps around
 * via `shape-outside`. Closes with a hand-set by-line and a product mention.
 * All Literata; weight 400; italic emphasis where the cadence calls for it.
 */
export function HeroNewspaper() {
  return (
    <section className="relative w-full bg-[color:var(--color-white)] pt-8 md:pt-10">
      <div className="mx-auto max-w-[var(--container-content)] px-6 md:px-10">
        {/* Masthead row — date, wordmark, edition */}
        <div className="grid grid-cols-3 items-center gap-4 border-b border-[color:var(--color-charcoal)] pb-4 text-[0.6rem] uppercase tracking-[0.36em] text-[color:var(--color-charcoal-soft)]">
          <div className="flex flex-col gap-1">
            <span>Thursday</span>
            <span>28 May, 2026</span>
          </div>
          <div className="flex justify-center text-[color:var(--color-charcoal)]">
            <Logo className="h-7 md:h-9" />
            <span className="sr-only">Quint Home</span>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span>Volume 01 &middot; No. 01</span>
            <span>The Mumbai Edition</span>
          </div>
        </div>

        {/* Second hairline below masthead — broadsheet double-rule */}
        <div className="mt-1 h-px w-full bg-[color:var(--color-rule)]" />

        {/* Section eyebrow */}
        <div className="mt-6 flex items-center justify-between text-[0.6rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
          <span>The Front Page</span>
          <span className="hidden md:inline">A letter, in three columns</span>
          <span>Price &middot; Complimentary</span>
        </div>

        {/* Headline */}
        <FadeUp delay={0.1}>
          <h1
            className="mt-6 text-[color:var(--color-charcoal)]"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "var(--text-display)",
              lineHeight: 0.98,
              letterSpacing: "-0.022em",
              fontWeight: 400,
            }}
          >
            Air, Elevated.
          </h1>
        </FadeUp>

        {/* Deck — italic standfirst */}
        <FadeUp delay={0.25}>
          <p
            className="mt-5 max-w-[60ch] text-[color:var(--color-charcoal-soft)]"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "var(--text-xl)",
              lineHeight: 1.4,
              fontStyle: "italic",
              fontWeight: 400,
            }}
          >
            Five seconds in a hotel corridor and the room changes character.
            A note from the founder, on why we are making that room yours
            &mdash; quietly, and from Mumbai.
          </p>
        </FadeUp>

        {/* By-line above the columns */}
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-[color:var(--color-rule)] py-3 text-[0.6rem] uppercase tracking-[0.36em] text-[color:var(--color-charcoal-soft)]">
          <span>
            By <span className="text-[color:var(--color-charcoal)]">The Founder</span>
          </span>
          <span className="h-3 w-px bg-[color:var(--color-rule)]" />
          <span>Filed from Bandra West</span>
          <span className="h-3 w-px bg-[color:var(--color-rule)]" />
          <span>Reading time &middot; Four minutes</span>
        </div>

        {/* Body — true newspaper columns with an inset image the text wraps around */}
        <FadeUp delay={0.35}>
          <div
            className="mt-6 text-[color:var(--color-charcoal)] [column-fill:balance] md:columns-3 md:gap-10"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "var(--text-base)",
              lineHeight: 1.7,
              fontWeight: 400,
            }}
          >
            {/* Drop-cap opening */}
            <p className="mb-4">
              <span
                aria-hidden="true"
                className="float-left mr-2 leading-[0.85] text-[color:var(--color-charcoal)]"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "3.6em",
                  fontWeight: 400,
                  marginTop: "0.05em",
                }}
              >
                T
              </span>
              he first time it happens you are not paying attention.
              You are walking past an open doorway on the fourteenth
              floor of an old hotel, and the air there is not the air
              of the rest of the building. It carries something
              &mdash; tuberose held back, a little cedar, a memory of
              monsoon dust on a clay roof.
            </p>

            {/* Inline figure — floats inside columns; text wraps around it */}
            <figure className="mb-4 inline-block w-full">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[color:var(--color-stardust-soft)]">
                <Image
                  src="/images/vibe/vibe-07.webp"
                  alt="A room in Bandra, mid-afternoon"
                  fill
                  sizes="(min-width: 768px) 22vw, 90vw"
                  className="object-cover"
                />
              </div>
              <figcaption
                className="mt-2 text-[0.58rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)]"
              >
                Fig. 01 &middot; Bandra, mid-afternoon
              </figcaption>
            </figure>

            <p className="mb-4">
              You stop. You stand there for half a second longer than
              is polite. And then you walk on, and the rest of the
              corridor smells of nothing in particular &mdash; carpet,
              cleaning product, the sealed circulated nothing of every
              other building on the island.
            </p>

            <p className="mb-4">
              <em>Quint Home</em> began with that half-second. The
              idea that a room can announce itself before you do; that
              the air in a doorway can do the work of an introduction.
              We spent two years asking what it would take to keep
              that quality on a shelf &mdash; not a candle, not a
              spray, not a stick in oil that surrenders by the third
              week. Something with the steady, almost editorial
              composure of a piece of furniture.
            </p>

            <p className="mb-4">
              The answer, in the end, was an ultrasonic diffuser
              poured in brass and fired clay, paired with five
              fragrance oils built at IFRA-compliant 70&ndash;90%
              concentrations. It runs under eighteen decibels.
              It will hold a room of forty square metres without ever
              announcing that it is the thing doing the holding.
            </p>

            <p className="mb-4">
              This first volume is twenty-two pages long. It is a
              field guide, mostly &mdash; to corridors, to doorways,
              to the rooms we have lived in and the rooms we are
              still trying to make. You are reading the front page.
              The rest is below.
            </p>

            <p>
              <em>Welcome, then, to the Mumbai edition.</em>
            </p>
          </div>
        </FadeUp>

        {/* Sign-off rule */}
        <div className="mt-10 flex items-center gap-5 text-[0.6rem] uppercase tracking-[0.36em] text-[color:var(--color-charcoal-soft)]">
          <span className="h-px flex-1 bg-[color:var(--color-rule)]" />
          <span>&para;</span>
          <span className="h-px flex-1 bg-[color:var(--color-rule)]" />
        </div>

        {/* Bottom: by-line + small product preview + CTAs */}
        <div className="mt-8 grid grid-cols-1 items-end gap-8 pb-14 md:grid-cols-12 md:gap-10 md:pb-20">
          {/* Product preview — small, hairlined */}
          <div className="md:col-span-4">
            <FadeUp delay={0.45}>
              <figure className="flex items-end gap-4 border-t border-[color:var(--color-rule)] pt-4">
                <div className="relative aspect-[3/4] w-24 shrink-0 overflow-hidden bg-[color:var(--color-stardust-soft)]">
                  <Image
                    src="/images/diffusers/diffuser-01.png"
                    alt="The Quint Home diffuser, in brass"
                    fill
                    sizes="96px"
                    className="object-contain"
                  />
                </div>
                <figcaption className="flex flex-col gap-1 pb-1">
                  <span className="text-[0.58rem] uppercase tracking-[0.36em] text-[color:var(--color-charcoal-soft)]">
                    Featured object
                  </span>
                  <span
                    className="text-[color:var(--color-charcoal)]"
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "var(--text-lg)",
                      fontStyle: "italic",
                      fontWeight: 400,
                      lineHeight: 1.2,
                    }}
                  >
                    The Diffuser, No. 01
                  </span>
                  <span className="text-[0.6rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)]">
                    Brass &middot; Fired clay &middot; &lt; 18 dB
                  </span>
                </figcaption>
              </figure>
            </FadeUp>
          </div>

          {/* By-line + CTAs */}
          <div className="md:col-span-8">
            <div className="border-t border-[color:var(--color-rule)] pt-4">
              <p
                className="text-[color:var(--color-charcoal-soft)]"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "var(--text-base)",
                  lineHeight: 1.5,
                  fontStyle: "italic",
                  fontWeight: 400,
                }}
              >
                Set in Literata. Filed from Mumbai, 14&deg;
                north of the air-conditioning of every other
                fragrance house. &mdash; The Editors
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-3">
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
          </div>
        </div>
      </div>
    </section>
  );
}
