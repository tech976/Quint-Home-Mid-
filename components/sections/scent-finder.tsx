"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { oils } from "@/lib/data/oils";
import { formatINR } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/section-header";

/**
 * Scent Finder – a polished two-panel quiz. The left panel is a large visual
 * that updates live as you hover/choose a mood, then resolves to the matched
 * oil. The right panel carries the two questions and the result. Deterministic:
 * each oil has a (mood, accord) profile and the closest match wins.
 */

type Mood = "calm" | "fresh" | "warm" | "grounded";
type Accord = "citrus" | "green" | "amber" | "salt";

const MOODS: { key: Mood; label: string; sub: string; image: string }[] = [
  { key: "calm", label: "Calm & still", sub: "Meditative, clean", image: "/images/scent-finder/calm.webp" },
  { key: "fresh", label: "Fresh & alive", sub: "Dewy, bright", image: "/images/scent-finder/fresh.webp" },
  { key: "warm", label: "Warm & soft", sub: "Comforting, cosy", image: "/images/scent-finder/warm.webp" },
  { key: "grounded", label: "Grounded & deep", sub: "Mineral, woody", image: "/images/scent-finder/grounded.webp" },
];

const ACCORDS: { key: Accord; label: string; sub: string }[] = [
  { key: "citrus", label: "Citrus & white florals", sub: "Bright, luminous, clean" },
  { key: "green", label: "Green & mineral", sub: "Vetiver, flint, cedar" },
  { key: "amber", label: "Vanilla & amber", sub: "Soft, sweet, enveloping" },
  { key: "salt", label: "Salt & leather", sub: "Coastal air, warm hide" },
];

const PROFILE: Record<string, { mood: Mood; accord: Accord }> = {
  "blanc-ritual": { mood: "calm", accord: "citrus" },
  terrain: { mood: "grounded", accord: "green" },
  "first-rain": { mood: "fresh", accord: "citrus" },
  "soft-hour": { mood: "warm", accord: "amber" },
  solitude: { mood: "fresh", accord: "green" },
  shoreline: { mood: "warm", accord: "salt" },
  "grand-lobby": { mood: "warm", accord: "citrus" },
  "the-arrival": { mood: "calm", accord: "citrus" },
};

function recommend(mood: Mood, accord: Accord) {
  let best = oils[0];
  let bestScore = -1;
  for (const o of oils) {
    const p = PROFILE[o.slug];
    if (!p) continue;
    const score = (p.mood === mood ? 2 : 0) + (p.accord === accord ? 1 : 0);
    if (score > bestScore) {
      bestScore = score;
      best = o;
    }
  }
  return best;
}

