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
 * USPs — the brand's unique selling points, from the brief. Alternating
 * image / text rows (zigzag), each with a number, lead, body, and an icon stat.
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
    body: "Technically superior to standard ultrasonic diffusers — no water dilution, richer scent, and larger room coverage.",
    image: "/images/usp/usp-1.webp",
    stat: { icon: Wind, label: "Coverage", value: "200–500+ sq ft" },
  },
  {
    n: "02",
    lead: "App-controlled and smart-home integrated",
    body: "Works with Apple Home, Amazon Alexa and Google Home. Set your schedule once and forget it.",
    image: "/images/usp/usp-2.webp",
    stat: {
      icon: Smartphone,
      label: "Works with",
      value: "Apple Home · Alexa · Google Home",
    },
  },
  {
    n: "03",
    lead: "Luxury hotel scents, now for the home",
    body: "No other Indian brand offers this. IFRA-compliant, 70–90% concentrated oils, blended top, heart and base — not a synthetic air freshener.",
    image: "/images/usp/usp-3.webp",
    stat: {
      icon: Droplets,
      label: "IFRA-compliant",
      value: "70–90% oil concentration",
    },
  },
  {
    n: "04",
    lead: "A decor object, not an appliance",
    body: "A sculptural form designed to sit on your shelf with poise and flair.",
    image: "/images/usp/usp-4.webp",
    stat: {
      icon: Sparkles,
      label: "Designed to blend",
      value: "Made to be seen, not hidden",
    },
  },
  {
    n: "05",
    lead: "Wireless and rechargeable",
    body: "Premium column models run cord-free on a built-in rechargeable battery — place them anywhere, no outlet required.",
    image: "/images/usp/usp-5.webp",
    stat: {
      icon: BatteryCharging,
      label: "Recharge once",
      value: "Cord-free, weeks of fragrance",
    },
  },
];

export function USPs() {
  return (
    <section className="border-y border-[color:var(--color-rule)] bg-[color:var(--color-stardust-soft)] py-[var(--spacing-section)]">
      <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
        {/* Header */}
        <FadeUp>
          <div className="mb-12 flex flex-col gap-6 border-b border-[color:var(--color-rule)] pb-6 md:mb-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="flex items-center gap-3 text-[0.6rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
                <Monogram className="h-4 w-4 shrink-0" />
                Why Quint
              </p>
              <h2
                className="mt-6 max-w-[16ch] text-balance"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "var(--text-4xl)",
                  lineHeight: 1.04,
                  letterSpacing: "-0.022em",
                  fontWeight: 400,
                }}
              >
                Not like the diffuser{" "}
                <em className="not-italic text-[color:var(--color-aerial-deep)]">
                  you already know.
                </em>
              </h2>
            </div>
            <p className="max-w-[30ch] text-[0.92rem] leading-[1.7] text-[color:var(--color-charcoal-soft)] md:text-right">
              Five things that set it apart from everything else on the shelf.
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
                <div className="grid items-center gap-8 border-t border-[color:var(--color-rule)] py-12 first:border-t-0 md:grid-cols-2 md:gap-16 md:py-16">
                  {/* Image */}
                  <div
                    className={`relative aspect-[16/11] overflow-hidden ${
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
                  <div
                    className={`${imageFirst ? "md:order-2" : "md:order-1"}`}
                  >
                    <span
                      className="block tabular-nums text-[color:var(--color-charcoal)]"
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "var(--text-4xl)",
                        lineHeight: 1,
                        letterSpacing: "-0.01em",
                        fontWeight: 400,
                      }}
                    >
                      {u.n}
                    </span>
                    <h3
                      className="mt-5 max-w-[20ch] text-balance"
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "var(--text-2xl)",
                        lineHeight: 1.12,
                        letterSpacing: "-0.014em",
                        fontWeight: 400,
                      }}
                    >
                      {u.lead}
                    </h3>
                    <p className="mt-4 max-w-[42ch] text-[0.95rem] leading-[1.7] text-[color:var(--color-charcoal-soft)]">
                      {u.body}
                    </p>

                    {/* Icon stat */}
                    <div className="mt-7 flex items-center gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[color:var(--color-rule)] text-[color:var(--color-aerial-deep)]">
                        <Icon className="h-5 w-5" strokeWidth={1.4} aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-[0.56rem] uppercase tracking-[0.3em] text-[color:var(--color-charcoal-soft)]">
                          {u.stat.label}
                        </p>
                        <p className="mt-1 text-[0.86rem] text-[color:var(--color-charcoal)]">
                          {u.stat.value}
                        </p>
                      </div>
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
