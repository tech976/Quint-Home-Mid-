import Link from "next/link";
import type { Metadata } from "next";
import { FadeUp } from "@/components/motion/fade-up";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about Quint Home diffusers and fragrance oils.",
};

const groups = [
  {
    chapter: "§ One",
    label: "The Object",
    items: [
      {
        q: "How is this different from a regular diffuser?",
        a: "Most home diffusers vibrate a tank of water and release a faint, diluted mist of about 1 to 3 percent fragrance plus humidified air. Quint Home diffuses the oil directly, with no water and no heat, at 70 to 90 percent concentration. The scent is much stronger, lasts longer, and holds the full structure of top, heart, and base notes.",
      },
      {
        q: "Is it actually silent?",
        a: "Under 18 dB — quieter than a refrigerator hum. There is no fan, no gurgling water, and no clicking. Safe for bedrooms, studies, and offices.",
      },
      {
        q: "What does it take to set up?",
        a: "Fill the oil reservoir, pair with the Quint Home companion app once via Bluetooth, set a morning and evening schedule, and the device runs on its own from that point. No daily interaction is needed. The Plug-In model needs no app at all — it runs on a built-in 24-hour cyclic timer.",
      },
    ],
  },
  {
    chapter: "§ Two",
    label: "The Oils",
    items: [
      {
        q: "How long does a 100 ml oil last?",
        a: "Approximately 60–140 days, depending on the model and intensity. Most models average around 90 days at moderate settings. We&rsquo;ll suggest a cadence at checkout.",
      },
      {
        q: "Are the oils IFRA-compliant?",
        a: "Yes — every Quint Home oil is composed to IFRA (International Fragrance Association) standards. Safe around children and pets when used as directed.",
      },
      {
        q: "What is a Hotel Credential oil?",
        a: "Two of our eight oils, Grand Lobby and The Arrival, are Hotel Credential blends: composed to the same brief as the signature scenting you find in considered public spaces, then made for the home. They are more complex to blend, carry a Hotel Credential badge, and sit at a small price premium over the standard oils.",
      },
    ],
  },
  {
    chapter: "§ Three",
    label: "App & Control",
    items: [
      {
        q: "How do I control it?",
        a: "Over Bluetooth, through the Quint Home companion app for iOS and Android. Pair once, then set your schedules and intensity. Every model except the Plug-In is Bluetooth-enabled; the Plug-In runs on a built-in 24-hour cyclic timer with no app required.",
      },
      {
        q: "Does it need Wi-Fi to work?",
        a: "No. The diffusers run entirely over Bluetooth and an on-device schedule — no Wi-Fi, no account, and no cloud. You adjust settings from your phone when it is in range, and the device keeps to its schedule on its own.",
      },
    ],
  },
  {
    chapter: "§ Four",
    label: "Shipping & Returns",
    items: [
      {
        q: "Where do you ship?",
        a: "All of India. 3–5 business days from Mumbai via our courier partner. Free shipping over ₹3,000.",
      },
      {
        q: "Can I return it?",
        a: "Within 7 days of receipt for unused product. The oil bottle must remain sealed. We&rsquo;ll arrange pickup.",
      },
      {
        q: "Do you ship internationally?",
        a: "Not yet. Planned for 2027 — UAE, Singapore, UK first. Write to us if you&rsquo;d like to be on the list.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <article className="bg-[color:var(--color-white)]">
      {/* ====================================================
          §  HERO
          ==================================================== */}
      <section className="border-b border-[color:var(--color-rule)] pt-10 md:pt-14">
        <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
          <div className="grid items-end gap-10 pb-12 md:grid-cols-12 md:gap-16">
            <FadeUp delay={0.05} className="md:col-span-7">
              <p className="text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
                Frequently Asked Questions
              </p>
              <h1
                className="mt-7 max-w-[18ch] text-balance"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "var(--text-5xl)",
                  lineHeight: 0.96,
                  letterSpacing: "-0.024em",
                  fontWeight: 400,
                }}
              >
                Everything,{" "}
                <em className="text-[color:var(--color-aerial-deep)]">
                  asked before.
                </em>
              </h1>
            </FadeUp>

            <FadeUp delay={0.1} className="md:col-span-5">
              <p className="max-w-[40ch] text-[var(--text-base)] leading-[1.85] text-[color:var(--color-charcoal-soft)]">
                If your question isn&rsquo;t answered below, write to us at
                hello@quinthome.in — we reply within 24 hours.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ====================================================
          §  GROUPS
          ==================================================== */}
      <section className="py-[var(--spacing-section)]">
        <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
          <div className="grid gap-y-16 md:gap-y-24">
            {groups.map((group) => (
              <div key={group.chapter} className="grid gap-10 md:grid-cols-12 md:gap-16">
                <FadeUp className="md:col-span-4">
                  <div className="md:sticky md:top-32">
                    <p className="text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
                      {group.chapter}
                    </p>
                    <h2
                      className="mt-5"
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "var(--text-2xl)",
                        lineHeight: 1.1,
                        letterSpacing: "-0.014em",
                        fontWeight: 400,
                      }}
                    >
                      {group.label}
                    </h2>
                  </div>
                </FadeUp>

                <div className="md:col-span-8">
                  <dl className="grid gap-px overflow-hidden border-y border-[color:var(--color-rule)] bg-[color:var(--color-rule)]">
                    {group.items.map((item, i) => (
                      <FadeUp key={i} delay={i * 0.04} as="div" className="bg-[color:var(--color-white)]">
                        <details className="group">
                          <summary className="flex cursor-pointer items-baseline justify-between gap-6 py-7 list-none hover:text-[color:var(--color-clay)] transition-colors duration-300">
                            <span
                              className="max-w-[48ch] text-[var(--text-base)]"
                              style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "var(--text-lg)",
                                lineHeight: 1.3,
                                letterSpacing: "-0.008em",
                                fontWeight: 400,
                              }}
                            >
                              {item.q}
                            </span>
                            <span className="shrink-0 text-[0.78rem] text-[color:var(--color-charcoal-soft)] transition-transform duration-500 group-open:rotate-45">
                              +
                            </span>
                          </summary>
                          <p className="max-w-[58ch] pb-7 text-[var(--text-base)] leading-[1.85] text-[color:var(--color-charcoal-soft)]">
                            {item.a}
                          </p>
                        </details>
                      </FadeUp>
                    ))}
                  </dl>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          §  CLOSING
          ==================================================== */}
      <section className="bg-[color:var(--color-stardust-soft)] py-[var(--spacing-section)]">
        <div className="mx-auto max-w-[var(--container-content)] px-6 text-center md:px-10">
          <FadeUp>
            <p className="text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
              § Still curious
            </p>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h2
              className="mx-auto mt-6 max-w-[22ch] text-balance"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "var(--text-3xl)",
                lineHeight: 1.1,
                letterSpacing: "-0.016em",
                fontWeight: 400,
              }}
            >
              Write to us.{" "}
              <em className="text-[color:var(--color-aerial-deep)]">
                We answer everything personally.
              </em>
            </h2>
          </FadeUp>
          <FadeUp delay={0.16}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 border-b border-[color:var(--color-charcoal)] pb-1.5 text-[0.72rem] uppercase tracking-[0.32em] transition-colors duration-500 hover:text-[color:var(--color-clay)] hover:border-[color:var(--color-clay)]"
              >
                Contact us
                <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
              </Link>
              <a
                href="mailto:hello@quinthome.in"
                className="text-[0.72rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)] hover:text-[color:var(--color-charcoal)]"
              >
                hello@quinthome.in
              </a>
            </div>
          </FadeUp>
        </div>
      </section>
    </article>
  );
}