export function ScentFinder() {
  const [mood, setMood] = useState<Mood | null>(null);
  const [accord, setAccord] = useState<Accord | null>(null);
  const [hovered, setHovered] = useState<Mood | null>(null);

  const step = mood == null ? 1 : accord == null ? 2 : 3;
  const result = mood && accord ? recommend(mood, accord) : null;

  const reset = () => {
    setMood(null);
    setAccord(null);
    setHovered(null);
  };

  // Which mood image leads the visual panel during steps 1–2.
  const visibleMood: Mood = hovered ?? mood ?? MOODS[0].key;
  const visibleMoodLabel = MOODS.find((m) => m.key === visibleMood)?.label ?? "";

  return (
    <section className="bg-[color:var(--color-ivory)] py-[var(--spacing-section)]">
      <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
        <SectionHeader
          chapter="Scent Finder"
          chapterTitle="Choose your scent"
          headline={
            <>
              Tell us the mood.
              <br />
              <em className="not-italic text-[color:var(--color-aerial-deep)]">
                We&rsquo;ll suggest a scent.
              </em>
            </>
          }
          meta={
            <>
              Two questions, two taps.
              <br />
              You&rsquo;ll land on one of our oils.
            </>
          }
        />

        {/* Two-panel finder card */}
        <div className="mt-12 grid overflow-hidden border border-[color:var(--color-rule)] bg-[color:var(--color-white)] shadow-[0_30px_80px_-50px_rgba(58,53,50,0.45)] md:grid-cols-2">
          {/* ===== Visual panel ===== */}
          {/* Panel matches the source images' 4:5 portrait ratio on phones so
              nothing is cropped; on desktop it stretches to the column height. */}
          <div className="relative aspect-[4/5] md:aspect-auto md:h-auto md:min-h-[34rem]">
            {/* Mood images, cross-fading (steps 1–2) */}
            {MOODS.map((m) => (
              <Image
                key={m.key}
                src={m.image}
                alt={m.label}
                fill
                sizes="(min-width: 768px) 45vw, 100vw"
                className={`object-cover transition-opacity duration-[900ms] ease-[var(--ease-quint)] ${
                  step < 3 && m.key === visibleMood ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
            {/* Result oil image (step 3) */}
            {step === 3 && result && (
              <Image
                src={result.image}
                alt={result.name}
                fill
                sizes="(min-width: 768px) 45vw, 100vw"
                className="object-cover object-[center_65%]"
              />
            )}

            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(58,53,50,0.10) 0%, rgba(58,53,50,0) 30%, rgba(58,53,50,0.55) 100%)",
              }}
            />

            {/* Caption on the visual */}
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 text-[color:var(--color-stardust)] md:p-8">
              <span className="text-[0.6rem] uppercase tracking-[0.36em] opacity-85">
                {step === 3 ? "Your match" : "The mood"}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "var(--text-2xl)",
                  lineHeight: 1,
                  letterSpacing: "-0.018em",
                }}
              >
                {step === 3 && result ? result.name : visibleMoodLabel}
              </span>
            </div>
          </div>

          {/* ===== Interaction panel ===== */}
          <div className="flex flex-col justify-center p-8 md:p-12 lg:p-14">
            {/* Progress */}
            <div className="mb-8 flex items-center gap-3">
              {[1, 2].map((s) => (
                <span
                  key={s}
                  className="h-[3px] w-10 rounded-full transition-colors duration-500"
                  style={{
                    backgroundColor:
                      (step === 3 ? 2 : step) >= s
                        ? "var(--color-clay)"
                        : "var(--color-rule)",
                  }}
                />
              ))}
              <span className="ml-2 text-[0.6rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)]">
                {step < 3 ? `Step ${step} of 2` : "Result"}
              </span>
            </div>

            {/* Step 1 – mood */}
            {step === 1 && (
              <div>
                <h3
                  className="max-w-[20ch]"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "var(--text-2xl)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.016em",
                    fontWeight: 400,
                  }}
                >
                  What should the room feel like?
                </h3>
                <div className="mt-7">
                  {MOODS.map((m) => (
                    <button
                      key={m.key}
                      type="button"
                      onMouseEnter={() => setHovered(m.key)}
                      onMouseLeave={() => setHovered(null)}
                      onFocus={() => setHovered(m.key)}
                      onClick={() => setMood(m.key)}
                      className="group flex w-[100%] items-center justify-between gap-4 border-t border-[color:var(--color-rule)] py-4 text-left outline-none last:border-b"
                    >
                      <span>
                        <span
                          className="block transition-colors duration-300 group-hover:text-[color:var(--color-clay)]"
                          style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "var(--text-xl)",
                            lineHeight: 1.1,
                            letterSpacing: "-0.012em",
                            fontWeight: 400,
                          }}
                        >
                          {m.label}
                        </span>
                        <span className="mt-1 block text-[0.74rem] text-[color:var(--color-charcoal-soft)]">
                          {m.sub}
                        </span>
                      </span>
                      <span className="text-[color:var(--color-charcoal-soft)] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[color:var(--color-clay)]">
                        →
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2 – accord */}
            {step === 2 && (
              <div>
                <h3
                  className="max-w-[20ch]"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "var(--text-2xl)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.016em",
                    fontWeight: 400,
                  }}
                >
                  Which notes do you like?
                </h3>
                <div className="mt-7">
                  {ACCORDS.map((a) => (
                    <button
                      key={a.key}
                      type="button"
                      onClick={() => setAccord(a.key)}
                      className="group flex w-[100%] items-center justify-between gap-4 border-t border-[color:var(--color-rule)] py-4 text-left outline-none last:border-b"
                    >
                      <span>
                        <span
                          className="block transition-colors duration-300 group-hover:text-[color:var(--color-clay)]"
                          style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "var(--text-xl)",
                            lineHeight: 1.1,
                            letterSpacing: "-0.012em",
                            fontWeight: 400,
                          }}
                        >
                          {a.label}
                        </span>
                        <span className="mt-1 block text-[0.74rem] text-[color:var(--color-charcoal-soft)]">
                          {a.sub}
                        </span>
                      </span>
                      <span className="text-[color:var(--color-charcoal-soft)] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[color:var(--color-clay)]">
                        →
                      </span>
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setMood(null)}
                  className="mt-7 text-[0.72rem] uppercase tracking-[0.28em] text-[color:var(--color-charcoal-soft)] underline-offset-4 hover:text-[color:var(--color-charcoal)] hover:underline"
                >
                  ← Back
                </button>
              </div>
            )}

            {/* Step 3 – result */}
            {step === 3 && result && (
              <div>
                <p className="text-[0.6rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
                  Try
                </p>
                <h3
                  className="mt-4"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "var(--text-4xl)",
                    lineHeight: 1.0,
                    letterSpacing: "-0.022em",
                    fontWeight: 400,
                  }}
                >
                  {result.name}
                </h3>
                <p className="mt-5 max-w-[42ch] text-[var(--text-base)] leading-[1.7] text-[color:var(--color-charcoal-soft)]">
                  {result.tagline}
                </p>

                {/* Note pyramid */}
                <dl className="mt-7 grid gap-1.5 border-t border-[color:var(--color-rule)] pt-6 text-[0.84rem] leading-[1.45]">
                  {(
                    [
                      ["Top", result.notes.top],
                      ["Heart", result.notes.heart],
                      ["Base", result.notes.base],
                    ] as const
                  ).map(([label, arr]) => (
                    <div key={label} className="grid grid-cols-[3.5rem_1fr] gap-3">
                      <dt className="pt-px text-[0.54rem] uppercase tracking-[0.24em] text-[color:var(--color-charcoal-soft)]">
                        {label}
                      </dt>
                      <dd className="text-[color:var(--color-charcoal)]">
                        {arr.join(", ")}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
                  <Link
                    href={`/shop/${result.slug}`}
                    className="group inline-flex items-center gap-3 border-b border-[color:var(--color-charcoal)] pb-1.5 text-[0.72rem] uppercase tracking-[0.28em] transition-colors duration-300 hover:border-[color:var(--color-clay)] hover:text-[color:var(--color-clay)]"
                  >
                    View {result.name} · {formatINR(result.priceINR)}
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                  <button
                    type="button"
                    onClick={reset}
                    className="text-[0.72rem] uppercase tracking-[0.28em] text-[color:var(--color-charcoal-soft)] underline-offset-4 hover:text-[color:var(--color-charcoal)] hover:underline"
                  >
                    Start over
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
