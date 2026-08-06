import Link from "next/link";
import { Monogram } from "@/components/brand/logo";
import type { Metadata } from "next";
import { FadeUp } from "@/components/motion/fade-up";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Quint Home collects, uses, and protects your personal information – DPDP Act (India) compliant.",
};

const LAST_UPDATED = "5 June 2026";

const sections = [
  {
    chapter: "One",
    label: "Information Provided by You",
    paragraphs: [
      "When you create an account, place an order, or sign up for our newsletter, we collect the information you voluntarily provide. This may include your name, email address, shipping and billing address, phone number, transaction-related information (such as purchases, refunds, and offers), and information you enter while using our website or services (such as saving items or placing an order).",
      "The information you provide falls under the categories of “personal information” and “sensitive personal information” as defined under applicable Indian data protection law, including the Digital Personal Data Protection Act, 2023. We may use this information to facilitate and fulfil your orders, send important notices, provide information, and conduct marketing promotions. If we require additional personally identifiable information or contact details, we will ask for your consent.",
      "You have the option not to provide personally identifiable information or any other information we request. You can also withdraw your consent to our use of such information by contacting us in writing, but in that case we reserve the right to limit or deny further services or products.",
    ],
  },
  {
    chapter: "Two",
    label: "Use of Information",
    paragraphs: [
      "The collected information is used for research, trend analysis, administering services, understanding customer behaviour, and gathering demographic data. We may share anonymised, aggregated, and individual data with external service providers to enhance our offerings. Personalised content and improved product recommendations can be achieved by combining individual data and behaviour patterns with other information. Third-party service providers assist with data analysis and personalisation but cannot share the information independently. Unless authorised by you, we do not trade, sell, or rent personal information to third parties.",
      "Occasionally, aggregate statistics, site information, and traffic patterns may be shared with trusted third parties, without personally identifiable information. Disclosure of information may occur to enforce our terms of use, protect rights and safety, address technical issues, investigate fraud, respond to government requests, or comply with the law. Where personal data relating to a minor is provided, consent from their legal guardian is assumed. Support is offered through customer registration.",
    ],
  },
  {
    chapter: "Three",
    label: "Personal Information Access",
    paragraphs: [
      "We provide you with the means to access and update your personally identifiable information through your account or by contacting us. We take reasonable security measures to protect your password from unauthorised access.",
    ],
  },
  {
    chapter: "Four",
    label: "Reviews & Public Content",
    paragraphs: [
      "When you use certain features of our website, such as submitting a product review or rating, please be aware that any personal information you choose to post or share – including comments, ratings, and photos – may be accessible to other users and become public information. It is important to understand the risks associated with sharing such information, as we cannot control its use by others. If you disclose personal information in your profile or when posting publicly, it may become publicly available.",
    ],
  },
  {
    chapter: "Five",
    label: "Cookies",
    paragraphs: [
      "We use cookies – small text files sent to your device – to enhance your browsing experience. Cookies help you log in more quickly, remember your preferences, and gather aggregated data to understand customer trends. This data helps us improve our offerings by providing more relevant content. Most web browsers are initially set to accept cookies, but you can adjust your browser settings to refuse cookies or be notified when a cookie is being sent. Disabling cookies may affect the functionality of certain features and services.",
    ],
  },
  {
    chapter: "Six",
    label: "Security",
    paragraphs: [
      "We are committed to safeguarding the confidentiality of your information. We implement electronic, physical, and procedural safeguards to protect the data we collect and maintain. Access to this information is restricted to authorised personnel on a need-to-know basis, for the purpose of operating, developing, or improving our website, products, and services. While we strive to provide reasonable security measures, no system is completely immune to potential security breaches.",
    ],
  },
  {
    chapter: "Seven",
    label: "Log Information",
    paragraphs: [
      "When you access our website, our servers automatically record information sent by your browser. This may include your internet protocol (IP) address, web request, browser language, browser type, the date and time of your request, and one or more cookies that may uniquely identify your browser.",
    ],
  },
  {
    chapter: "Eight",
    label: "Your Consent",
    paragraphs: [
      "By registering with us, placing an order, or subscribing to our newsletter, you provide informed consent for the collection, processing, storage, handling, and disclosure of your information as outlined in this policy. We process your information in India, and if you reside outside India, your data will be transferred, processed, and stored in accordance with the applicable data protection laws of India.",
    ],
  },
  {
    chapter: "Nine",
    label: "User Communications",
    paragraphs: [
      "When you communicate with us via email, WhatsApp, or other means, we retain those communications to address your inquiries, respond to your requests, and improve our services.",
    ],
  },
  {
    chapter: "Ten",
    label: "Changes to This Statement",
    paragraphs: [
      "As our company evolves, our privacy policy will also evolve to address new circumstances. We recommend reviewing this policy regularly for any updates, as your continued use of our website, products, and services indicates your acceptance of any changes made.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <article className="bg-[color:var(--color-white)]">
      {/* ====================================================
          § HERO MASTHEAD
          ==================================================== */}
      <section className="border-b border-[color:var(--color-rule)] pt-10 md:pt-14">
        <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
          <div className="grid items-end gap-10 pb-12 md:grid-cols-12 md:gap-16">
            <FadeUp delay={0.05} className="md:col-span-7">
              <p className="text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
                Legal · Privacy
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
                Privacy{" "}
                <em className="text-[color:var(--color-aerial-deep)]">Policy.</em>
              </h1>
            </FadeUp>

            <FadeUp delay={0.1} className="md:col-span-5">
              <p className="max-w-[44ch] text-[var(--text-base)] leading-[1.85] text-[color:var(--color-charcoal-soft)]">
                At Quint Home, we value your trust and consider your privacy to
                be of utmost importance. This policy outlines how we collect,
                use, and disclose your personal information when you visit{" "}
                <span className="text-[color:var(--color-charcoal)]">
                  www.quinthome.in
                </span>{" "}
                or purchase from our site.
              </p>
              <p className="mt-5 text-[0.62rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)]">
                Last updated {LAST_UPDATED} · DPDP Act (India) compliant
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ====================================================
          § DISCLAIMER STRIP
          ==================================================== */}
      <section className="border-b border-[color:var(--color-rule)] bg-[color:var(--color-stardust-soft)]">
        <div className="mx-auto max-w-[var(--container-full)] px-6 py-7 md:px-10">
          <p className="max-w-[80ch] text-[0.86rem] leading-[1.7] text-[color:var(--color-charcoal-soft)]">
            <span className="uppercase tracking-[0.18em] text-[0.62rem] text-[color:var(--color-charcoal)]">
              Disclaimer –{" "}
            </span>
            Quint Home is operated by Rusera Lifestyle, Mumbai, India. We reserve
            the right to withhold or decline a sale transaction at our
            discretion. Exchanges and warranty are governed by our{" "}
            <Link
              href="/shipping"
              className="text-[color:var(--color-charcoal)] underline-offset-4 hover:text-[color:var(--color-clay)] hover:underline"
            >
              Shipping &amp; Returns policy
            </Link>
            .
          </p>
        </div>
      </section>

      {/* ====================================================
          § POLICY SECTIONS
          ==================================================== */}
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

      {/* ====================================================
          § RIGHTS & CONTACT (DPDP)
          ==================================================== */}
      <section className="bg-[color:var(--color-verdant)] py-[var(--spacing-section)] text-[color:var(--color-stardust)]">
        <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
          <FadeUp>
            <div className="mb-12 flex items-center gap-4 text-[0.6rem] uppercase tracking-[0.42em] text-[color:var(--color-stardust)]/65">
              <span className="h-px w-12 bg-[color:var(--color-stardust)]/25" />
              <span><Monogram className="mr-1.5 inline-block h-[0.9em] w-[0.9em] align-[-0.12em]" />Your Rights &amp; Contact</span>
              <span className="h-px flex-1 bg-[color:var(--color-stardust)]/15" />
            </div>
          </FadeUp>

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
                Your data is yours.{" "}
                <em className="not-italic text-[color:var(--color-aerial-soft)]">
                  Reach us any time to access, correct, or erase it.
                </em>
              </h2>
            </FadeUp>

            <FadeUp delay={0.1} className="md:col-span-5">
              <p
                className="text-[var(--text-base)] leading-[1.8]"
                style={{ color: "rgba(238, 228, 216, 0.85)" }}
              >
                Under the Digital Personal Data Protection Act, 2023, you may
                request access to, correction of, or erasure of your personal
                data, and withdraw consent at any time. To exercise these rights
                or ask any question about this policy, write to us.
              </p>
              <a
                href="mailto:hello@quinthome.in"
                className="group mt-7 inline-flex items-center gap-3 border-b border-[color:var(--color-stardust)]/60 pb-1.5 text-[0.72rem] uppercase tracking-[0.32em] text-[color:var(--color-stardust)] transition-colors duration-500 hover:border-[color:var(--color-aerial-soft)] hover:text-[color:var(--color-aerial-soft)]"
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
            </FadeUp>
          </div>
        </div>
      </section>
    </article>
  );
}
