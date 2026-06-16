import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { FadeUp } from "@/components/motion/fade-up";
import { MonogramDivider } from "@/components/brand/monogram-divider";

export const metadata: Metadata = {
  title: "About",
  description:
    "Quintessence, the founder's story, and the vision behind Quint Home — hotel-grade home fragrance from Mumbai.",
};

// Founder's story — verbatim from the Quint Home website brief. Do not edit the wording.
const FOUNDER_STORY = [
  "Three years ago, I checked into one of India's most celebrated hotels in Udaipur. I expected beauty — the architecture, the lake, the service. What I didn't expect was to stop in the corridor and simply stand there, trying to understand what I was breathing.",
  "The fragrance was everywhere and nowhere. It wasn't a candle. It wasn't a spray. It was woven into the air of the entire palace — warm, unhurried, completely unlike anything I had ever smelled in someone's home. I asked the staff. They smiled politely. The scent, they explained, was proprietary.",
  "I went home and spent weeks trying to source it anyway. I couldn't.",
  "Las Vegas, a year later. A luxury casino hotel on the Strip. A different continent, a different aesthetic — but the same moment in a lobby. The same quiet certainty that someone had thought deeply about how this space should smell, and had made it so. I tried again. Same answer.",
  "It kept happening. A safari lodge in the Serengeti — warm baobab wood and wild earth, the Tanzanian plains made intimate. A beach hotel in Nusa Dua — Balinese frangipani on a sea breeze, cool and luminous, the Indian Ocean present in every breath.",
  "Each time, I tried to find the scent. Each time: proprietary.",
  "Hotels understand something most of us don't. Scent is the invisible layer of luxury. It sets the tone before you see anything, before you touch anything.",
  "So why do we accept that our homes — the spaces where we spend the majority of our lives — smell like nothing in particular?",
];

const FOUNDER_CLOSING =
  "Quint Home exists because I couldn't stop thinking about that.";

// Udaipur — the founding palace, where the story begins.
const UDAIPUR = [
  "/images/udaipur/udaipur-1.webp",
  "/images/udaipur/udaipur-2.webp",
  "/images/udaipur/udaipur-3.webp",
  "/images/udaipur/udaipur-4.webp",
  "/images/udaipur/udaipur-5.webp",
  "/images/udaipur/udaipur-6.webp",
];

// The journey — the verbatim story laid out as a timeline of stops.
const STOPS = [
  {
    no: "01",
    place: "Udaipur",
    year: "2023",
    images: true,
    paragraphs: [FOUNDER_STORY[0], FOUNDER_STORY[1], FOUNDER_STORY[2]],
  },
  {
    no: "02",
    place: "Las Vegas",
    year: "2024",
    images: false,
    paragraphs: [FOUNDER_STORY[3]],
  },
  {
    no: "03",
    place: "Serengeti · Nusa Dua",
    year: "2024–25",
    images: false,
    paragraphs: [FOUNDER_STORY[4], FOUNDER_STORY[5]],
  },
  {
    no: "04",
    place: "The question",
    year: "",
    images: false,
    paragraphs: [FOUNDER_STORY[6], FOUNDER_STORY[7]],
  },
];

// Vision — verbatim, as supplied.
const VISION = [
  "We want to create a world where beautifully engineered diffusers and the finest fragrance oils come together seamlessly — making scent an effortless, living part of every room. Our vision is to become India's defining premium scenting brand — transforming the way homes, restaurants, hotels and stores use and experience fragrance.",
  "We hold every product to an uncompromising standard: diffusers that perform consistently, and oils with the depth and strength to fill a room and stay there.",
  "We serve individual customers looking to elevate their home, and commercial spaces that want a signature scent their customers will remember.",
];

