import Link from "next/link";
import type { Metadata } from "next";
import { FadeUp } from "@/components/motion/fade-up";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Quint Home – WhatsApp or email.",
};

export default function ContactPage() {
  return (
    <article className="bg-[color:var(--color-white)]">
      {/* ====================================================
          § HERO
          ==================================================== */}
      <section className="border-b border-[color:var(--color-rule)] pt-10 md:pt-14">
        <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
          <div className="grid items-end gap-10 pb-12 md:grid-cols-12 md:gap-16">
            <FadeUp delay={0.05} className="md:col-span-7">
              <p className="text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
                Contact
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
                Get in touch{" "}
                <em className="text-[color:var(--color-aerial-deep)]">
                  with us.
                </em>
              </h1>
            </FadeUp>

            <FadeUp delay={0.1} className="md:col-span-5">
              <p className="max-w-[40ch] text-[var(--text-base)] leading-[1.85] text-[color:var(--color-charcoal-soft)]">
                We reply to every message within 24 hours, usually faster.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ====================================================
          § THREE CHANNELS
          ==================================================== */}
      <section className="py-[var(--spacing-section)]">
        <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
          <div className="grid gap-px overflow-hidden bg-[color:var(--color-rule)] md:grid-cols-3">
            <FadeUp className="contents">
              <a
                href="mailto:hello@quinthome.in"
                className="group flex flex-col justify-between gap-12 bg-[color:var(--color-white)] p-8 transition-colors duration-500 hover:bg-[color:var(--color-stardust-soft)] md:min-h-[360px]"
              >
                <p className="text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
                  № 01 · Email
                </p>
                <div>
                  <p
                    className="transition-colors duration-500 group-hover:text-[color:var(--color-clay)]"
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "var(--text-2xl)",
                      lineHeight: 1.1,
                      letterSpacing: "-0.014em",
                      fontWeight: 400,
                    }}
                  >
                    hello@quinthome.in
                  </p>
                  <p className="mt-7 text-[0.6rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)] transition-transform duration-500 group-hover:translate-x-1">
                    Write to us →
                  </p>
                </div>
              </a>
            </FadeUp>

            <FadeUp className="contents">
              <a
                href="https://wa.me/919819616668"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between gap-12 bg-[color:var(--color-white)] p-8 transition-colors duration-500 hover:bg-[color:var(--color-stardust-soft)] md:min-h-[360px]"
              >
                <p className="text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
                  № 02 · WhatsApp
                </p>
                <div>
                  <p
                    className="transition-colors duration-500 group-hover:text-[color:var(--color-clay)]"
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "var(--text-2xl)",
                      lineHeight: 1.1,
                      letterSpacing: "-0.014em",
                      fontWeight: 400,
                    }}
                  >
                    Chat on WhatsApp
                  </p>
                  <p className="mt-7 text-[0.6rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)] transition-transform duration-500 group-hover:translate-x-1">
                    Open WhatsApp →
                  </p>
                </div>
              </a>
            </FadeUp>

            <FadeUp className="contents">
              <Link
                href="/businesses"
                className="group flex flex-col justify-between gap-12 bg-[color:var(--color-white)] p-8 transition-colors duration-500 hover:bg-[color:var(--color-stardust-soft)] md:min-h-[360px]"
              >
                <p className="text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
                  № 03 · For Businesses
                </p>
                <div>
                  <p
                    className="transition-colors duration-500 group-hover:text-[color:var(--color-clay)]"
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "var(--text-2xl)",
                      lineHeight: 1.1,
                      letterSpacing: "-0.014em",
                      fontWeight: 400,
                    }}
                  >
                    Trade &amp; B2B
                  </p>
                  <p className="mt-3 max-w-[36ch] text-[0.92rem] leading-[1.65] text-[color:var(--color-charcoal-soft)]">
                    Commercial machines, bulk orders, and custom scent
                    development for hotels, restaurants, retail, and offices.
                  </p>
                  <p className="mt-7 text-[0.6rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)] transition-transform duration-500 group-hover:translate-x-1">
                    Trade enquiries →
                  </p>
                </div>
              </Link>
            </FadeUp>
          </div>
        </div>
      </section>

    </article>
  );
}
