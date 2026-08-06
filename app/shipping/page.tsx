import Link from "next/link";
import { Monogram } from "@/components/brand/logo";
import type { Metadata } from "next";
import { FadeUp } from "@/components/motion/fade-up";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description:
    "How your Quint Home order is shipped across India, our exchange policy for damaged or defective items, and the limited 1-year warranty.",
};

const LAST_UPDATED = "1 July 2026";

const sections: {
  chapter: string;
  label: string;
  paragraphs: string[];
  bullets?: string[];
}[] = [
  {
    chapter: "One",
    label: "Processing & Delivery",
    paragraphs: [
      "Orders are prepared and dispatched within 3 business days of confirmation, shipped from Mumbai through our courier partners. Delivery typically takes 3–5 business days anywhere in India; timelines are estimates and may vary with destination.",
      "Once your order ships, you will receive tracking details by email. If anything is delayed or amiss, write to us at hello@quinthome.in and we will follow up promptly.",
    ],
  },
  {
    chapter: "Two",
    label: "Shipping Charges",
    paragraphs: [
      "Shipping is complimentary on all orders above ₹5,000. Below that a flat ₹99 applies, shown clearly in your bag and at checkout before payment. We currently ship within India only.",
    ],
  },
  {
    chapter: "Three",
    label: "Refunds & Cancellations",
    paragraphs: [
      "We’re unable to offer cancellations or refunds once an order is placed. If your product is damaged or defective though, we’ll gladly exchange it – see below for details.",
    ],
  },
  {
    chapter: "Four",
    label: "Damaged or Defective Items",
    paragraphs: [
      "Please inspect your order carefully on delivery. If an item arrives damaged or defective, notify us within 3 days at hello@quinthome.in with your order number, the product, and a clear photo or description of the issue.",
      "Once verified, the item will be exchanged for a new one – no refund is issued. Returns are not accepted for products that have been used, altered, or damaged through customer negligence. The item must be returned in its original packaging with all accessories and documentation, and shipped back within 3 days of the exchange being authorised.",
    ],
  },
  {
    chapter: "Five",
    label: "Returns Not Accepted",
    paragraphs: [
      "Returns will not be accepted under the following conditions:",
    ],
    bullets: [
      "The product is damaged due to misuse or neglect.",
      "The product is returned without original packaging, including price tags, labels, free items, original packing, freebies, and other accessories, or if the original packaging is damaged.",
      "The serial number of the product has been tampered with.",
      "Defective products that are not covered under the seller or manufacturer’s warranty.",
      "The product has been used, altered, or shows signs of wear.",
      "The return request is initiated after 3 business days from the order delivery date.",
      "Returns initiated by customers who have not followed the proper return procedure (e.g., failing to contact Customer Support first) will not be accepted.",
      "Any items that have been personalised, customised, or made-to-order are final sale and not eligible for return.",
      "Items purchased during promotional sales or clearance events are non-returnable and will not be accepted.",
      "Returns will be rejected if the product is found to be counterfeit or not purchased directly from Quint Home.",
      "Any items that have crossed the warranty period.",
    ],
  },
  {
    chapter: "Six",
    label: "Limited Warranty",
    paragraphs: [
      "Every Quint Home device carries a limited warranty of up to one year from the date of purchase against manufacturing defects. The warranty covers the device itself – not fragrance oils, nor damage from misuse, accident, or unauthorised repair. To make a claim, write to us with your order number and we will take it from there.",
    ],
  },
];

export default function ShippingPage() {
  return (
    <article className="bg-[color:var(--color-white)]">
      <section className="border-b border-[color:var(--color-rule)] pt-10 md:pt-14">
        <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
          <div className="grid items-end gap-10 pb-12 md:grid-cols-12 md:gap-16">
            <FadeUp delay={0.05} className="md:col-span-7">
              <p className="text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
                Legal · Shipping &amp; Returns
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
                Shipping &amp;{" "}
                <em className="text-[color:var(--color-aerial-deep)]">
                  Returns.
                </em>
              </h1>
            </FadeUp>

            <FadeUp delay={0.1} className="md:col-span-5">
              <p className="max-w-[44ch] text-[var(--text-base)] leading-[1.85] text-[color:var(--color-charcoal-soft)]">
                We ship across India from Mumbai, with complimentary delivery
                over{" "}
                <span className="text-[color:var(--color-charcoal)]">₹5,000</span>.
              </p>
              <p className="mt-5 text-[0.62rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)]">
                Last updated {LAST_UPDATED}
              </p>
            </FadeUp>
          </div>
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
                      <Monogram className="mr-1.5 inline-block h-[0.9em] w-[0.9em] align-[-0.12em]" />
                      {group.chapter}
                    </p>
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
                    {group.bullets && (
                      <ul className="max-w-[68ch] space-y-3">
                        {group.bullets.map((b, i) => (
                          <li key={i} className="flex gap-3">
                            <span
                              aria-hidden="true"
                              className="mt-[0.62em] h-1 w-1 shrink-0 rounded-full bg-[color:var(--color-clay)]"
                            />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
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
                Something arrived damaged?{" "}
                <em className="not-italic text-[color:var(--color-aerial-soft)]">
                  Write to us within 3 days.
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
                  href="/terms"
                  className="underline-offset-4 hover:text-[color:var(--color-aerial-soft)] hover:underline"
                >
                  Terms &amp; Conditions
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
