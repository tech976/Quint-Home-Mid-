import Link from "next/link";
import type { Metadata } from "next";
import { FadeUp } from "@/components/motion/fade-up";
import { Monogram } from "@/components/brand/logo";

export const metadata: Metadata = {
  title: "Payment not completed",
  robots: { index: false, follow: false },
};

/** Plain-language explanations; the raw reason is never shown to the customer. */
const REASONS: Record<string, string> = {
  declined:
    "Your bank did not complete the payment. Nothing has been charged — your bag is still saved.",
  verification:
    "We could not verify the payment response. If money has left your account, contact us and we will resolve it straight away.",
  unconfirmed:
    "The payment could not be confirmed with PayU. If money has left your account, contact us and we will resolve it straight away.",
  amount:
    "The amount paid did not match your bag total, so we have not placed the order. Please contact us before trying again.",
};

export default async function OrderFailedPage({
  searchParams,
}: {
  searchParams: Promise<{ reason?: string }>;
}) {
  const { reason } = await searchParams;
  const message =
    (reason && REASONS[reason]) ??
    "The payment was not completed. Nothing has been charged — your bag is still saved.";

  return (
    <div className="mx-auto flex max-w-[var(--container-content)] flex-col items-center px-6 py-[var(--spacing-section)] text-center md:px-10">
      <FadeUp>
        <p className="font-eyebrow">
          <Monogram className="mr-1.5 inline-block h-[0.9em] w-[0.9em] align-[-0.12em]" />
          Payment
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
          That didn&rsquo;t go{" "}
          <em className="text-[color:var(--color-clay)]">through.</em>
        </h1>

        <p className="mx-auto mt-8 max-w-[46ch] text-[var(--text-base)] leading-[1.8] text-[color:var(--color-charcoal-soft)]">
          {message}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          <Link
            href="/checkout"
            className="group inline-flex items-center gap-3 bg-[color:var(--color-charcoal)] px-8 py-4 text-[0.74rem] uppercase tracking-[0.32em] text-[color:var(--color-ivory)] transition-colors duration-500 hover:bg-[color:var(--color-clay-deep)]"
          >
            Try again
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
