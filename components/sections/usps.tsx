import Image from "next/image";
import { FadeUp } from "@/components/motion/fade-up";
import { Monogram } from "@/components/brand/logo";
import {
  Wind,
  Smartphone,
  Droplets,
  Sparkles,
  BatteryCharging,
  type LucideIcon,
} from "lucide-react";

/**
 * USPs — the brand's selling points, from the brief. Compact card grid: one
 * tight row of cards (image · number · lead · stat) instead of tall rows.
 */
type Usp = {
  n: string;
  lead: string;
  image: string;
  stat: { icon: LucideIcon; value: string };
};

const usps: Usp[] = [
  {
    n: "01",
    lead: "Waterless cold-air nebulization",
    image: "/images/usp/usp-1.webp",
    stat: { icon: Wind, value: "200–500+ sq ft coverage" },
  },
  {
    n: "02",
    lead: "App-controlled, smart-home ready",
    image: "/images/usp/usp-2.webp",
    stat: { icon: Smartphone, value: "Apple · Alexa · Google" },
  },
  {
    n: "03",
    lead: "Luxury hotel scents, for home",
    image: "/images/usp/usp-3.webp",
    stat: { icon: Droplets, value: "70–90% concentration" },
  },
  {
    n: "04",
    lead: "A decor object, not an appliance",
    image: "/images/usp/usp-4.webp",
    stat: { icon: Sparkles, value: "Made to be seen" },
  },
  {
    n: "05",
    lead: "Wireless and rechargeable",
    image: "/images/usp/usp-5.webp",
    stat: { icon: BatteryCharging, value: "Cord-free, runs for weeks" },
  },
];

export function USPs() {
  return (
    <section className="border-y border-[color:var(--color-rule)] bg-[color:var(--color-stardust-soft)] py-[var(--spacing-section-sm)]">
      <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
        {/* Header */}
        <FadeUp>
          <div className="mb-8 flex flex-col gap-3 md:mb-10 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="flex items-center gap-3 text-[0.6rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
                <Monogram className="h-4 w-4 shrink-0" />
                Why Quint
              </p>
              <h2
                className="mt-4 max-w-[18ch] text-balance"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "var(--text-3xl)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                  fontWeight: 400,
                }}
              >
                Five things that{" "}
                <em className="not-italic text-[color:var(--color-aerial-deep)]">
                  set it apart.
                </em>
              </h2>
            </div>
          </div>
        </FadeUp>

        {/* Compact card grid — 2 / 3 / 5 across */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-5">
          {usps.map((u, i) => {
            const Icon = u.stat.icon;
            return (
              <FadeUp key={u.n} delay={(i % 5) * 0.05} className="h-[100%]">
                <article className="group flex h-[100%] flex-col overflow-hidden border border-[color:var(--color-rule)] bg-[color:var(--color-white)] transition-shadow duration-500 hover:shadow-[0_24px_50px_-30px_rgba(58,53,50,0.45)]">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={u.image}
                      alt={u.lead}
                      fill
                      sizes="(min-width: 1024px) 18vw, (min-width: 768px) 30vw, 45vw"
                      className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-quint)] group-hover:scale-[1.05]"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-4 md:p-5">
                    <span className="text-[0.6rem] tabular-nums tracking-[0.2em] text-[color:var(--color-clay)]">
                      {u.n}
                    </span>
                    <h3
                      className="mt-2 text-balance"
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "1.05rem",
                        lineHeight: 1.18,
                        letterSpacing: "-0.012em",
                        fontWeight: 400,
                      }}
                    >
                      {u.lead}
                    </h3>

                    <div className="mt-auto flex items-center gap-2.5 border-t border-[color:var(--color-rule)] pt-3.5">
                      <Icon
                        className="h-4 w-4 shrink-0 text-[color:var(--color-aerial-deep)]"
                        strokeWidth={1.4}
                        aria-hidden="true"
                      />
                      <span className="text-[0.62rem] leading-[1.35] text-[color:var(--color-charcoal-soft)]">
                        {u.stat.value}
                      </span>
                    </div>
                  </div>
                </article>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
