import Link from "next/link";
import Image from "next/image";
import { FadeUp } from "@/components/motion/fade-up";
import { SectionHeader } from "@/components/ui/section-header";

const cards = [
  {
    no: "01",
    eyebrow: "The Object",
    title: "Diffusers",
    description:
      "Sculpted, silent, waterless. Designed to live on a shelf with the same presence as a piece of pottery.",
    href: "/shop?category=diffusers",
    image: "/images/diffusers/diffuser-04.png",
    count: "Four models",
    background: "bg-[color:var(--color-stardust-soft)]",
  },
  {
    no: "02",
    eyebrow: "The Library",
    title: "Fragrance Oils",
    description:
      "Eight compositions, blended like fine perfumery. 70–90% concentrate, IFRA-compliant, read top, heart and base.",
    href: "/shop?category=oils",
    image: "/images/vibe/vibe-09.webp",
    count: "Eight scents",
    background: "bg-[color:var(--color-aerial)]",
  },
];

export function CategoryDuo() {
  return (
    <section className="bg-[color:var(--color-white)] pb-[var(--spacing-section)]">
      <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
        <SectionHeader
          chapter="§ One"
          chapterTitle="The Range"
          headline={
            <>
              Two objects.
              <br />
              <em className="not-italic text-[color:var(--color-aerial-deep)]">One ritual.</em>
            </>
          }
          meta={
            <>
              The device is hardware.
              <br />
              The oil is the script.
              <br />
              Together, the room performs.
            </>
          }
        />

        <div className="mt-16 grid gap-y-14 md:grid-cols-12 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
          {cards.map((c, i) => (
            <FadeUp
              key={c.href}
              delay={i * 0.1}
              className={`md:col-span-6 ${i === 1 ? "md:mt-16" : ""}`}
            >
              <Link href={c.href} className="group block">
                <div className={`relative aspect-[5/6] overflow-hidden ${c.background}`}>
                  <Image
                    src={c.image}
                    alt={c.title}
                    fill
                    sizes="(min-width: 768px) 45vw, 100vw"
                    className="object-cover transition-transform duration-[1600ms] ease-[var(--ease-quint)] group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-x-0 top-0 flex items-start justify-between p-6 md:p-8">
                    <span className="text-[0.62rem] uppercase tracking-[0.32em] text-[color:var(--color-stardust)]/85">
                      {c.no}
                    </span>
                    <span className="text-[0.62rem] uppercase tracking-[0.32em] text-[color:var(--color-stardust)]/85">
                      {c.count}
                    </span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 md:p-8">
                    <span className="text-[0.62rem] uppercase tracking-[0.32em] text-[color:var(--color-stardust)]/85">
                      {c.eyebrow}
                    </span>
                    <span className="text-[0.62rem] uppercase tracking-[0.32em] text-[color:var(--color-stardust)] transition-transform duration-500 group-hover:-translate-y-0.5">
                      Explore →
                    </span>
                  </div>
                </div>

                <div className="mt-8 grid gap-3">
                  <h3
                    className="transition-colors duration-500 group-hover:text-[color:var(--color-clay)]"
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "var(--text-3xl)",
                      lineHeight: 1.05,
                      letterSpacing: "-0.018em",
                      fontWeight: 400,
                    }}
                  >
                    {c.title}
                  </h3>
                  <p className="max-w-[40ch] text-[var(--text-base)] leading-[1.7] text-[color:var(--color-charcoal-soft)]">
                    {c.description}
                  </p>
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
