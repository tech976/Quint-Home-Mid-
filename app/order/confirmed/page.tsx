import Link from "next/link";
import type { Metadata } from "next";
import { FadeUp } from "@/components/motion/fade-up";
import { Monogram } from "@/components/brand/logo";

export const metadata: Metadata = {
  title: "Order confirmed",
  description: "Thank you — your Quint Home order is confirmed.",
  robots: { index: false, follow: false },
};

export default async function OrderConfirmedPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string; pending?: string }>;
}) {
  const { ref, pending } = await searchParams;
  const stillSettling = pending === "1";

  return (
    <div className="mx-auto flex max-w-[var(--container-content)] flex-col items-center px-6 py-[var(--spacing-section)] text-center md:px-10">
      <FadeUp>
        <p className="font-eyebrow">
          <Monogram className="mr-1.5 inline-block h-[0.9em] w-[0.9em] align-[-0.12em]" />
          Thank you
        </p>
        <h1
          className="mt-7 max-w-[20ch]"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "var(--text-4xl)",
            lineHeight: 1.02,
            letterSpacing: "-0.02em",
            fontWeight: 400,
          }}
        >
          Your payment went{" "}
          <em className="text-[color:var(--color-aerial-deep)]">through.</em>
        </h1>

        {ref && (
          <p className="mt-8 text-[0.72rem] uppercase tracking-[0.28em] text-[color:var(--color-charcoal-soft)]">
            Reference {ref}
          </p>
        )}

        <p className="mx-auto mt-6 max-w-[46ch] text-[var(--text-base)] leading-[1.8] text-[color:var(--color-charcoal-soft)]">
          {stillSettling
            ? "We have your payment and our team is finalising the order by hand. You will receive a confirmation email shortly — if anything looks wrong, quote the reference above and we will sort it immediately."
            : "A confirmation email is on its way, and a tracking link follows once your order ships. Orders are dispatched within 3 business days."}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          <Link
            href="/range"
            className="group inline-flex items-center gap-3 bg-[color:var(--color-charcoal)] px-8 py-4 text-[0.74rem] uppercase tracking-[0.32em] text-[color:var(--color-ivory)] transition-colors duration-500 hover:bg-[color:var(--color-clay-deep)]"
          >
            Continue shopping
            <span className="transition-transform duration-500 group-hover:translate-x-1">
              →
            </span>
          </Link>
          <Link
            href="/contact"
            className="text-[0.72rem] uppercase tracking-[0.28em] text-[color:var(--color-charcoal-soft)] underline-offset-4 transition-colors duration-500 hover:text-[color:var(--color-charcoal)] hover:underline"
          >
            Contact us
          </Link>
        </div>
      </FadeUp>
    </div>
  );
}
