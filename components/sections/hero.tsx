"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * Home Hero — full-bleed carousel.
 * Order: image 1 → video → image 2 (add image 4 to the array when ready).
 * Images auto-advance after 5s; the video plays in full, then advances.
 * Thin arrows switch manually. Header floats over the top (tracks #hero).
 */

type Slide =
  | { type: "image"; src: string; alt: string; position?: string }
  | { type: "video"; src: string; hideHeader?: boolean };

const slides: Slide[] = [
  {
    type: "image",
    src: "/images/hero-lounge.webp",
    alt: "A man reading in a serene living room, a Quint diffuser misting on the table",
    position: "center 50%",
  },
  { type: "video", src: "/videos/hero-5.mp4" },
  {
    type: "image",
    src: "/images/hero-1.webp",
    alt: "A couple at ease in a sunlit living room, a Quint diffuser on the table",
    position: "center 50%",
  },
  { type: "video", src: "/videos/hero-3.mp4" },
];

const IMAGE_MS = 5000;

export function Hero() {
  const [index, setIndex] = useState(0);
  // Videos autoplay muted (browsers block autoplay with sound); the visitor can
  // turn the sound on with the toggle, after which it stays on across slides.
  const [soundOn, setSoundOn] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const goTo = (i: number) => setIndex((i + slides.length) % slides.length);

  const toggleSound = () => {
    setSoundOn((on) => {
      const next = !on;
      const v = videoRefs.current[index];
      if (v) {
        v.muted = !next;
        if (next) v.play().catch(() => {});
      }
      return next;
    });
  };

  const currentIsVideo = slides[index].type === "video";

  // Auto-advance: images on a 5s timer; the video advances itself on `ended`.
  useEffect(() => {
    if (slides[index].type !== "image") return;
    const t = setTimeout(
      () => setIndex((i) => (i + 1) % slides.length),
      IMAGE_MS
    );
    return () => clearTimeout(t);
  }, [index]);

  // Only the active video plays, always from the start.
  useEffect(() => {
    slides.forEach((s, i) => {
      if (s.type !== "video") return;
      const v = videoRefs.current[i];
      if (!v) return;
      if (i === index) {
        try {
          v.currentTime = 0;
        } catch {}
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [index]);

  // Some slides (e.g. the water video) ask the floating header to step aside.
  useEffect(() => {
    const cur = slides[index];
    const hide = cur.type === "video" && cur.hideHeader === true;
    window.dispatchEvent(new CustomEvent("quint:hide-header", { detail: hide }));
  }, [index]);

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[92svh] flex-col justify-end overflow-hidden text-[color:var(--color-white)]"
    >
      {/* Slides (cross-fade) */}
      {slides.map((s, i) => (
        <div
          key={i}
          aria-hidden={i !== index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-[var(--ease-quint)] ${
            s.type === "video" ? "bg-black" : ""
          }`}
          style={{ opacity: i === index ? 1 : 0 }}
        >
          {s.type === "image" ? (
            <Image
              src={s.src}
              alt={s.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover motion-safe:animate-hero-drift"
              style={{ objectPosition: s.position }}
            />
          ) : (
            <video
              ref={(el) => {
                videoRefs.current[i] = el;
              }}
              src={s.src}
              muted={!soundOn}
              playsInline
              preload="auto"
              onEnded={() => setIndex((p) => (p + 1) % slides.length)}
              className="absolute inset-0 h-full w-[100%] object-cover"
            />
          )}
        </div>
      ))}

      {/* Shadows — keep the header (top) and metadata strip (bottom) legible. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-48 bg-gradient-to-b from-black/60 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-t from-black/60 to-transparent" />

      {/* Arrows */}
      <button
        type="button"
        onClick={() => goTo(index - 1)}
        aria-label="Previous banner"
        className="absolute left-4 top-1/2 z-30 -translate-y-1/2 p-2 text-[color:var(--color-white)]/70 transition-colors duration-300 hover:text-[color:var(--color-white)] md:left-7"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => goTo(index + 1)}
        aria-label="Next banner"
        className="absolute right-4 top-1/2 z-30 -translate-y-1/2 p-2 text-[color:var(--color-white)]/70 transition-colors duration-300 hover:text-[color:var(--color-white)] md:right-7"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>

      {/* Sound toggle — only on the video slides */}
      {currentIsVideo && (
        <button
          type="button"
          onClick={toggleSound}
          aria-label={soundOn ? "Mute video" : "Unmute video"}
          className="absolute bottom-[5.5rem] right-4 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--color-white)]/30 bg-black/30 text-[color:var(--color-white)]/85 backdrop-blur-sm transition-colors duration-300 hover:text-[color:var(--color-white)] md:right-7"
        >
          {soundOn ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
              <path d="M11 5 6 9H2v6h4l5 4V5Z" />
              <path d="M15.5 8.5a5 5 0 0 1 0 7" />
              <path d="M18.5 5.5a9 9 0 0 1 0 13" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
              <path d="M11 5 6 9H2v6h4l5 4V5Z" />
              <path d="m23 9-6 6" />
              <path d="m17 9 6 6" />
            </svg>
          )}
        </button>
      )}

      {/* === Bottom hairline metadata strip === */}
      <div className="relative z-20 mx-auto w-[100%] max-w-[var(--container-full)] border-t border-[color:var(--color-white)]/20 px-6 md:px-10">
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-5 text-[0.6rem] uppercase tracking-[0.36em] text-[color:var(--color-white)]/75">
          <span>Diffusers</span>
          <span className="hidden md:inline">Fragrance Oils</span>
          <span className="hidden md:inline">Candles</span>
          <span>Reed Diffusers</span>
        </div>
      </div>
    </section>
  );
}
