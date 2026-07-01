import type { FragranceOil } from "../types";

/**
 * A compact, representative scent-note line for pickers and dropdowns — one
 * note from each layer, e.g. "Citrus · Cardamom · Musk". Enough for a shopper
 * to recognise the fragrance from the name alone, without over-filling a
 * native <option> (which can only render plain text).
 */
export function oilNoteSummary(oil: FragranceOil): string {
  const { top, heart, base } = oil.notes;
  return [top[0], heart[0], base[0]].filter(Boolean).join(" · ");
}

// ============================================================
//  Quint Home — Signature Scents
//  Source of truth: Quint Home Website Brief vF — "Fragrance
//  Oils, Signature Scents at Launch". Names, one-liners and
//  note pyramids are taken from the brief. Original supplier
//  names are intentionally NOT referenced anywhere.
// ============================================================

export const oils: FragranceOil[] = [
  {
    slug: "blanc-ritual",
    name: "Blanc Ritual",
    category: "oil",
    tier: "standard",
    tagline: "A clean, meditative calm — citrus-lit and softly woody.",
    description:
      "Citrus, orange blossom and tea open onto cardamom and ambrette, then settle into musk, amber and jasmine. Clean and meditative, lit from within.",
    priceINR: 1499,
    volumeML: 100,
    notes: {
      top: ["Citrus", "Orange Blossom", "Tea"],
      heart: ["Cardamom", "Ambrette"],
      base: ["Musk", "Amber", "Jasmine"],
    },
    mood: "Clean and meditative",
    origin: "Citrus & white musk",
    image: "/images/oils/oil-02.webp",
    swatch: "#E8DCB8",
    textColor: "#3A3532",
  },
  {
    slug: "quietude",
    name: "Quietude",
    category: "oil",
    tier: "standard",
    tagline: "The stillness of being deep in the wild — grounded, mineral, unhurried.",
    description:
      "Flint and pepper over patchouli, oud and lavender, grounded by vetiver, cedar and benzoin. The stillness of being somewhere vast and untouched.",
    priceINR: 1499,
    volumeML: 100,
    notes: {
      top: ["Flint", "Pepper"],
      heart: ["Patchouli", "Oud", "Lavender"],
      base: ["Vetiver", "Cedar", "Benzoin"],
    },
    mood: "Grounded and mineral",
    origin: "Oud & vetiver",
    image: "/images/oils/oil-06.webp",
    swatch: "#293329",
    textColor: "#FAF8F3",
  },
  {
    slug: "first-rain",
    name: "First Rain",
    category: "oil",
    tier: "standard",
    tagline: "Dewy, alive and luminous — the air just after a downpour.",
    description:
      "Pear, grapefruit and violet leaf over lotus, jasmine and lily of the valley, on amber and benzoin. The air the moment the rain stops.",
    priceINR: 1499,
    volumeML: 100,
    notes: {
      top: ["Pear", "Grapefruit", "Violet Leaf"],
      heart: ["Lotus", "Jasmine", "Lily of the Valley"],
      base: ["Amber", "Benzoin"],
    },
    mood: "Dewy and luminous",
    origin: "Petrichor florals",
    image: "/images/oils/oil-08.webp",
    swatch: "#77918D",
    textColor: "#FAF8F3",
  },
  {
    slug: "soft-hour",
    name: "Soft Hour",
    category: "oil",
    tier: "standard",
    tagline: "Warm and indulgent — almond and peony that settle like a quiet evening.",
    description:
      "Almond, pear and lime over magnolia, peony and ginseng, on vanilla, amber and tonka bean. Warm and indulgent, the way an evening softens.",
    priceINR: 1499,
    volumeML: 100,
    notes: {
      top: ["Almond", "Pear", "Lime"],
      heart: ["Magnolia", "Peony", "Ginseng"],
      base: ["Vanilla", "Amber", "Tonka Bean"],
    },
    mood: "Warm and indulgent",
    origin: "Almond & peony",
    image: "/images/oils/oil-03.webp",
    swatch: "#D8CFC2",
    textColor: "#3A3532",
  },
  {
    slug: "solitude",
    name: "Solitude",
    category: "oil",
    tier: "standard",
    tagline: "Alone somewhere vast and beautiful — sharp, alive, deeply calm.",
    description:
      "Bergamot, nettle and currant leaf over pink pepper and achillea, on vetiver, cedar and musk. Sharp and green, and completely at ease.",
    priceINR: 1499,
    volumeML: 100,
    notes: {
      top: ["Bergamot", "Nettle", "Currant Leaf"],
      heart: ["Pink Pepper", "Achillea"],
      base: ["Vetiver", "Cedar", "Musk"],
    },
    mood: "Sharp and calm",
    origin: "Forest greens",
    image: "/images/oils/oil-05.webp",
    swatch: "#5A7370",
    textColor: "#FAF8F3",
  },
  {
    slug: "shoreline",
    name: "Shoreline",
    category: "oil",
    tier: "standard",
    tagline: "Salt air and warm leather — a coastline with nowhere else to be.",
    description:
      "Citrus, lemon and sea water over lavender, clove and leather, on sandalwood, ambergris and cypress. Salt on the skin and warm leather in the sun.",
    priceINR: 1499,
    volumeML: 100,
    notes: {
      top: ["Citrus", "Lemon", "Sea Water"],
      heart: ["Lavender", "Clove", "Leather"],
      base: ["Sandalwood", "Ambergris", "Cypress"],
    },
    mood: "Coastal and warm",
    origin: "Salt & leather",
    image: "/images/oils/oil-01.webp",
    swatch: "#6A625E",
    textColor: "#FAF8F3",
  },
  {
    slug: "grand-lobby",
    name: "Grand Lobby",
    category: "oil",
    tier: "hotel-credential",
    tagline: "Polished and welcoming — the scent of arriving somewhere exceptional.",
    description:
      "Melon, peach and apple over tuberose, freesia and mimosa, on sandalwood, musk and oakmoss. Open, generous, the note you walk into and remember.",
    priceINR: 1999,
    volumeML: 100,
    credential: {
      line: "Hotel Credential",
      story:
        "Composed in the spirit of a grand hotel lobby — the scent of arrival, held at full home concentration.",
    },
    notes: {
      top: ["Melon", "Peach", "Apple"],
      heart: ["Tuberose", "Freesia", "Mimosa"],
      base: ["Sandalwood", "Musk", "Oakmoss"],
    },
    mood: "Polished and welcoming",
    origin: "Hotel credential",
    image: "/images/oils/oil-04.webp",
    swatch: "#5A7370",
    textColor: "#FAF8F3",
  },
  {
    slug: "the-arrival",
    name: "The Arrival",
    category: "oil",
    tier: "hotel-credential",
    tagline: "Polished and quietly grand — walking into a lobby that knows what it's doing.",
    description:
      "Peach, citrus and pink grapefruit over rose, violet and lily of the valley, on tea, musk and amber. Composed, confident, quietly grand.",
    priceINR: 1999,
    volumeML: 100,
    credential: {
      line: "Hotel Credential",
      story:
        "Composed in the spirit of a grand hotel arrival — polished and assured, held at full home concentration.",
    },
    notes: {
      top: ["Peach", "Citrus", "Pink Grapefruit"],
      heart: ["Rose", "Violet", "Lily of the Valley"],
      base: ["Tea", "Musk", "Amber"],
    },
    mood: "Quietly grand",
    origin: "Hotel credential",
    image: "/images/oils/oil-07.webp",
    swatch: "#3A3532",
    textColor: "#EEE4D8",
  },
];

export function getOil(slug: string) {
  return oils.find((o) => o.slug === slug);
}
