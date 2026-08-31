import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { diffusers } from "@/lib/data/diffusers";
import { formatINR } from "@/lib/utils";
import { FadeUp } from "@/components/motion/fade-up";
import type { Diffuser } from "@/lib/types";

/**
 * Device comparison – coverage, power/connectivity, headline features, material
 * and placement, side by side. Keyed by the stable manufacturer model code so
 * it survives URL/slug changes. Facts not in the per-model spec sheet
 * (power type, clock, light) are curated here.
 */
type Fact = {
  power: string;
  control: string;
  clock: string;
  light: string;
  material: string;
};

const FACTS: Record<string, Fact> = {
  A326: {
    power: "Wireless — rechargeable battery",
    control: "App + touch panel",
    clock: "—",
    light: "Ambient mood light",
    material: "Aluminium",
  },
  A974: {
    power: "USB-corded",
    control: "App + knob",
    clock: "—",
    light: "Candle-like glow",
    material: "PP + fabric",
  },
  "A-T370": {
    power: "USB-corded",
    control: "App + touch panel",
    clock: "LED clock",
    light: "Breathing night light",
    material: "PMMA acrylic",
  },
  "A-T302": {
    power: "USB-corded",
    control: "App + touch panel",
    clock: "—",
    light: "Ambient base light",
    material: "PP + PET + Aluminium alloy",
  },
  A815: {
    power: "Plug-in — wall socket",
    control: "No app — 24h cyclic timer",
    clock: "—",
    light: "—",
    material: "PP + Glass bottle",
  },
};

/**
 * Clean product renders used ONLY in this comparison table (keyed by model
 * code). The shop grid, homepage and PDPs keep their own lifestyle imagery.
 */
const COMPARE_IMAGES: Record<string, string> = {
  A815: "/images/diffusers/pebble-v3.webp",
  A326: "/images/diffusers/monolith-v3.webp",
  A974: "/images/diffusers/loom-v4.webp",
  "A-T302": "/images/diffusers/pillar-v3.webp",
  "A-T370": "/images/diffusers/ember-v3.webp",
};

const ROWS: { label: string; get: (d: Diffuser) => string }[] = [
  { label: "Coverage", get: (d) => d.coverageLabel },
  { label: "Power", get: (d) => FACTS[d.model].power },
  { label: "Control", get: (d) => FACTS[d.model].control },
  { label: "Clock", get: (d) => FACTS[d.model].clock },
  { label: "Ambient light", get: (d) => FACTS[d.model].light },
  { label: "Material", get: (d) => FACTS[d.model].material },
  { label: "Best for", get: (d) => d.bestFor.join(", ") },
];

export function DiffuserCompare({
  highlightModel,
}: {
  /** When set (e.g. on a PDP), that device's column is emphasised. */
  highlightModel?: string;
} = {}) {
  return (
    <section
      id="compare"
      className="border-t border-[color:var(--color-rule)] bg-[color:var(--color-white)] py-[var(--spacing-section)]"
    >
      <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
        <FadeUp>
          <div className="mb-10 flex flex-col gap-3 border-b border-[color:var(--color-rule)] pb-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
                Compare
              </p>
              <h2
                className="mt-4 text-balance"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "var(--text-3xl)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                  fontWeight: 400,
                }}
              >
                Find the diffuser that fits.
              </h2>
            </div>
            <p className="max-w-[32ch] text-[0.86rem] leading-[1.6] text-[color:var(--color-charcoal-soft)] md:text-right">
              Five devices, one scent system — compare coverage, power and
              features at a glance.
            </p>
          </div>
        </FadeUp>

        {/* Phones can't fit five columns — swipe horizontally, labels pinned. */}
        <p className="mb-4 text-[0.58rem] uppercase tracking-[0.3em] text-[color:var(--color-charcoal-soft)]/70 md:hidden">
          Swipe to compare →
        </p>

        <FadeUp delay={0.1}>
          <div className="-mx-6 overflow-x-auto px-6 pb-2 md:mx-0 md:px-0">
            <div className="grid min-w-[44rem] grid-cols-[5.5rem_repeat(5,minmax(0,1fr))] md:min-w-0 md:grid-cols-[8rem_repeat(5,minmax(0,1fr))]">
              {/* ── Header row: empty corner + five device cards ── */}
              {/* The box-shadow paints the same white leftward across the scroll
                  container's 24px padding gap, so swiped-under content can't peek
                  out beside the pinned label column. */}
              <div className="sticky left-0 z-10 bg-[color:var(--color-white)] shadow-[-1.5rem_0_0_0_var(--color-white)]" />
              {diffusers.map((d) => (
                <Link
                  key={d.model}
                  href={`/range/${d.slug}`}
                  className="group flex flex-col text-center"
                >
                  {/* Bigger render, no backing box — always floats on white,
                      never carries the column highlight. */}
                  <div className="relative mx-auto mb-3.5 aspect-[3/4] w-24 sm:w-32 md:w-36">
                    <Image
                      src={COMPARE_IMAGES[d.model] ?? d.image}
                      alt={d.name}
                      fill
                      sizes="160px"
                      className="object-contain transition-transform duration-700 ease-[var(--ease-quint)] group-hover:scale-[1.06]"
                    />
                  </div>
                  {/* Text block — the beige highlight starts here, below the image. */}
                  <div
                    className={`flex-1 px-2 pb-7 ${
                      d.model === highlightModel
                        ? "bg-[color:var(--color-stardust-soft)]"
                        : ""
                    }`}
                  >
                    {d.model === highlightModel && (
                      <span className="mb-1 block text-[0.5rem] uppercase tracking-[0.16em] text-[color:var(--color-clay)]">
                        Viewing
                      </span>
                    )}
                    <p className="font-[family-name:var(--font-serif)] text-[0.95rem] leading-tight transition-colors group-hover:text-[color:var(--color-clay)]">
                      {d.name}
                    </p>
                    <p className="mt-1 text-[0.8rem] tabular-nums text-[color:var(--color-charcoal-soft)]">
                      {formatINR(d.priceINR)}
                    </p>
                  </div>
                </Link>
              ))}

              {/* ── One row per spec: label + five values ── */}
              {ROWS.map((row) => (
                <Fragment key={row.label}>
                  <div className="sticky left-0 z-10 border-t border-[color:var(--color-rule)] bg-[color:var(--color-white)] py-4 pr-4 text-[0.56rem] uppercase leading-tight tracking-[0.2em] text-[color:var(--color-charcoal-soft)] shadow-[-1.5rem_0_0_0_var(--color-white)]">
                    {row.label}
                  </div>
                  {diffusers.map((d) => (
                    <div
                      key={d.model}
                      className={`border-t border-[color:var(--color-rule)] px-2 py-4 text-[0.86rem] leading-[1.45] text-[color:var(--color-charcoal)] ${
                        d.model === highlightModel
                          ? "bg-[color:var(--color-stardust-soft)]"
                          : ""
                      }`}
                    >
                      {row.get(d)}
                    </div>
                  ))}
                </Fragment>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
