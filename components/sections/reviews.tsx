import { FadeUp } from "@/components/motion/fade-up";
import { reviews, reviewAverage } from "@/lib/data/reviews";

function Stars({ rating }: { rating: number }) {
  return (
    <div
      className="flex gap-0.5 text-[0.72rem] text-[color:var(--color-clay)]"
      aria-label={`${rating} out of 5`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < rating ? "opacity-100" : "opacity-20"}>
          ★
        </span>
      ))}
    </div>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function Reviews() {
  return (
    <section className="bg-[color:var(--color-stardust-soft)] py-[var(--spacing-section)]">
      <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
        {/* Header — title + a prominent rating block */}
        <FadeUp>
          <div className="flex flex-col gap-8 border-b border-[color:var(--color-rule)] pb-10 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
                § Word of Mouth
              </p>
              <h2
                className="mt-5 max-w-[18ch] text-balance"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "var(--text-4xl)",
                  lineHeight: 1.04,
                  letterSpacing: "-0.02em",
                  fontWeight: 400,
                }}
              >
                What people keep{" "}
                <em className="text-[color:var(--color-aerial-deep)]">
                  telling us.
                </em>
              </h2>
            </div>

            <div className="flex items-center gap-5">
              <span
                className="text-[color:var(--color-clay)]"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "var(--text-5xl)",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}
              >
                {reviewAverage.toFixed(1)}
              </span>
              <div className="flex flex-col gap-1.5">
                <Stars rating={5} />
                <span className="text-[0.58rem] uppercase tracking-[0.28em] text-[color:var(--color-charcoal-soft)]">
                  {reviews.length} reviews · across India
                </span>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* Review cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <FadeUp key={r.name} delay={(i % 3) * 0.06}>
              <figure className="flex h-full flex-col border border-[color:var(--color-rule)] bg-[color:var(--color-white)] p-7 transition-shadow duration-500 hover:shadow-[0_24px_60px_-36px_rgba(58,53,50,0.4)] md:p-8">
                <Stars rating={r.rating} />
                <blockquote
                  className="mt-5 flex-1 text-balance text-[color:var(--color-charcoal)]"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "var(--text-lg)",
                    lineHeight: 1.45,
                    letterSpacing: "-0.008em",
                  }}
                >
                  &ldquo;{r.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-3 border-t border-[color:var(--color-rule)] pt-5">
                  <span
                    aria-hidden="true"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[color:var(--color-aerial-deep)] text-[0.6rem] font-[family-name:var(--font-sans)] tracking-[0.04em] text-[color:var(--color-stardust)]"
                  >
                    {initials(r.name)}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[0.92rem] text-[color:var(--color-charcoal)]">
                      {r.name}
                    </span>
                    <span className="mt-0.5 flex flex-wrap items-center gap-x-2 text-[0.56rem] uppercase tracking-[0.24em] text-[color:var(--color-charcoal-soft)]">
                      <span>{r.city}</span>
                      <span className="opacity-50">·</span>
                      <span>{r.product}</span>
                    </span>
                  </span>
                </figcaption>
              </figure>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
