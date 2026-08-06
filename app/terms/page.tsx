import Link from "next/link";
import { Monogram } from "@/components/brand/logo";
import type { Metadata } from "next";
import { FadeUp } from "@/components/motion/fade-up";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The terms that govern your use of www.quinthome.in and any purchase you make from it.",
};

const LAST_UPDATED = "5 June 2026";

const sections = [
  {
    chapter: "One",
    label: "Acceptance of Terms",
    paragraphs: [
      "By accessing or using this website, you confirm that you have read, understood, and agreed to these Terms & Conditions. If you do not agree with any part of these terms, please refrain from using the site.",
    ],
  },
  {
    chapter: "Two",
    label: "Website Content",
    paragraphs: [
      "All materials on this website – including text, images, graphics, logos, icons, and videos – are owned by or licensed to Quint Home and are protected by copyright and other intellectual property laws. You may not reproduce, distribute, modify, or otherwise use any content from this website without our prior written permission.",
    ],
  },
  {
    chapter: "Three",
    label: "Product Information",
    paragraphs: [
      "We aim to provide accurate product details, pricing, and availability at all times. However, we do not guarantee that such information is complete, error-free, or current, and it may be changed or updated without prior notice.",
      "Images, illustrations, and companion-app screens shown on this website are for representational purposes only. The actual Quint Home app’s design, interface, and features may differ from those depicted.",
    ],
  },
  {
    chapter: "Four",
    label: "Online Purchases",
    paragraphs: [
      "When placing an order, you agree to provide accurate and complete billing and shipping information. All purchases are subject to our Shipping & Returns policy, which is incorporated into these terms by reference. We do not offer refunds or cancellations; damaged or defective items are exchanged as described there.",
    ],
  },
  {
    chapter: "Five",
    label: "User Conduct",
    paragraphs: [
      "You agree to use this website lawfully and in compliance with all applicable regulations. You must not disrupt or interfere with the functioning of the website, its security, or another user's experience of it.",
    ],
  },
  {
    chapter: "Six",
    label: "Disclaimer of Warranties",
    paragraphs: [
      "This website and our services are provided on an “as is” and “as available” basis, without warranties or representations of any kind, whether express or implied. We do not guarantee that the website will be uninterrupted, timely, error-free, or free of viruses or other harmful components.",
    ],
  },
  {
    chapter: "Seven",
    label: "Limitation of Liability",
    paragraphs: [
      "To the fullest extent permitted by law, Quint Home and Rusera Lifestyle disclaim liability for any direct, indirect, incidental, consequential, or punitive damages arising out of or in connection with your use of, or inability to use, this website or our products and services.",
    ],
  },
  {
    chapter: "Eight",
    label: "Modification of Terms",
    paragraphs: [
      "We reserve the right to modify these terms at any time without prior notice. Any changes take effect immediately upon being posted on this page, and your continued use of the website constitutes your acceptance of the revised terms.",
    ],
  },
  {
    chapter: "Nine",
    label: "Governing Law",
    paragraphs: [
      "These Terms & Conditions are governed by and construed in accordance with the laws of India. Any disputes arising in relation to them shall be subject to the exclusive jurisdiction of the courts of Mumbai, Maharashtra.",
    ],
  },
];

