import type { Metadata } from "next";
import Image from "next/image";
import { FadeUp } from "@/components/motion/fade-up";

export const metadata: Metadata = {
  title: "For Businesses",
  description:
    "Scent your space – commercial diffusers, bulk orders, and personalized scent development for hotels, restaurants, retail, and workspaces.",
};

const offerings = [
  {
    no: "01",
    title: "Commercial Machines",
    body: "Designed for continuous use, from compact entryways to full-floor coverage.",
  },
  {
    no: "02",
    title: "Bulk Orders",
    body: "Preferential pricing on devices and oils for multi-site and multi-location rollouts.",
  },
  {
    no: "03",
    title: "Signature Scents",
    body: "A fragrance developed exclusively for you – and no one else.",
  },
];

// TODO: replace with real, approved client testimonials.
const testimonials = [
  {
    quote:
      "Guests ask about the scent at the front desk almost every day. It's become part of how they remember us.",
    name: "General Manager",
    role: "A boutique hotel",
    image: "/images/udaipur/udaipur-2.webp",
  },
  {
    quote:
      "We put it in eleven stores in a quarter. Same scent everywhere, almost no upkeep.",
    name: "Retail Operations",
    role: "A lifestyle brand",
    image: "/images/indoor/indoor-02.webp",
  },
  {
    quote:
      "The café smells the way we always wanted it to. People sit longer now.",
    name: "Founder",
    role: "A Mumbai restaurant group",
    image: "/images/indoor/indoor-01.webp",
  },
];

