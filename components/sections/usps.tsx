import { FadeUp } from "@/components/motion/fade-up";
import { Monogram } from "@/components/brand/logo";

/**
 * USPs — the brand's unique selling points, from the brief. Sits between the
 * smart-home (green) section and the product showcase. Editorial layout: a
 * sticky header on the left, a numbered list with large serif numerals right.
 */
const usps = [
  {
    n: "01",
    lead: "Waterless cold-air nebulization",
    body: "Technically superior to standard ultrasonic diffusers — no water dilution, richer scent, and larger room coverage.",
  },
  {
    n: "02",
    lead: "App-controlled and smart-home integrated",
    body: "Works with Apple Home, Amazon Alexa and Google Home. Set your schedule once and forget it.",
  },
  {
    n: "03",
    lead: "Luxury hotel scents, now for the home",
    body: "No other Indian brand offers this. IFRA-compliant, 70–90% concentrated oils, blended top, heart and base — not a synthetic air freshener.",
  },
  {
    n: "04",
    lead: "A decor object, not an appliance",
    body: "A sculptural form designed to sit on your shelf with poise and flair.",
  },
  {
    n: "05",
    lead: "Wireless and rechargeable",
    body: "Premium column models run cord-free on a built-in rechargeable battery — place them anywhere, no outlet required.",
  },
];

export function USPs() {
  return (
    <section className="border-y border-[color:var(--color-rule)] bg-[color:var(--color-stardust-soft)] py-[var(--spacing-section)]">
      <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,24rem)_1fr] lg:gap-24">
          {/* ===== Header — left, sticky on desktop ===== */}
          <FadeUp>
            <div className="lg:sticky lg:top-28 lg:self-start">
              <div className="flex items-center gap-3 text-[0.6rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
                <Monogram className="h-4 w-4 shrink-0" />
                <span>Why Quint</span>
              </div>
              <h2
                className="mt-7 max-w-[14ch] text-balance"
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
              <p className="mt-6 max-w-[32ch] text-[var(--text-base)] leading-[1.8] text-[color:var(--color-charcoal-soft)]">
                Five things that set it apart from everything else on the shelf.
              </p>
            </div>
          </FadeUp>

          {/* ===== Numbered list — right ===== */}
          <ul>
            {usps.map((u, i) => (
              <FadeUp key={u.n} delay={i * 0.05}>
                <li className="group flex gap-6 border-t border-[color:var(--color-rule)] py-8 first:pt-0 md:gap-12 md:py-10 lg:first:pt-0">
                  <span
                    className="shrink-0 tabular-nums text-[color:var(--color-aerial-deep)] transition-colors duration-500 group-hover:text-[color:var(--color-clay)]"
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "var(--text-4xl)",
                      lineHeight: 1,
                      letterSpacing: "-0.02em",
                      fontWeight: 400,
                    }}
                  >
                    {u.n}
                  </span>
                  <div className="min-w-0 pt-1">
                    <h3
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
                    <p className="mt-3 max-w-[52ch] text-[0.95rem] leading-[1.7] text-[color:var(--color-charcoal-soft)]">
                      {u.body}
                    </p>
                  </div>
                </li>
              </FadeUp>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
