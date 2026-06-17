import { FadeUp } from "@/components/motion/fade-up";

// Per the brief: "smart home integrated — Apple Home, Amazon Alexa, Google Home".
const integrations = ["Apple Home", "Amazon Alexa", "Google Home"];

export function SmartHome() {
  return (
    <section className="relative overflow-hidden bg-[color:var(--color-verdant)] py-[var(--spacing-section)] text-[color:var(--color-stardust)]">
      {/* Atmospheric radial bloom — soft sage light */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(119,145,141,0.30) 0%, rgba(41,51,41,0) 55%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
        style={{
          background:
            "linear-gradient(180deg, rgba(41,51,41,0) 0%, rgba(0,0,0,0.45) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[var(--container-content)] px-6 text-center md:px-10">
        <FadeUp>
          <div className="mx-auto flex items-center justify-center gap-4 text-[0.6rem] uppercase tracking-[0.42em] text-[color:var(--color-stardust)]/65">
            <span className="h-px w-12 bg-[color:var(--color-stardust)]/25" />
            <span>§ Five · Controls</span>
            <span className="h-px w-12 bg-[color:var(--color-stardust)]/25" />
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <h2
            className="mx-auto mt-12 max-w-[22ch] text-balance"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "var(--text-4xl)",
              lineHeight: 1.04,
              letterSpacing: "-0.022em",
              fontWeight: 400,
              color: "var(--color-stardust)",
            }}
          >
            Run it from your phone.
            <br />
            <em className="not-italic text-[color:var(--color-aerial-soft)]">
              Or just press the button.
            </em>
          </h2>
        </FadeUp>

        <FadeUp delay={0.2}>
          <p
            className="mx-auto mt-10 max-w-[54ch] text-[var(--text-base)] leading-[1.85]"
            style={{ color: "rgba(238, 228, 216, 0.92)" }}
          >
            Set a schedule in the app, or control it from Apple Home, Alexa, or
            Google Home. There are physical controls on the diffuser too, so you
            never need your phone to turn it on. No reeds to replace, no candles
            to forget about.
          </p>
        </FadeUp>

        <FadeUp delay={0.3}>
          <div className="mt-20 border-t border-[color:var(--color-stardust)]/15 pt-12">
            <p className="mx-auto text-center text-[0.6rem] uppercase tracking-[0.42em] text-[color:var(--color-stardust)]/50">
              Works with
            </p>
            <div className="mx-auto mt-8 grid max-w-[40rem] grid-cols-3 gap-6">
              {integrations.map((name) => (
                <div key={name} className="flex items-center justify-center">
                  <span className="text-[0.86rem] uppercase tracking-[0.18em] text-[color:var(--color-stardust)]/90">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
