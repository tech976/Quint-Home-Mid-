import Image from "next/image";
import { FadeUp } from "@/components/motion/fade-up";
import { SectionHeader } from "@/components/ui/section-header";

/**
 * How it works – the five-step ritual from the brief's "How to Use –
 * Electronic Diffuser". Each step shows its image with the text below.
 */
const steps: {
  n: string;
  title: string;
  body: string;
  img: string;
  /** Full-bleed lifestyle photo (object-cover) vs a floating cutout / app screen. */
  photo?: boolean;
  /** Fine-tunes how large the product sits in its tile (1 = untouched). */
  scale?: number;
}[] = [
  {
    n: "01",
    title: "Fill the reservoir",
    body: "Add your chosen Quint Home fragrance oil. No water, no dilution – just the oil.",
    img: "/images/ritual/fill-the-reservoir-v2.webp",
    // object-cover scales the 4:5 shot to fill the 8/9 tile (~11% larger than
    // object-contain); the product sits well inside the 5% top/bottom crop.
    photo: true,
  },
  {
    n: "02",
    title: "Connect the app",
    body: "Pair the diffuser with the companion app once. Physical controls sit on the device too.",
    img: "/images/ritual/connect-the-app.webp",
  },
  {
    n: "03",
    title: "Set your schedule",
    body: "Pick when it runs each day and how strong, in the app.",
    img: "/images/ritual/set-your-schedule.webp",
  },
  {
    n: "04",
    title: "It runs itself",
    body: "The diffuser follows your schedule automatically. No daily interaction required.",
    img: "/images/ritual/it-runs-itself-v2.webp",
    photo: true,
    scale: 0.8,
  },
  {
    n: "05",
    title: "Refill & swap",
    body: "Top up the oil as needed; change scents by season or mood through the app.",
    img: "/images/ritual/refill-swap-v2.webp",
    photo: true,
    scale: 1.1,
  },
];

export function HowToUse() {
  return (
    <section className="bg-[color:var(--color-white)] py-[var(--spacing-section)]">
      <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
        <SectionHeader
          chapter="The Ritual"
          chapterTitle="How it works"
          headline={
            <>
              Set it once,
              <br />
              <em className="not-italic text-[color:var(--color-aerial-deep)]">
                then forget about it.
              </em>
            </>
          }
          meta={
            <>
              Five Steps,
              <br />
              and Quint Home does the rest.
            </>
          }
        />

        <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-5 md:mt-20">
          {steps.map((s, i) => (
            <FadeUp key={s.n} delay={i * 0.06}>
              <div>
                {/* Step image – photo steps fill the tile (object-cover); app
                    screens are transparent cutouts that float (object-contain). */}
                <div
                  className={`relative aspect-[8/9] ${
                    s.photo ? "overflow-hidden" : ""
                  }`}
                >
                  <Image
                    src={s.img}
                    alt={s.title}
                    fill
                    sizes="(min-width: 1024px) 18vw, (min-width: 640px) 45vw, 100vw"
                    className={s.photo ? "object-cover" : "object-contain"}
                    style={s.scale ? { transform: `scale(${s.scale})` } : undefined}
                  />
                </div>
                {/* Text below */}
                <div className="mt-5 border-t border-[color:var(--color-charcoal)] pt-5">
                  <span
                    className="block tabular-nums text-[color:var(--color-aerial-deep)]"
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "var(--text-2xl)",
                      lineHeight: 1,
                      fontWeight: 400,
                    }}
                  >
                    {s.n}
                  </span>
                  <h3
                    className="mt-4"
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "var(--text-xl)",
                      lineHeight: 1.1,
                      letterSpacing: "-0.012em",
                      fontWeight: 400,
                    }}
                  >
                    {s.title}
                  </h3>
                  <p className="mt-3 text-[0.9rem] leading-[1.65] text-[color:var(--color-charcoal-soft)]">
                    {s.body}
                  </p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp>
          <p className="mt-12 max-w-[60ch] text-[0.72rem] leading-[1.6] text-[color:var(--color-charcoal-soft)] md:mt-16">
            App screens shown are representative only and may differ from the
            actual Quint Home companion app.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
