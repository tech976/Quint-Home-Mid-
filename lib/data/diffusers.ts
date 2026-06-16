import type { Diffuser } from "../types";

// ============================================================
//  Quint Home — Diffuser range
//  Source of truth: "Aroma Diffuser Collection — Product
//  Catalogue 2026" (6 models). Specs, key features, taglines and
//  "best for" tags are transcribed VERBATIM from the catalogue,
//  per-model — do not move values between models.
//
//  NOTE ON PRICING: the catalogue carries no prices. priceINR
//  values below are PLACEHOLDERS positioned inside the brief's
//  MRP bands (entry ₹12,999–15,999 · premium ₹18,999–24,999) and
//  must be confirmed before launch.
//
//  IMAGERY: per-product lifestyle photography (5 images each) lives
//  under /images/diffusers/<slug>/. The A326 ships in two finishes,
//  so it carries separate gold + black image sets.
// ============================================================

export const diffusers: Diffuser[] = [
  {
    slug: "plug-in-a815",
    model: "A815",
    name: "The Pebble",
    category: "diffuser",
    tier: "entry",
    tagline: "Scent Your Space. No Setup Required.",
    description:
      "The A815 is the effortless way to fill any room with your favourite essential oil blend. Simply plug it into any wall socket, add a few drops of oil, and let the ultra-quiet mist do the rest. Its compact, rotatable plug fits virtually any outlet orientation — perfect for bathrooms, kitchens, and tight spaces where a larger diffuser just won't fit.\n\nA built-in 24-hour intelligent cyclic timer takes care of the scheduling, so you get consistent fragrance without lifting a finger. No fussing with apps, no mess, no noise.",
    priceINR: 12999,
    bluetooth: false,
    coverageSqFt: [161, 250],
    coverageLabel: "161–250 sq ft",
    bestFor: ["Bathrooms", "Kitchens", "Compact Spaces"],
    keyFeatures: [
      "Plug & Play — no installation or assembly required",
      "Rotatable plug fits any wall socket orientation",
      "Ultra-quiet operation with a delicate, steady mist",
      "24-Hour intelligent cyclic timer for hands-free fragrance",
      "15 ml glass bottle with PP shell — lightweight and durable",
    ],
    image: "/images/diffusers/plug-in-a815/01.png",
    video: "https://res.cloudinary.com/dnv4kq8ml/video/upload/v1780760006/Video_Display_pjm1fk.mp4",
    gallery: [
      "/images/diffusers/plug-in-a815/01.png",
      "/images/diffusers/plug-in-a815/02.png",
      "/images/diffusers/plug-in-a815/03.png",
      "/images/diffusers/plug-in-a815/04.png",
      "/images/diffusers/plug-in-a815/05.png",
    ],
    finish: "PP shell with 15 ml glass bottle",
    height: "160.5 × 44 × 56.5 mm",
    specs: [
      { label: "Bottle Capacity", value: "15 ml" },
      { label: "Voltage / Power", value: "AC 120V ~ 60Hz / 2.5 W" },
      { label: "Material", value: "PP (Shell) + Glass (Bottle)" },
      { label: "Dimensions", value: "160.5 × 44 × 56.5 mm" },
      { label: "Net Weight", value: "135 g" },
      { label: "Oil Consumption", value: "0.055 – 0.173 g/h" },
      { label: "Coverage Area", value: "161 – 250 sq ft" },
      { label: "Timer", value: "24-Hour Intelligent Cyclic" },
    ],
  },
  {
    slug: "tabletop-a326",
    model: "A326",
    name: "The Monolith",
    category: "diffuser",
    tier: "premium",
    tagline: "A premium aluminum column — in brushed gold or matte black.",
    description:
      "The A326 is where function meets design. Standing tall in premium aluminum, this column diffuser brings a refined, considered presence to any space, in brushed gold or matte black. Its large 120 ml bottle keeps fragrance flowing for hours, and the built-in 2200 mAh rechargeable battery means it goes wherever you do, no outlet required.\n\nConnect via Bluetooth to control diffusion intensity and scheduling directly from your phone. Set a schedule and let the A326 run your ambience on autopilot. A leak-proof dumping design ensures spill-free placement, always.",
    priceINR: 19999,
    bluetooth: true,
    coverageSqFt: [108, 1075],
    coverageLabel: "Up to 100 m² (≈1,075 sq ft)",
    bestFor: ["Brand Stores", "Home", "Office", "Hotel"],
    keyFeatures: [
      "Premium aluminum column construction — in brushed gold or matte black",
      "Built-in 2200 mAh rechargeable Li-ion battery — truly wireless",
      "Intuitive touch control panel with ambient mood lighting",
      "Programmable timer for scheduled, automated diffusion",
      "Leak-proof dumping design for safe placement anywhere",
      "Bluetooth connectivity — control from your phone via the companion app",
    ],
    image: "/images/diffusers/a326-gold/01.png",
    gallery: [
      "/images/diffusers/a326-gold/01.png",
      "/images/diffusers/a326-gold/02.png",
      "/images/diffusers/a326-gold/03.png",
      "/images/diffusers/a326-gold/04.png",
      "/images/diffusers/a326-gold/05.png",
    ],
    finish: "Brushed gold aluminum column",
    height: "Ø117.5 × 342 mm",
    colors: [
      {
        name: "Gold",
        swatch: "#B5946A",
        finish: "Brushed gold aluminum column",
        image: "/images/diffusers/a326-gold/01.png",
        gallery: [
          "/images/diffusers/a326-gold/01.png",
          "/images/diffusers/a326-gold/02.png",
          "/images/diffusers/a326-gold/03.png",
          "/images/diffusers/a326-gold/04.png",
          "/images/diffusers/a326-gold/05.png",
        ],
      },
      {
        name: "Black",
        swatch: "#2A2A2A",
        finish: "Matte black aluminum column",
        image: "/images/diffusers/a326-black/01.png",
        gallery: [
          "/images/diffusers/a326-black/01.png",
          "/images/diffusers/a326-black/02.png",
          "/images/diffusers/a326-black/03.png",
          "/images/diffusers/a326-black/04.png",
          "/images/diffusers/a326-black/05.png",
        ],
      },
    ],
    specs: [
      { label: "Bottle Capacity", value: "120 ml" },
      { label: "Voltage / Power", value: "DC 12V / 4 W" },
      { label: "Battery", value: "Built-in 2200 mAh Li-ion" },
      { label: "Material", value: "Aluminum" },
      { label: "Dimensions", value: "Ø117.5 × 342 mm" },
      { label: "Net Weight", value: "1.35 kg" },
      { label: "Oil Consumption", value: "0.05 – 0.72 g/h" },
      { label: "Coverage Area", value: "Up to 100 m² / 300 m³" },
      { label: "Connectivity", value: "Bluetooth" },
    ],
  },
  {
    slug: "tabletop-fabric-a974",
    model: "A974",
    name: "The Loom",
    category: "diffuser",
    tier: "entry",
    tagline: "Soft to the Touch. Warm in Every Sense.",
    description:
      "The A974 reimagines the aroma diffuser with a soft fabric exterior that feels as good as it looks. Where most diffusers are cold and clinical, this one is warm and tactile — designed to sit naturally on a bedside table, salon counter, or living room shelf. The candle-like ambient glow adds a gentle flicker of warmth to evening routines.\n\nPair via Bluetooth for app-based control when you want it, or simply reach for the satisfying knob to dial in intensity the old-fashioned way. Intuitive by design, it fits any space and any lifestyle.",
    priceINR: 15999,
    bluetooth: true,
    coverageSqFt: [108, 590],
    coverageLabel: "Up to 55 m² (≈590 sq ft)",
    bestFor: ["Living Rooms", "Bedrooms", "Salons", "Brand Stores"],
    keyFeatures: [
      "Soft fabric exterior — warm, organic tactile finish",
      "Candle-like ambient light for evening ambience",
      "Simple knob control — no digital interface needed",
      "Leak-proof dumping design for spill-free placement",
      "120 ml capacity for long, uninterrupted diffusion sessions",
      "Bluetooth compatible — app control available alongside the knob",
    ],
    image: "/images/diffusers/fabric-a974/01.png",
    gallery: [
      "/images/diffusers/fabric-a974/01.png",
      "/images/diffusers/fabric-a974/02.png",
      "/images/diffusers/fabric-a974/03.png",
      "/images/diffusers/fabric-a974/04.png",
      "/images/diffusers/fabric-a974/05.png",
    ],
    finish: "PP body with soft fabric exterior",
    height: "Ø103 × 293 mm",
    specs: [
      { label: "Bottle Capacity", value: "120 ml" },
      { label: "Voltage / Power", value: "DC 12V / 6 W" },
      { label: "Material", value: "PP + Fabric" },
      { label: "Dimensions", value: "Ø103 × 293 mm" },
      { label: "Net Weight", value: "660 g" },
      { label: "Oil Consumption", value: "0.11 – 0.72 g/h" },
      { label: "Coverage Area", value: "Up to 55 m² / 165 m³" },
      { label: "Control", value: "Knob" },
      { label: "Connectivity", value: "Bluetooth" },
    ],
  },
  {
    slug: "dual-mist-at302",
    model: "A-T302",
    name: "The Pillar",
    category: "diffuser",
    tier: "premium",
    tagline: "Two Scents. One Space. Infinite Combinations.",
    description:
      "The A-T302 does something no ordinary diffuser can: run two completely independent essential oil blends at once. Each of its dual 60 ml bottles operates separately, so you can diffuse two scents individually or layer them for a custom blend. Near-silent operation at ≤35 dB makes it whisper-quiet enough for a study, bedroom, or yoga session.\n\nBluetooth connectivity gives you full control from your phone — adjust each mist outlet independently without leaving your seat. Built from premium aluminum alloy and powered via USB.",
    priceINR: 22999,
    bluetooth: true,
    coverageSqFt: [108, 538],
    coverageLabel: "Up to 50 m² (≈540 sq ft)",
    bestFor: ["Living Rooms", "Bedrooms", "Study Rooms", "Offices"],
    keyFeatures: [
      "Dual independent 60 ml mist outlets — run one or both simultaneously",
      "Ultra-quiet at ≤35 dB — barely a whisper in any room",
      "Spill-proof design for safe, worry-free placement",
      "Premium aluminum alloy build with a refined finish",
      "USB-powered (5V DC) — works with any standard adapter",
      "Bluetooth compatible — independently control each mist outlet from your phone",
    ],
    image: "/images/diffusers/dual-mist-at302/01.png",
    video: "https://res.cloudinary.com/dnv4kq8ml/video/upload/v1780759975/Video_Display_r7dj6z.mp4",
    gallery: [
      "/images/diffusers/dual-mist-at302/01.png",
      "/images/diffusers/dual-mist-at302/02.png",
      "/images/diffusers/dual-mist-at302/03.png",
      "/images/diffusers/dual-mist-at302/04.png",
      "/images/diffusers/dual-mist-at302/05.png",
    ],
    finish: "Aluminum alloy with PP + PET",
    height: "140 × 93 × 218 mm",
    specs: [
      { label: "Bottle Capacity", value: "60 ml × 2 (dual independent)" },
      { label: "Voltage / Power", value: "5V DC (USB) / 2.3 W" },
      { label: "Material", value: "Aluminum Alloy + PP + PET" },
      { label: "Dimensions", value: "140 × 93 × 218 mm" },
      { label: "Net Weight", value: "740 g (±15%)" },
      { label: "Noise Level", value: "≤35 dB" },
      { label: "Oil Consumption", value: "0.02 – 0.5 g/h" },
      { label: "Coverage Area", value: "Up to 50 m² / 150 m³" },
      { label: "Connectivity", value: "Bluetooth" },
    ],
  },
  {
    slug: "clock-at370",
    model: "A-T370",
    name: "The Ember",
    category: "diffuser",
    tier: "premium",
    tagline: "Always Know the Time. Always Set the Mood.",
    description:
      "The A-T370 is more than a diffuser — it is a desktop companion. An integrated LED clock with automatic network time synchronisation keeps you grounded in your day, while a soft natural breathing light and steady fragrance mist keep your space feeling calm. The glass-like acrylic finish gives it a premium, almost sculptural quality.\n\nBluetooth connectivity means you can adjust fragrance intensity from your phone without disturbing the calm the A-T370 creates. Right at home on a work desk, bar cart, or bedside table.",
    priceINR: 18999,
    bluetooth: true,
    coverageSqFt: [108, 538],
    coverageLabel: "Up to 50 m² (≈540 sq ft)",
    bestFor: ["Home", "Office", "Bar"],
    keyFeatures: [
      "Integrated LED clock with automatic network time sync",
      "Natural breathing ambient light — soft, rhythmic glow",
      "Premium glass-like acrylic (PMMA) finish",
      "Upgraded spill-proof design for reliable daily use",
      "USB-powered (5V DC) — easy placement anywhere",
      "Bluetooth compatible — adjust fragrance settings from your phone",
    ],
    image: "/images/diffusers/clock-at370/01.png",
    video: "https://res.cloudinary.com/dnv4kq8ml/video/upload/Video_Display_gggg5v.mp4",
    gallery: [
      "/images/diffusers/clock-at370/01.png",
      "/images/diffusers/clock-at370/02.png",
      "/images/diffusers/clock-at370/03.png",
      "/images/diffusers/clock-at370/04.png",
      "/images/diffusers/clock-at370/05.png",
    ],
    finish: "Glass-like acrylic (PMMA)",
    height: "154 × 88.5 × 132 mm",
    specs: [
      { label: "Bottle Capacity", value: "60 ml" },
      { label: "Voltage / Power", value: "5V DC (USB) / 4 W" },
      { label: "Material", value: "PMMA + PP + POM" },
      { label: "Dimensions", value: "154 × 88.5 × 132 mm" },
      { label: "Net Weight", value: "580 g (±5%)" },
      { label: "Oil Consumption", value: "0.09 – 0.25 g/h" },
      { label: "Coverage Area", value: "Up to 50 m² / 150 m³" },
      { label: "Display", value: "LED Clock with Auto Network Time Sync" },
      { label: "Connectivity", value: "Bluetooth" },
    ],
  },
];

export function getDiffuser(slug: string) {
  return diffusers.find((d) => d.slug === slug);
}

export function getRelatedOils() {
  return ["blanc-ritual", "shoreline", "grand-lobby", "the-arrival"];
}