export default function AboutPage() {
  return (
    <article className="bg-[color:var(--color-white)]">
      {/* ====================================================
          §  ONE — QUINTESSENCE (the word)
          ==================================================== */}
      <section className="border-b border-[color:var(--color-rule)] bg-[color:var(--color-stardust-soft)] pt-14 pb-[var(--spacing-section)] md:pt-24">
        <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
          <FadeUp>
            <div className="flex items-center gap-4 text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
              <span>§ One · The Word</span>
              <span className="h-px flex-1 bg-[color:var(--color-rule)]" />
            </div>
          </FadeUp>

          <div className="mt-10 grid gap-x-16 gap-y-6 md:grid-cols-12 md:items-end md:gap-y-0">
            <FadeUp delay={0.05} className="min-w-0 md:col-span-9">
              <h1
                className="leading-[0.9]"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "var(--text-display)",
                  letterSpacing: "-0.03em",
                  fontWeight: 400,
                }}
              >
                Quint
                <span className="text-[color:var(--color-clay)]">essence</span>
              </h1>
            </FadeUp>
            <FadeUp delay={0.12} className="min-w-0 md:col-span-3">
              <p className="text-[0.62rem] uppercase leading-[1.8] tracking-[0.28em] text-[color:var(--color-charcoal-soft)] md:text-right">
                noun
                <br />
                /kwɪnˈtɛsəns/
                <br />
                <span className="text-[color:var(--color-aerial-deep)]">
                  the fifth element
                </span>
              </p>
            </FadeUp>
          </div>

          <div className="mt-12 grid gap-x-16 gap-y-10 border-t border-[color:var(--color-rule)] pt-10 md:mt-14 md:grid-cols-12">
            <FadeUp delay={0.06} className="min-w-0 md:col-span-6">
              <p
                className="max-w-[34ch] text-balance"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "var(--text-2xl)",
                  lineHeight: 1.28,
                  letterSpacing: "-0.012em",
                  fontWeight: 400,
                }}
              >
                The most perfect or typical example of a quality.{" "}
                <em className="text-[color:var(--color-aerial-deep)]">
                  The fifth and highest element
                </em>{" "}
                in ancient and medieval philosophy, supposed to be the substance
                of the heavenly bodies.
              </p>
            </FadeUp>

            <FadeUp delay={0.12} className="min-w-0 md:col-span-6">
              <p className="text-[var(--text-base)] leading-[1.9] text-[color:var(--color-charcoal-soft)]">
                We didn&rsquo;t pick the name out of a dictionary. We picked it
                because the best version of a thing is rare, and scent is no
                exception. Done well, it sets the tone of a room before you
                notice anything else in it. Most of us spend the majority of our
                lives in homes that smell of nothing at all.
              </p>
              <p
                className="mt-6 max-w-[24ch] font-[family-name:var(--font-serif)] text-[color:var(--color-charcoal)]"
                style={{
                  fontSize: "var(--text-xl)",
                  lineHeight: 1.3,
                  letterSpacing: "-0.012em",
                }}
              >
                We thought that was{" "}
                <em className="text-[color:var(--color-clay)]">worth fixing.</em>
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ====================================================
          §  TWO — THE JOURNEY (founder's story as a timeline)
          ==================================================== */}
      <section className="py-[var(--spacing-section)]">
        <div className="mx-auto max-w-[var(--container-content)] px-6 md:px-10">
          <FadeUp>
            <div className="flex items-center justify-center gap-4 text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
              <span className="h-px w-10 bg-[color:var(--color-rule)]" />
              <span>§ Two · The Journey</span>
              <span className="h-px w-10 bg-[color:var(--color-rule)]" />
            </div>
          </FadeUp>
          <FadeUp delay={0.06}>
            <h2
              className="mx-auto mt-8 text-center"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "var(--text-4xl)",
                lineHeight: 1.06,
                letterSpacing: "-0.02em",
                fontWeight: 400,
              }}
            >
              It started in{" "}
              <em className="text-[color:var(--color-aerial-deep)]">Udaipur.</em>
            </h2>
          </FadeUp>

          {/* Timeline */}
          <div className="relative mt-14 md:mt-20">
            {/* Connecting rail */}
            <span
              aria-hidden="true"
              className="absolute left-[5px] top-3 bottom-3 w-px bg-[color:var(--color-rule)] md:left-[7px]"
            />

            <ol className="space-y-16 md:space-y-24">
              {STOPS.map((stop) => (
                <li key={stop.no} className="relative pl-9 md:pl-16">
                  <FadeUp>
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-1.5 h-3 w-3 rounded-full border border-[color:var(--color-aerial)] bg-[color:var(--color-white)] md:h-3.5 md:w-3.5"
                    />
                    <p className="text-[0.6rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)]">
                      <span className="tabular-nums text-[color:var(--color-clay)]">
                        {stop.no}
                      </span>{" "}
                      · {stop.place}
                      {stop.year ? ` · ${stop.year}` : ""}
                    </p>

                    <div className="mt-5 space-y-5 text-[var(--text-base)] leading-[1.9] text-[color:var(--color-charcoal-soft)]">
                      {stop.paragraphs.map((p, i) => (
                        <p key={i} className="max-w-[60ch]">
                          {p}
                        </p>
                      ))}
                    </div>

                    {stop.images && (
                      <div className="mt-7 grid max-w-[30rem] grid-cols-3 gap-2.5">
                        {UDAIPUR.map((src, i) => (
                          <div
                            key={i}
                            className="group relative aspect-[4/5] overflow-hidden bg-[color:var(--color-stardust)]"
                          >
                            <Image
                              src={src}
                              alt="Udaipur — a palace on the lake"
                              fill
                              sizes="160px"
                              className="object-cover transition-transform duration-[1600ms] ease-[var(--ease-quint)] group-hover:scale-[1.04]"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </FadeUp>
                </li>
              ))}

              {/* Destination — Quint Home */}
              <li className="relative pl-9 md:pl-16">
                <FadeUp>
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-1.5 h-3 w-3 rounded-full border border-[color:var(--color-clay)] bg-[color:var(--color-clay)] md:h-3.5 md:w-3.5"
                  />
                  <p className="text-[0.6rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)]">
                    <span className="text-[color:var(--color-clay)]">→</span>{" "}
                    Quint Home · Mumbai
                  </p>
                  <p
                    className="mt-5 max-w-[30ch] font-[family-name:var(--font-serif)] text-[color:var(--color-clay)]"
                    style={{
                      fontSize: "var(--text-2xl)",
                      lineHeight: 1.2,
                      letterSpacing: "-0.014em",
                    }}
                  >
                    {FOUNDER_CLOSING}
                  </p>
                </FadeUp>
              </li>
            </ol>
          </div>

          <FadeUp delay={0.1}>
            <p className="mt-16 text-center text-[0.62rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)]">
              Semil Rambhiya · Founder, Quint Home
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ====================================================
          §  THREE — THE VISION (verbatim, inverted)
          ==================================================== */}
      <section className="bg-[color:var(--color-verdant)] py-[var(--spacing-section)] text-[color:var(--color-stardust)]">
        <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
          <FadeUp>
            <div className="mb-12 flex items-center gap-4 text-[0.6rem] uppercase tracking-[0.42em] text-[color:var(--color-stardust)]/65">
              <span className="h-px w-12 bg-[color:var(--color-stardust)]/25" />
              <span>§ Three · The Vision</span>
              <span className="h-px flex-1 bg-[color:var(--color-stardust)]/15" />
            </div>
          </FadeUp>

          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            <FadeUp className="md:col-span-7">
              <p
                className="text-balance text-[color:var(--color-stardust)]"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "var(--text-3xl)",
                  lineHeight: 1.16,
                  letterSpacing: "-0.016em",
                  fontWeight: 400,
                }}
              >
                {VISION[0]}
              </p>
            </FadeUp>

            <FadeUp delay={0.1} className="min-w-0 md:col-span-5">
              <div
                className="space-y-5 text-[var(--text-base)] leading-[1.85]"
                style={{ color: "rgba(238, 228, 216, 0.85)" }}
              >
                <p>{VISION[1]}</p>
                <p>{VISION[2]}</p>
              </div>
            </FadeUp>
          </div>

          <FadeUp delay={0.16}>
            <figure className="mt-14 md:mt-16">
              <div className="relative aspect-[2.4/1] w-full overflow-hidden">
                <Image
                  src="/images/vibe/vibe-04.jpg"
                  alt="Late light moving over water"
                  fill
                  sizes="(min-width: 1600px) 1520px, 92vw"
                  className="object-cover"
                />
              </div>
            </figure>
          </FadeUp>
        </div>
      </section>

      {/* Monogram divider into the close */}
      <FadeUp>
        <MonogramDivider className="pt-[var(--spacing-section)]" />
      </FadeUp>

      {/* ====================================================
          §  CLOSING — the invitation
          ==================================================== */}
      <section className="pb-[var(--spacing-section)] pt-12 md:pt-16">
        <div className="mx-auto max-w-[var(--container-content)] px-6 text-center md:px-10">
          <FadeUp>
            <p className="text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
              The Invitation
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
              The scent that stopped me in a corridor.{" "}
              <em className="text-[color:var(--color-aerial-deep)]">
                Now it lives at home.
              </em>
            </h2>
          </FadeUp>
          <FadeUp delay={0.16}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              <Link
                href="/shop"
                className="group inline-flex items-center gap-3 border-b border-[color:var(--color-charcoal)] pb-1.5 text-[0.72rem] uppercase tracking-[0.32em] transition-colors duration-500 hover:border-[color:var(--color-clay)] hover:text-[color:var(--color-clay)]"
              >
                Shop the range
                <span className="transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <Link
                href="/journal"
                className="text-[0.72rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)] hover:text-[color:var(--color-charcoal)]"
              >
                Read the Journal
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </article>
  );
}
