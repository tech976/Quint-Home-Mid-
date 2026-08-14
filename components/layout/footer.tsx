import Link from "next/link";
import { Monogram } from "@/components/brand/logo";
import { NewsletterForm } from "@/components/layout/newsletter-form";

const cols = [
  {
    heading: "The Range",
    links: [
      { href: "/range#diffusers", label: "Diffusers" },
      { href: "/range#oils", label: "Fragrance Oils" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/journal", label: "Journal" },
      { href: "/businesses", label: "For Businesses" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    heading: "Customer Care",
    links: [
      { href: "/faq", label: "FAQ" },
      { href: "/shipping", label: "Shipping & Returns" },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-[color:var(--color-rule)] bg-[color:var(--color-white)] text-[color:var(--color-charcoal)]">
      <div className="mx-auto max-w-[var(--container-full)] px-6 pt-20 pb-10 md:px-10">
        {/* Newsletter / Wordmark row */}
        <div className="grid gap-12 border-b border-[color:var(--color-rule)] pb-16 md:grid-cols-[1.2fr_1fr] md:gap-20">
          <div>
            <p className="font-eyebrow mb-6">The Newsletter</p>
            <h3
              className="max-w-[18ch] text-balance"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "var(--text-3xl)",
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
              }}
            >
              The next breath. Quint Home, into your inbox.
            </h3>
            <NewsletterForm />
          </div>

          <div className="flex items-center justify-start md:justify-end">
            <Monogram className="h-24 w-24 text-[color:var(--color-charcoal)] md:h-32 md:w-32" />
          </div>
        </div>

        {/* Nav columns */}
        <div className="grid gap-10 pt-14 md:grid-cols-4">
          <div>
            <p className="font-eyebrow mb-5">Quint Home</p>
            <p className="max-w-[34ch] text-[0.92rem] leading-[1.7] text-[color:var(--color-charcoal-soft)]">
              A contemporary home and atmosphere brand creating objects at the
              intersection of fragrance, design and innovation.
            </p>
            <p className="mt-3 max-w-[34ch] text-[0.92rem] leading-[1.7] text-[color:var(--color-charcoal-soft)]">
              Crafted for homes that feel as beautiful as they look.
            </p>
            <p className="mt-6 text-[0.78rem] tracking-[0.06em] text-[color:var(--color-charcoal-soft)]">
              <a
                href="mailto:hello@quinthome.in"
                className="underline-offset-4 hover:underline"
              >
                hello@quinthome.in
              </a>
            </p>
            <p className="mt-3 text-[0.78rem] tracking-[0.06em] text-[color:var(--color-charcoal-soft)]">
              <a
                href="https://www.instagram.com/shopquinthome/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-4 transition-colors hover:text-[color:var(--color-clay)] hover:underline"
              >
                Follow @shopquinthome on Instagram →
              </a>
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.heading}>
              <p className="font-eyebrow mb-5">{c.heading}</p>
              <ul className="space-y-3">
                {c.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-[0.95rem] text-[color:var(--color-charcoal)] underline-offset-4 transition-colors hover:text-[color:var(--color-clay)] hover:underline"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Baseline */}
        <div className="mt-20 flex flex-col-reverse items-start justify-between gap-4 border-t border-[color:var(--color-rule)] pt-6 text-[0.58rem] uppercase tracking-[0.1em] text-[color:var(--color-charcoal-soft)] sm:text-[0.72rem] sm:tracking-[0.18em] md:flex-row md:items-center">
          <span className="whitespace-nowrap">
            © {new Date().getFullYear()} Quint Home · Create Your Sanctuary
          </span>
          <span className="whitespace-nowrap">
            Rusera Lifestyle
          </span>
        </div>
      </div>
    </footer>
  );
}
