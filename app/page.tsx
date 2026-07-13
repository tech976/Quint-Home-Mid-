import { Hero } from "@/components/sections/hero";
import { DiffuserShowcase } from "@/components/sections/diffuser-showcase";
import { ScentLibrary } from "@/components/sections/scent-library";
// Temporarily hidden — re-enable with the <ReedCandles /> usage below.
// import { ReedCandles } from "@/components/sections/reed-candles";
import { HowToUse } from "@/components/sections/how-to-use";
import { Atmosphere } from "@/components/sections/atmosphere";
import { SmartHome } from "@/components/sections/smart-home";
import { USPs } from "@/components/sections/usps";
import { FounderTeaser } from "@/components/sections/founder-teaser";
import { JournalTeaser } from "@/components/sections/journal-teaser";
import { MonogramDivider } from "@/components/brand/monogram-divider";

export default function Home() {
  return (
    <>
      <Hero />
      {/* Minimal white breathing space between the hero and the section below */}
      <div
        aria-hidden
        className="h-[clamp(1.25rem,3vh,2.25rem)] bg-[color:var(--color-white)]"
      />
      {/* ── Below-hero section · isolated / swappable ──────────────────────
          Kept as its own standalone component (components/sections/smart-home.tsx)
          so it can be redesigned or replaced later without touching the rest of
          the page. Currently coloured in a Stardust Veil variant. */}
      <SmartHome />
      {/* ──────────────────────────────────────────────────────────────── */}
      <USPs />
      <DiffuserShowcase />
      <ScentLibrary />
      {/* "Coming soon to the range" (Reed Diffusers & Candles) — temporarily
          hidden. Re-enable after the next update by uncommenting this line. */}
      {/* <ReedCandles /> */}
      <HowToUse />
      <MonogramDivider className="py-[var(--spacing-section-sm)]" />
      <FounderTeaser />
      <Atmosphere />
      <JournalTeaser />
    </>
  );
}
