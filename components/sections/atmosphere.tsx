import { FadeUp } from "@/components/motion/fade-up";
import { Monogram } from "@/components/brand/logo";
import { EditorialCarousel, type Slide } from "@/components/ui/editorial-carousel";

/**
 * A drag-scroll moodboard – what the brand looks like at the edges of vision.
 * Uses the brand vibe library as a curated visual library.
 */
const slides: Slide[] = [
  { src: "/images/vibe/vibe-01.webp", alt: "Soft morning light through a curtain", eyebrow: "Morning", caption: "Early light through a curtain." },
  { src: "/images/vibe/vibe-14.webp", alt: "A hillside at sunset", eyebrow: "Last Light", caption: "A hillside just before sunset." },
  { src: "/images/vibe/vibe-17.webp", alt: "Sun through a canopy of trees", eyebrow: "Daybreak", caption: "Sun coming through the trees." },
  { src: "/images/vibe/vibe-16.webp", alt: "Late sun scattered across water", eyebrow: "Surface", caption: "Afternoon sun on the water." },
  { src: "/images/vibe/vibe-20.webp", alt: "A figure running through a golden field", eyebrow: "Golden Hour", caption: "Running through a field at golden hour." },
  { src: "/images/vibe/vibe-22.webp", alt: "A lone figure on a grassy headland above the sea at dusk", eyebrow: "The Coast", caption: "Alone on a headland at dusk." },
  { src: "/images/vibe/vibe-09.webp", alt: "A concrete room opened to a forest", eyebrow: "Sanctuary", caption: "A room opened to the trees." },
  { src: "/images/vibe/vibe-21.webp", alt: "A still, quiet room", eyebrow: "Stillness", caption: "A still, quiet room." },
];

export function Atmosphere() {
  return (
    <section className="bg-[color:var(--color-white)] py-[var(--spacing-section)]">
      <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
        <FadeUp>
          <div className="mb-12 flex flex-col gap-6 border-b border-[color:var(--color-rule)] pb-6 md:mb-16 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[0.72rem] md:text-[0.95rem] uppercase tracking-[0.16em] md:tracking-[0.22em] text-[color:var(--color-charcoal-soft)]">
                <Monogram className="mr-1.5 inline-block h-[0.9em] w-[0.9em] align-[-0.12em]" />Four · Atmosphere
              </p>
              <h2
                className="mt-5 max-w-[18ch] text-balance"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "var(--text-3xl)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.016em",
                  fontWeight: 400,
                }}
              >
                The moods we kept{" "}
                <em className="text-[color:var(--color-aerial-deep)]">
                  coming back to.
                </em>
              </h2>
            </div>
            <p className="max-w-[32ch] text-[0.88rem] leading-[1.65] text-[color:var(--color-charcoal-soft)] md:text-right">
              The references behind the brand: light, texture, and a few quiet
              rooms.
              <br />
              <span className="text-[0.62rem] uppercase tracking-[0.32em]">
                Drag to browse →
              </span>
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.08}>
          <EditorialCarousel
            slides={slides}
            slideWidth={360}
            slideWidthMobile={280}
            withPlateNumbers={false}
          />
        </FadeUp>
      </div>
    </section>
  );
}
