import Image from "next/image";
import { FadeUp } from "@/components/motion/fade-up";

type Moment = {
  no: string;
  time: string;
  room: string;
  scent: string;
  image: string;
  alt: string;
  grid: string;
  aspect: string;
  sizes: string;
};

const moments: Moment[] = [
  {
    no: "01",
    time: "06:42",
    room: "Hallway",
    scent: "First Light — bergamot, green tea, white pepper.",
    image: "/images/vibe/vibe-12.webp",
    alt: "A bright living room catching the first morning light.",
    grid: "md:col-span-1 md:row-span-2",
    aspect: "aspect-[3/4] md:aspect-[3/5]",
    sizes: "(min-width: 1024px) 28vw, (min-width: 768px) 33vw, 100vw",
  },
  {
    no: "02",
    time: "10:15",
    room: "Study",
    scent: "Clarity — vetiver, linen, a pale citrus.",
    image: "/images/vibe/vibe-14.webp",
    alt: "Linen and morning shadow falling across a quiet workspace.",
    grid: "md:col-span-2",
    aspect: "aspect-[16/10] md:aspect-[3/2]",
    sizes: "(min-width: 1024px) 56vw, (min-width: 768px) 66vw, 100vw",
  },
  {
    no: "03",
    time: "13:30",
    room: "Drawing Room",
    scent: "Afternoon Stillness — neroli, jasmine sambac.",
    image: "/images/vibe/vibe-11.webp",
    alt: "A drawing room held in afternoon stillness.",
    grid: "md:col-span-1",
    aspect: "aspect-square",
    sizes: "(min-width: 1024px) 28vw, (min-width: 768px) 33vw, 100vw",
  },
  {
    no: "04",
    time: "17:48",
    room: "Threshold",
    scent: "Golden Hour — saffron, dried fig, amber.",
    image: "/images/vibe/vibe-05.webp",
    alt: "Wildflowers and warm light at golden hour.",
    grid: "md:col-span-1",
    aspect: "aspect-square",
    sizes: "(min-width: 1024px) 28vw, (min-width: 768px) 33vw, 100vw",
  },
  {
    no: "05",
    time: "20:12",
    room: "Living Room",
    scent: "The Hour of Wood — oud, tobacco leaf, cashmere.",
    image: "/images/vibe/vibe-18.webp",
    alt: "A warm, lamp-lit evening interior.",
    grid: "md:col-span-2",
    aspect: "aspect-[16/10] md:aspect-[3/2]",
    sizes: "(min-width: 1024px) 56vw, (min-width: 768px) 66vw, 100vw",
  },
  {
    no: "06",
    time: "22:50",
    room: "Bedroom",
    scent: "Night Incense — sandalwood, frankincense, myrrh.",
    image: "/images/vibe/vibe-15.webp",
    alt: "Incense smoke moving through a temple-quiet room.",
    grid: "md:col-span-1",
    aspect: "aspect-[3/4]",
    sizes: "(min-width: 1024px) 28vw, (min-width: 768px) 33vw, 100vw",
  },
];

const partners = ["Apple Home", "Google Home", "Alexa", "Matter"];

export function Ritual() {
  return (
    <section className="bg-[color:var(--color-white)] py-[var(--spacing-section)]">
      <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
        {/* Section header */}
        <FadeUp>
          <header className="grid gap-10 border-b border-[color:var(--color-rule)] pb-10 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 text-[0.6rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)]">
                <span>The Ritual</span>
                <span className="block h-px w-8 bg-[color:var(--color-rule)]" />
              </div>
            </div>

            <h2
              className="md:col-span-7"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "var(--text-5xl)",
                lineHeight: 1.05,
                letterSpacing: "-0.018em",
                fontWeight: 400,
                color: "var(--color-charcoal)",
              }}
            >
              Set the schedule once.
              <br />
              <em className="text-[color:var(--color-aerial-deep)]">
                Come home to it forever.
              </em>
            </h2>

            <div className="md:col-span-3 md:text-right">
              <p className="text-[0.7rem] uppercase tracking-[0.28em] text-[color:var(--color-charcoal-soft)]">
                A single day, in six exhalations.
              </p>
              <p className="mt-3 text-[var(--text-base)] leading-[1.75] text-[color:var(--color-charcoal-soft)]">
                Mumbai · IST
                <br />
                Sunrise 06:14 · Sunset 19:02
              </p>
            </div>
          </header>
        </FadeUp>

        {/* The timeline grid — 6 moments, asymmetric */}
        <div className="mt-16 grid gap-6 md:grid-cols-3 md:gap-x-8 md:gap-y-10 lg:gap-x-12">
          {moments.map((m, i) => (
            <FadeUp key={m.no} delay={i * 0.08} className={m.grid}>
              <figure className="grid gap-4">
                <div
                  className={`relative overflow-hidden bg-[color:var(--color-aerial-soft)] ${m.aspect}`}
                >
                  <Image
                    src={m.image}
                    alt={m.alt}
                    fill
                    sizes={m.sizes}
                    className="object-cover transition-transform duration-[1800ms] ease-[var(--ease-quint)] hover:scale-[1.02]"
                  />
                  <div className="absolute left-5 top-5 flex items-center gap-3 text-[0.6rem] uppercase tracking-[0.32em] text-[color:var(--color-stardust)]/85">
                    <span>{m.no}</span>
                    <span className="block h-px w-8 bg-[color:var(--color-white)]/40" />
                    <span>{m.time} IST</span>
                  </div>
                </div>

                <figcaption className="grid gap-2">
                  <div className="flex items-baseline justify-between gap-4 border-b border-[color:var(--color-rule)] pb-2">
                    <span
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "var(--text-xl)",
                        lineHeight: 1.1,
                        letterSpacing: "-0.005em",
                        fontWeight: 400,
                        color: "var(--color-charcoal)",
                      }}
                    >
                      {m.time}
                    </span>
                    <span className="text-[0.65rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)]">
                      {m.room}
                    </span>
                  </div>
                  <p className="text-[var(--text-base)] leading-[1.7] text-[color:var(--color-charcoal-soft)]">
                    {m.scent}
                  </p>
                </figcaption>
              </figure>
            </FadeUp>
          ))}
        </div>

        {/* Footer — supporting paragraph + smart-home line */}
        <FadeUp delay={0.1}>
          <footer className="mt-20 grid gap-10 border-t border-[color:var(--color-rule)] pt-10 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-2">
              <span className="text-[0.6rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)]">
                Set once, via the app
              </span>
            </div>

            <p
              className="md:col-span-7"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "var(--text-2xl)",
                lineHeight: 1.45,
                letterSpacing: "-0.005em",
                fontWeight: 400,
                color: "var(--color-charcoal)",
              }}
            >
              Six moments, six scents, one quiet schedule.{" "}
              <em className="text-[color:var(--color-aerial-deep)]">
                The room remembers, so the owner doesn&rsquo;t have to.
              </em>{" "}
              No daily interaction. No swapping reeds. The diffuser breathes on
              cue, in step with the light.
            </p>

            <div className="md:col-span-3 md:text-right">
              <p className="text-[0.6rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)]">
                Works with
              </p>
              <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 md:justify-end">
                {partners.map((p) => (
                  <li
                    key={p}
                    className="text-[0.75rem] tracking-[0.04em] text-[color:var(--color-charcoal)]"
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </footer>
        </FadeUp>
      </div>
    </section>
  );
}
