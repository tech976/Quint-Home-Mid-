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
 * USPs — the brand's unique selling points, from the brief. Compact alternating
 * image / text rows, each with a number, lead, short body, and an icon stat.
 */
type Usp = {
  n: string;
  lead: string;
  body: string;
  image: string;
  stat: { icon: LucideIcon; label: string; value: string };
};

const usps: Usp[] = [
  {
    n: "01",
    lead: "Waterless cold-air nebulization",
    body: "Superior to ultrasonic diffusers — no water, richer scent, more coverage.",
    image: "/images/usp/usp-1.webp",
    stat: { icon: Wind, label: "Coverage", value: "200–500+ sq ft" },
  },
  {
    n: "02",
    lead: "App-controlled, smart-home integrated",
    body: "Apple Home, Alexa or Google Home. Set a schedule once and forget it.",
    image: "/images/usp/usp-2.webp",
    stat: { icon: Smartphone, label: "Works with", value: "Apple · Alexa · Google" },
  },
  {
    n: "03",
    lead: "Luxury hotel scents, for the home",
    body: "IFRA-compliant oils at full perfumery strength — not a synthetic air freshener.",
    image: "/images/usp/usp-3.webp",
    stat: { icon: Droplets, label: "IFRA-compliant", value: "70–90% concentration" },
  },
  {
    n: "04",
    lead: "A decor object, not an appliance",
    body: "A sculptural form made to sit on the shelf, not hidden away.",
    image: "/images/usp/usp-4.webp",
    stat: { icon: Sparkles, label: "Designed to blend", value: "Made to be seen" },
  },
  {
    n: "05",
    lead: "Wireless and rechargeable",
    body: "Premium models run cord-free on a rechargeable battery — place them anywhere.",
    image: "/images/usp/usp-5.webp",
    stat: { icon: BatteryCharging, label: "Recharge once", value: "Weeks of fragrance" },
  },
];

export function USPs() {
  return (
    <section className="border-y border-[color:var(--color-rule)] bg-[color:var(--color-stardust-soft)] py-[var(--spacing-section)]">
      <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
        {/* Header */}
        <FadeUp>
          <div className="mb-8 flex flex-col gap-4 border-b border-[color:var(--color-rule)] pb-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="flex items-center gap-3 text-[0.6rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
                <Monogram className="h-4 w-4 shrink-0" />
                Why Quint
              </p>
              <h2
                className="mt-5 max-w-[16ch] text-balance"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "var(--text-3xl)",
                  lineHeight: 1.06,
                  letterSpacing: "-0.02em",
                  fontWeight: 400,
                }}
              >
                Not like the diffuser{" "}
                <em className="not-italic text-[color:var(--color-aerial-deep)]">
                  you already know.
                </em>
              </h2>
            </div>
            <p className="max-w-[28ch] text-[0.86rem] leading-[1.6] text-[color:var(--color-charcoal-soft)] md:text-right">
              Five things that set it apart.
            </p>
          </div>
        </FadeUp>

        {/* Alternating rows */}
        <div>
          {usps.map((u, i) => {
            const Icon = u.stat.icon;
            const imageFirst = i % 2 === 0;
            return (
              <FadeUp key={u.n}>
                <div className="grid items-center gap-6 border-t border-[color:var(--color-rule)] py-7 first:border-t-0 md:grid-cols-2 md:gap-12 md:py-9">
                  {/* Image */}
                  <div
                    className={`relative aspect-[16/9] overflow-hidden ${
                      imageFirst ? "md:order-1" : "md:order-2"
                    }`}
                  >
                    <Image
                      src={u.image}
                      alt={u.lead}
                      fill
                      sizes="(min-width: 768px) 46vw, 100vw"
                      className="object-cover"
                    />
                  </div>

                  {/* Text */}
                  <div className={imageFirst ? "md:order-2" : "md:order-1"}>
                    <div className="flex items-baseline gap-4">
                      <span
                        className="tabular-nums text-[color:var(--color-aerial-deep)]"
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontSize: "var(--text-2xl)",
                          lineHeight: 1,
                          letterSpacing: "-0.01em",
                          fontWeight: 400,
                        }}
                      >
                        {u.n}
                      </span>
                      <h3
                        className="max-w-[22ch] text-balance"
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontSize: "var(--text-xl)",
                          lineHeight: 1.12,
                          letterSpacing: "-0.012em",
                          fontWeight: 400,
                        }}
                      >
                        {u.lead}
                      </h3>
                    </div>
                    <p className="mt-3 max-w-[42ch] text-[0.9rem] leading-[1.6] text-[color:var(--color-charcoal-soft)]">
                      {u.body}
                    </p>

                    {/* Icon stat */}
                    <div className="mt-5 flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[color:var(--color-rule)] text-[color:var(--color-aerial-deep)]">
                        <Icon className="h-4 w-4" strokeWidth={1.4} aria-hidden="true" />
                      </span>
                      <p className="flex flex-wrap items-baseline gap-x-2 text-[0.62rem] uppercase tracking-[0.24em] text-[color:var(--color-charcoal-soft)]">
                        <span>{u.stat.label}</span>
                        <span className="opacity-40">·</span>
                        <span className="text-[color:var(--color-charcoal)]">
                          {u.stat.value}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
