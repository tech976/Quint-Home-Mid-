import Image from "next/image";
import { FadeUp } from "@/components/motion/fade-up";
import { Monogram } from "@/components/brand/logo";

/**
 * USPs – the brand's selling points, from the brief. Editorial overlay cards:
 * the number and title sit over each photograph. Masonry on mobile (photos
 * shown in full, never cropped), a uniform row on larger screens.
 */
type Usp = {
  n: string;
  lead: string;
  image: string;
  /** Native pixel dimensions – lets mobile show the photo un-cropped. */
  w: number;
  h: number;
};

const usps: Usp[] = [
  {
    n: "01",
    lead: "Waterless cold-air nebulisation",
    image: "/images/usp/usp-1.webp",
    w: 1400,
    h: 737,
  },
  {
    n: "02",
    lead: "App-controllable",
    image: "/images/usp/usp-2.webp",
    w: 1400,
    h: 722,
  },
  {
    n: "03",
    lead: "Wireless and rechargeable",
    image: "/images/usp/usp-5.webp",
    w: 1400,
    h: 1109,
  },
  {
    n: "04",
    lead: "A decor object, not an appliance",
    image: "/images/usp/usp-4.webp",
    w: 1400,
    h: 934,
  },
  {
    n: "05",
    lead: "Luxury hotel-inspired scents, for home",
    image: "/images/usp/usp-3.webp",
    w: 1400,
    h: 934,
  },
];

export function USPs() {
  return (
    <section className="border-y border-[color:var(--color-rule)] bg-[color:var(--color-stardust-soft)] py-[var(--spacing-section-sm)]">
      <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
        {/* Header */}
        <FadeUp>
          <div className="mb-8 flex flex-col gap-3 md:mb-10 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="flex items-center gap-3 text-[0.72rem] md:text-[0.95rem] uppercase tracking-[0.16em] md:tracking-[0.22em] text-[color:var(--color-charcoal-soft)]">
                <Monogram className="h-4 w-4 shrink-0" />
                Why Quint
              </p>
              <h2
                className="mt-4 max-w-[18ch] text-balance"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "var(--text-3xl)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                  fontWeight: 400,
                }}
              >
                Five things that{" "}
                <em className="not-italic text-[color:var(--color-aerial-deep)]">
                  set us apart.
                </em>
              </h2>
            </div>
            <p className="max-w-[26ch] text-[0.86rem] leading-[1.6] text-[color:var(--color-charcoal-soft)] md:text-right">
              Innovation, design and fragrance, in one object.
            </p>
          </div>
        </FadeUp>

        {/* Cards – swipeable 3:2 carousel with peek on mobile, a 5-up row on desktop.
            One FadeUp around the whole track so cards don't re-animate while swiping. */}
        <FadeUp>
        <div className="-mx-6 flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain px-6 pb-1 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-5 md:gap-4 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden">
          {usps.map((u) => (
            <div
              key={u.n}
              className="w-[80%] shrink-0 snap-start sm:w-[47%] md:h-[100%] md:w-auto md:shrink"
            >
              <article className="group flex h-[100%] flex-col overflow-hidden border border-[color:var(--color-rule)] bg-[color:var(--color-white)] transition-shadow duration-500 hover:shadow-[0_24px_50px_-30px_rgba(58,53,50,0.45)]">
                <div className="relative aspect-[3/2] overflow-hidden bg-[color:var(--color-stardust-soft)]">
                  <Image
                    src={u.image}
                    alt={u.lead}
                    fill
                    sizes="(min-width: 1024px) 18vw, (min-width: 768px) 30vw, 80vw"
                    className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-quint)] group-hover:scale-[1.05]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-4 md:p-5">
                  <span className="text-[0.6rem] tabular-nums tracking-[0.2em] text-[color:var(--color-clay)]">
                    {u.n}
                  </span>
                  <h3
                    className="mt-2 text-balance"
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.05rem",
                      lineHeight: 1.18,
                      letterSpacing: "-0.012em",
                      fontWeight: 400,
                    }}
                  >
                    {u.lead}
                  </h3>
                </div>
              </article>
            </div>
          ))}
        </div>
        </FadeUp>

        {/* Swipe hint – mobile only */}
        <p className="mt-4 text-[0.58rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)] md:hidden">
          Swipe to explore →
        </p>
      </div>
    </section>
  );
}
