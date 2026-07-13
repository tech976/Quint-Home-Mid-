import Image from "next/image";
import Link from "next/link";
import { FadeUp } from "@/components/motion/fade-up";

export function FounderTeaser() {
  return (
    <section className="bg-[color:var(--color-white)] py-[var(--spacing-section)]">
      <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
        <div className="grid items-start gap-12 md:grid-cols-12 md:gap-16">
          {/* Image collage – two stacked images that together match text column height */}
          <FadeUp className="md:col-span-6">
            <div className="grid grid-cols-2 gap-4 md:gap-5">
              <figure className="col-span-2">
                <div className="relative aspect-[16/10] overflow-hidden bg-[color:var(--color-aerial-soft)]">
                  <Image
                    src="/images/vibe/vibe-07.webp"
                    alt="A palace corridor at golden hour"
                    fill
                    sizes="(min-width: 768px) 48vw, 100vw"
                    className="object-cover"
                    style={{ objectPosition: "center 30%" }}
                  />
                  <div className="absolute left-5 top-5 text-[0.6rem] uppercase tracking-[0.36em] text-[color:var(--color-stardust)]">
                    Udaipur, 2023
                  </div>
                </div>
              </figure>
              <figure>
                <div className="relative aspect-[8/9] overflow-hidden bg-[color:var(--color-aerial-soft)]">
                  <Image
                    src="/images/vibe/vibe-11.webp"
                    alt="A drawing room, considered"
                    fill
                    sizes="(min-width: 768px) 24vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </figure>
              <figure>
                <div className="relative aspect-[8/9] overflow-hidden bg-[color:var(--color-aerial-soft)]">
                  <Image
                    src="/images/vibe/vibe-19.webp"
                    alt="Afternoon light across a warm wall"
                    fill
                    sizes="(min-width: 768px) 24vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </figure>
            </div>
          </FadeUp>

          <div className="md:col-span-6 md:pl-2 lg:pl-8">
            <FadeUp>
              <p className="text-[0.72rem] md:text-[0.95rem] uppercase tracking-[0.16em] md:tracking-[0.22em] text-[color:var(--color-charcoal-soft)]">
                Founder · A Letter
              </p>
            </FadeUp>

            <FadeUp delay={0.08}>
              <h2
                className="mt-6 text-balance"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "var(--text-3xl)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.016em",
                  fontWeight: 400,
                }}
              >
                It started in Udaipur.
              </h2>
            </FadeUp>

            <FadeUp delay={0.16}>
              <div className="mt-8 space-y-5 text-[var(--text-base)] leading-[1.85] text-[color:var(--color-charcoal-soft)]">
                <p className="max-w-[52ch] [&::first-letter]:float-left [&::first-letter]:mr-2 [&::first-letter]:font-[family-name:var(--font-serif)] [&::first-letter]:text-[3.2rem] [&::first-letter]:font-normal [&::first-letter]:leading-[0.9] [&::first-letter]:text-[color:var(--color-charcoal)]">
                  Three years ago, I checked into one of India&rsquo;s most
                  celebrated hotels in Udaipur. I expected beauty – the
                  architecture, the lake, the service. What I didn&rsquo;t
                  expect was to stop in the corridor and simply stand there,
                  trying to understand what I was breathing.
                </p>
                <p className="max-w-[52ch]">
                  The fragrance was everywhere and nowhere. It wasn&rsquo;t a
                  candle. It wasn&rsquo;t a spray. It was woven into the air of
                  the entire palace – warm, unhurried, completely unlike
                  anything I had ever smelled in someone&rsquo;s home. I asked
                  the staff. They smiled politely. The scent, they explained,
                  was proprietary. I went home and spent weeks trying to source
                  it anyway. I couldn&rsquo;t.
                </p>
                <p className="max-w-[52ch]">
                  Las Vegas, a year later – a luxury casino hotel on the Strip.
                  A different continent, and I stopped in the lobby the same way.
                  It kept happening: a safari lodge in the Serengeti, warm with
                  baobab wood and wild earth; a beach hotel in Nusa Dua,
                  Balinese frangipani on a sea breeze. Each time I tried to find
                  the scent. Each time: proprietary.
                </p>
                <p className="max-w-[52ch]">
                  Hotels understand something most of us don&rsquo;t. Scent sets
                  the tone before you see anything, before you touch anything. So
                  why do we accept that our homes, where we spend most of our
                  lives, smell like nothing in particular?
                </p>
                <p className="max-w-[52ch] text-[color:var(--color-charcoal)]">
                  Quint Home exists because I couldn&rsquo;t stop thinking about
                  that.
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.24}>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-3 border-b border-[color:var(--color-charcoal)] pb-1.5 text-[0.72rem] uppercase tracking-[0.32em] transition-colors duration-500 hover:text-[color:var(--color-clay)] hover:border-[color:var(--color-clay)]"
                >
                  More on the founder
                  <span className="transition-transform duration-500 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>

              {/* Signature card */}
              <div className="mt-10 flex items-center gap-5 border-t border-[color:var(--color-rule)] pt-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[color:var(--color-rule)] text-[0.65rem] uppercase tracking-[0.18em] text-[color:var(--color-charcoal-soft)]">
                  SR
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontStyle: "italic",
                      fontSize: "0.95rem",
                    }}
                  >
                    Semil Rambhiya
                  </p>
                  <p className="text-[0.62rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)]">
                    Founder, Quint Home
                  </p>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