export default function TermsPage() {
  return (
    <article className="bg-[color:var(--color-white)]">
      <section className="border-b border-[color:var(--color-rule)] pt-10 md:pt-14">
        <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
          <div className="grid items-end gap-10 pb-12 md:grid-cols-12 md:gap-16">
            <FadeUp delay={0.05} className="md:col-span-7">
              <p className="text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
                Legal · Terms
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
                Terms &amp;{" "}
                <em className="text-[color:var(--color-aerial-deep)]">
                  Conditions.
                </em>
              </h1>
            </FadeUp>

            <FadeUp delay={0.1} className="md:col-span-5">
              <p className="max-w-[44ch] text-[var(--text-base)] leading-[1.85] text-[color:var(--color-charcoal-soft)]">
                These terms govern your use of{" "}
                <span className="text-[color:var(--color-charcoal)]">
                  www.quinthome.in
                </span>{" "}
                and any purchase you make from it. By using this website, you
                agree to be bound by them.
              </p>
              <p className="mt-5 text-[0.62rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)]">
                Last updated {LAST_UPDATED}
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      <section className="border-b border-[color:var(--color-rule)] bg-[color:var(--color-stardust-soft)]">
        <div className="mx-auto max-w-[var(--container-full)] px-6 py-7 md:px-10">
          <p className="max-w-[80ch] text-[0.86rem] leading-[1.7] text-[color:var(--color-charcoal-soft)]">
            <span className="text-[0.62rem] uppercase tracking-[0.18em] text-[color:var(--color-charcoal)]">
              Disclaimer –{" "}
            </span>
            Quint Home is operated by Rusera Lifestyle, Mumbai, India. We reserve
            the right to withhold or decline any sale transaction at our
            discretion. All disputes are resolved in accordance with the laws of
            India.
          </p>
        </div>
      </section>

      <section className="py-[var(--spacing-section)]">
        <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
          <div className="grid gap-y-14 md:gap-y-20">
            {sections.map((group) => (
              <div
                key={group.chapter}
                className="grid gap-6 border-t border-[color:var(--color-rule)] pt-10 md:grid-cols-12 md:gap-16"
              >
                <FadeUp className="md:col-span-4">
                  <div className="md:sticky md:top-32">
                    <p className="text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
                      <Monogram className="mr-1.5 inline-block h-[0.9em] w-[0.9em] align-[-0.12em]" />{group.chapter}                    </p>
                    <h2
                      className="mt-5 max-w-[16ch] text-balance"
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

                <FadeUp delay={0.08} className="md:col-span-8">
                  <div className="space-y-5 text-[var(--text-base)] leading-[1.85] text-[color:var(--color-charcoal-soft)]">
                    {group.paragraphs.map((p, i) => (
                      <p key={i} className="max-w-[68ch]">
                        {p}
                      </p>
                    ))}
                  </div>
                </FadeUp>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[color:var(--color-verdant)] py-[var(--spacing-section)] text-[color:var(--color-stardust)]">
        <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            <FadeUp className="md:col-span-7">
              <h2
                className="text-balance text-[color:var(--color-stardust)]"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "var(--text-3xl)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.018em",
                  fontWeight: 400,
                }}
              >
                Questions about these terms?{" "}
                <em className="not-italic text-[color:var(--color-aerial-soft)]">
                  We&rsquo;re a message away.
                </em>
              </h2>
            </FadeUp>
            <FadeUp delay={0.1} className="md:col-span-5">
              <a
                href="mailto:hello@quinthome.in"
                className="group inline-flex items-center gap-3 border-b border-[color:var(--color-stardust)]/60 pb-1.5 text-[0.72rem] uppercase tracking-[0.32em] text-[color:var(--color-stardust)] transition-colors duration-500 hover:border-[color:var(--color-aerial-soft)] hover:text-[color:var(--color-aerial-soft)]"
              >
                hello@quinthome.in
                <span className="transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </a>
              <address className="mt-8 not-italic text-[0.72rem] leading-[1.9] text-[color:var(--color-stardust)]/55">
                <span className="uppercase tracking-[0.18em] text-[color:var(--color-stardust)]/80">
                  Rusera Lifestyle
                </span>
                <br />
                <a
                  href="mailto:hello@ruseralifestyle.com"
                  className="underline-offset-4 hover:text-[color:var(--color-aerial-soft)] hover:underline"
                >
                  hello@ruseralifestyle.com
                </a>{" "}
                &middot; +91 98193 45550
              </address>
              <p className="mt-6 text-[0.78rem] leading-[1.7] text-[color:var(--color-stardust)]/70">
                See also our{" "}
                <Link
                  href="/shipping"
                  className="underline-offset-4 hover:text-[color:var(--color-aerial-soft)] hover:underline"
                >
                  Shipping &amp; Returns
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="underline-offset-4 hover:text-[color:var(--color-aerial-soft)] hover:underline"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </FadeUp>
          </div>
        </div>
      </section>
    </article>
  );
}