export default function BusinessesPage() {
  return (
    <article className="bg-[color:var(--color-white)]">
      {/* ===== HERO – text on brand green ===== */}
      <section className="border-b border-[color:var(--color-stardust)]/10 bg-[color:var(--color-verdant)] pb-[var(--spacing-section)] pt-16 text-[color:var(--color-stardust)] md:pt-24">
        <div className="mx-auto w-[100%] max-w-[var(--container-full)] px-6 md:px-10">
          <FadeUp>
            <p className="text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-stardust)]/70">
              For Businesses
            </p>
          </FadeUp>
          <FadeUp delay={0.06}>
            <h1
              className="mt-6 max-w-[14ch] text-balance text-[color:var(--color-white)]"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "var(--text-6xl)",
                lineHeight: 0.95,
                letterSpacing: "-0.026em",
                fontWeight: 400,
              }}
            >
              Scent your{" "}
              <em className="not-italic text-[color:var(--color-aerial)]">
                space.
              </em>
            </h1>
          </FadeUp>
          <FadeUp delay={0.12}>
            <p className="mt-7 max-w-[44ch] text-[var(--text-base)] leading-[1.7] text-[color:var(--color-stardust)]/80">
              Fragrance devices and customization for hospitality, dining,
              retail and exclusive spaces.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ===== OFFERINGS – three tight columns ===== */}
      <section className="py-[var(--spacing-section)]">
        <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
          <div className="grid gap-x-12 gap-y-10 border-t border-[color:var(--color-rule)] pt-10 md:grid-cols-3">
            {offerings.map((o, i) => (
              <FadeUp key={o.no} delay={i * 0.06}>
                <div>
                  <span
                    className="block tabular-nums text-[color:var(--color-aerial-deep)]"
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "var(--text-3xl)",
                      lineHeight: 1,
                      fontWeight: 400,
                    }}
                  >
                    {o.no}
                  </span>
                  <h2
                    className="mt-4"
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "var(--text-2xl)",
                      lineHeight: 1.1,
                      letterSpacing: "-0.014em",
                      fontWeight: 400,
                    }}
                  >
                    {o.title}
                  </h2>
                  <p className="mt-3 max-w-[34ch] text-[0.95rem] leading-[1.7] text-[color:var(--color-charcoal-soft)]">
                    {o.body}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ===== EDITORIAL IMAGE BAND ===== */}
      <section className="relative isolate flex min-h-[56svh] items-center overflow-hidden text-[color:var(--color-stardust)]">
        <Image
          src="/images/indoor/indoor-01.webp"
          alt="A warm interior in evening light"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(28,35,28,0.92) 0%, rgba(28,35,28,0.62) 50%, rgba(28,35,28,0.22) 100%)",
          }}
        />
        <div className="relative z-10 mx-auto w-[100%] max-w-[var(--container-full)] px-6 md:px-10">
          <FadeUp>
            <h2
              className="max-w-[18ch] text-balance text-[color:var(--color-white)]"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "var(--text-4xl)",
                lineHeight: 1.04,
                letterSpacing: "-0.022em",
                fontWeight: 400,
              }}
            >
              The first thing people notice,{" "}
              <em className="not-italic text-[color:var(--color-white)]">
                before they see anything.
              </em>
            </h2>
          </FadeUp>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-[var(--spacing-section)]">
        <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
          <FadeUp>
            <p className="mb-12 text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
              From our clients
            </p>
          </FadeUp>
          <div className="grid gap-10 md:grid-cols-3 md:gap-x-12">
            {testimonials.map((t, i) => (
              <FadeUp key={i} delay={i * 0.06} className="h-[100%]">
                <figure className="flex h-[100%] flex-col">
                  <div className="relative aspect-[4/3] overflow-hidden bg-[color:var(--color-stardust-soft)]">
                    <Image
                      src={t.image}
                      alt={t.role}
                      fill
                      sizes="(min-width: 768px) 31vw, 90vw"
                      className="object-cover"
                    />
                  </div>
                  <blockquote
                    className="mt-7 flex-1 text-balance"
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "var(--text-2xl)",
                      lineHeight: 1.35,
                      letterSpacing: "-0.012em",
                      fontStyle: "italic",
                    }}
                  >
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6 border-t border-[color:var(--color-rule)] pt-4 text-[0.62rem] uppercase tracking-[0.28em] text-[color:var(--color-charcoal-soft)]">
                    {t.name} · {t.role}
                  </figcaption>
                </figure>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ENQUIRY FORM ===== */}
      <section className="bg-[color:var(--color-verdant)] py-[var(--spacing-section)] text-[color:var(--color-stardust)]">
        <div className="mx-auto max-w-[var(--container-content)] px-6 md:px-10">
          <FadeUp>
            <h2
              className="max-w-[24ch] text-balance text-[color:var(--color-stardust)]"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "var(--text-3xl)",
                lineHeight: 1.1,
                letterSpacing: "-0.016em",
                fontWeight: 400,
              }}
            >
              Tell us about your space.{" "}
              <em className="not-italic text-[color:var(--color-aerial-soft)]">
                We&rsquo;ll get back within 48 hours.
              </em>
            </h2>
          </FadeUp>

          <FadeUp delay={0.1}>
            <form className="mt-10 grid gap-7 md:grid-cols-2 md:gap-x-10">
              <Field label="Company" placeholder="Business or brand name" />
              <Field label="Your name" placeholder="First and last" />
              <Field label="Email" placeholder="you@company.com" type="email" />
              <Field
                label="Mobile number"
                placeholder="+91 98765 43210"
                type="tel"
              />
              <Field
                label="Type of space"
                placeholder="Hotel · Restaurant · Retail · Office · Other"
              />
              <div className="md:col-span-2">
                <Field
                  label="A note"
                  placeholder="Area, number of sites, or anything specific."
                  textarea
                />
              </div>

              <div className="md:col-span-2 mt-2 flex flex-wrap items-center justify-between gap-4">
                <p className="text-[0.62rem] uppercase tracking-[0.32em] text-[color:var(--color-stardust)]/55">
                  Or write directly:{" "}
                  <a
                    href="mailto:hello@quinthome.in"
                    className="underline-offset-4 hover:text-[color:var(--color-aerial-soft)] hover:underline"
                  >
                    hello@quinthome.in
                  </a>
                </p>
                <button
                  type="button"
                  className="group inline-flex h-12 items-center justify-center gap-3 bg-[color:var(--color-clay)] px-8 text-[0.72rem] uppercase tracking-[0.32em] text-[color:var(--color-ivory)] transition-colors duration-500 hover:bg-[color:var(--color-clay-deep)]"
                >
                  Submit enquiry
                  <span className="transition-transform duration-500 group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </div>
            </form>
          </FadeUp>
        </div>
      </section>
    </article>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
  textarea = false,
}: {
  label: string;
  placeholder?: string;
  type?: string;
  textarea?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-[0.6rem] uppercase tracking-[0.32em] text-[color:var(--color-stardust)]/60">
        {label}
      </span>
      {textarea ? (
        <textarea
          rows={4}
          placeholder={placeholder}
          className="mt-2 w-[100%] resize-none border-b border-[color:var(--color-stardust)]/25 bg-transparent py-2.5 text-[0.96rem] text-[color:var(--color-stardust)] placeholder:text-[color:var(--color-stardust)]/40 outline-none focus:border-[color:var(--color-stardust)]"
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          className="mt-2 w-[100%] border-b border-[color:var(--color-stardust)]/25 bg-transparent py-2.5 text-[0.96rem] text-[color:var(--color-stardust)] placeholder:text-[color:var(--color-stardust)]/40 outline-none focus:border-[color:var(--color-stardust)]"
        />
      )}
    </label>
  );
}
