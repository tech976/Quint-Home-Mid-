import type { JournalPost } from "../types";

export const journal: JournalPost[] = [
  {
    slug: "a-lake-palace-in-udaipur",
    title: "Why your home deserves scent that was actually designed",
    eyebrow: "Founder Letter",
    excerpt:
      "We spend years choosing the lighting, the furniture, the paint. Then we leave the air to chance, or to a plug-in that smells like a chemical version of a flower. That gap is the reason Quint Home exists.",
    body: [
      "Scent is the first thing you notice about a room and the last thing most of us plan for. You walk in, and before you have looked at anything, the air has already told you something. Whether you meant it to or not.",
      "Most of what is sold for the home works against you here. Sprays fade in minutes. Reed diffusers go quiet after a week. Ultrasonic machines dilute a little oil into a lot of water and push out humid air that smells faintly of the scent and mostly of damp.",
      "We wanted the opposite. A scent you choose on purpose, blended like a perfume with top, heart, and base notes, held at full strength so the room actually carries it. That meant going waterless: atomising the oil directly, at 70 to 90 percent concentration, with no water and no heat in the way.",
      "It also meant the machine had to disappear into the room rather than apologise for being there. Near silent, app-controlled, set once to a morning and evening schedule and then left alone. An object you display, not an appliance you hide.",
      "Quint Home is the answer to a simple question. If we are this careful about everything else in a room, why not the air in it.",
    ],
    cover: "/images/journal/designed-scent.webp",
    publishedAt: "2026-03-12",
    readMinutes: 4,
  },
  {
    slug: "what-is-a-waterless-diffuser",
    title: "Why we don't use water, and why it changes the air you breathe",
    eyebrow: "Education",
    excerpt:
      "The diffuser on most Indian bedside tables tonight runs on water and ultrasonic vibration. A waterless one works on a completely different principle. Here is the difference, in three short paragraphs.",
    body: [
      "An ultrasonic diffuser dilutes a few drops of oil into a tank of water, then vibrates that water into mist. The scent that reaches you is roughly 1 to 3 percent fragrance by volume. The rest is water vapour. The room ends up smelling faintly of the scent and noticeably of humidified air.",
      "Waterless cold-air nebulisation atomises the oil directly with air pressure. No water, no heat, no dilution. What reaches the room is the fragrance itself, at 70 to 90 percent concentration. It is more potent, it sits in the air for hours rather than minutes, and it carries the full structure of top, heart, and base notes the way a perfume does.",
      "It is also quieter. There is no gurgle and no fan, so a Quint Home diffuser running in a bedroom at night is genuinely near silent. You control it from the app, set a schedule once, and the device keeps to it on its own.",
    ],
    cover: "/images/vibe/vibe-17.webp",
    publishedAt: "2026-03-28",
    readMinutes: 3,
  },
  {
    slug: "the-architecture-of-scent",
    title: "Top, heart, base: how to read a Quint Home scent profile",
    eyebrow: "Notes",
    excerpt:
      "Every Quint Home oil is built like a perfume, with three layers that arrive and fade at different speeds. Once you know how to read them, choosing a scent gets a lot easier.",
    body: [
      "Top notes are the first impression. They are bright and quick to evaporate, lasting fifteen to thirty minutes, usually citrus, herbs, or light spice. They are what greets you when you walk into the room.",
      "Heart notes carry the room. These are the floral, fruity, and softly resinous notes that hold for several hours, and they are where the personality of the fragrance lives.",
      "Base notes give the scent its weight and its memory. Woods, musks, ambers, and resins settle in slowly and stay the longest. They are what you still notice on the cushions the next morning.",
      "So read a scent profile from the top down. It tells you how the room will feel at minute one, at hour three, and the morning after.",
    ],
    cover: "/images/vibe/vibe-15.webp",
    publishedAt: "2026-04-10",
    readMinutes: 3,
  },
];

export function getJournalPost(slug: string) {
  return journal.find((p) => p.slug === slug);
}
