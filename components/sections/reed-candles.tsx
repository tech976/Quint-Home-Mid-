import { FadeUp } from "@/components/motion/fade-up";
import { HCarousel } from "@/components/ui/h-carousel";
import { Monogram } from "@/components/brand/logo";

/**
 * Reed Diffusers & Candles – a future category. Placeholder carousel that
 * matches the product card design; swap in real products + images later.
 */
const items = ["Reed Diffuser", "Reed Diffuser", "Candle", "Candle"];

export function ReedCandles() {
  return (
    <section className="bg-[color:var(--color-white)] py-[var(--spacing-section)]">
      <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
        <FadeUp>
          <div className="mb-14 flex flex-col gap-6 border-b border-[color:var(--color-rule)] pb-6 md:mb-20 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[0.72rem] md:text-[0.95rem] uppercase tracking-[0.16em] md:tracking-[0.22em] text-[color:var(--color-charcoal-soft)]">
                Reed Diffusers &amp; Candles
              </p>
              <h2
                className="mt-5 max-w-[20ch] text-balance"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "var(--text-4xl)",
                  lineHeight: 1.04,
                  letterSpacing: "-0.02em",
                  fontWeight: 400,
                }}
              >
                Coming soon{" "}
                <em className="text-[color:var(--color-aerial-deep)]">
                  to the range.
                </em>
              </h2>
            </div>
            <p className="max-w-[32ch] text-[0.92rem] leading-[1.65] text-[color:var(--color-charcoal-soft)] md:text-right">
              The next scenting objects, in development. Images and details to
              follow.
            </p>
          </div>
        </FadeUp>

        <FadeUp>
          <HCarousel ariaLabel="Reed diffusers and candles" arrowTop="top-[34%]">
            {items.map((name, i) => (
              <div
                key={i}
                className="w-[80%] shrink-0 snap-start sm:w-[19rem] lg:w-[21rem]"
              >
                <div className="relative flex aspect-[8/9] items-center justify-center overflow-hidden border border-[color:var(--color-rule)] bg-[color:var(--color-stardust-soft)]">
                  <Monogram className="h-10 w-10 text-[color:var(--color-aerial)]/40" />
                </div>
                <div className="mt-7 grid gap-3">
                  <div className="flex items-baseline justify-between border-b border-[color:var(--color-rule)] pb-3">
                    <h3
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "var(--text-2xl)",
                        lineHeight: 1.05,
                        letterSpacing: "-0.014em",
                        fontWeight: 400,
                      }}
                    >
                      {name}
                    </h3>
                    <span className="text-[0.58rem] uppercase tracking-[0.28em] text-[color:var(--color-charcoal-soft)]">
                      Coming soon
                    </span>
                  </div>
                  <p className="text-[0.92rem] leading-[1.65] text-[color:var(--color-charcoal-soft)]">
                    In development – joining the Quint Home range.
                  </p>
                </div>
              </div>
            ))}
          </HCarousel>
        </FadeUp>
      </div>
    </section>
  );
}
