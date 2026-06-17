"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, X, ChevronDown } from "lucide-react";
import { Monogram } from "@/components/brand/logo";
import { diffusers } from "@/lib/data/diffusers";
import { oils } from "@/lib/data/oils";
import { formatINR } from "@/lib/utils";

/**
 * In-page Shop browser. A search field + category selector that filters the
 * whole range down to matching products inline — the same job the header
 * dropdown does, but with live search and product results on the page itself.
 *
 * Kept on-brand: hairline rules, uppercase tracking, serif names, no shadows.
 */

type CategoryKey = "all" | "diffusers" | "oils";

interface BrowseItem {
  slug: string;
  name: string;
  href: string;
  image: string;
  priceINR: number;
  category: Exclude<CategoryKey, "all">;
  categoryLabel: string;
  meta: string;
  /** Lowercased haystack of everything searchable for this product. */
  keywords: string;
}

const CATEGORIES: { key: CategoryKey; label: string }[] = [
  { key: "all", label: "Everything" },
  { key: "diffusers", label: "Diffusers" },
  { key: "oils", label: "Fragrance Oils" },
];

// Flatten both product families into one searchable list, once.
const ITEMS: BrowseItem[] = [
  ...diffusers.map((d): BrowseItem => ({
    slug: d.slug,
    name: d.name,
    href: `/shop/${d.slug}`,
    image: d.image,
    priceINR: d.priceINR,
    category: "diffusers",
    categoryLabel: d.tier === "premium" ? "Diffuser · Premium" : "Diffuser",
    meta: d.coverageLabel,
    keywords: [
      d.name,
      d.model,
      d.tagline,
      d.finish,
      ...(d.bestFor ?? []),
      d.bluetooth ? "bluetooth" : "",
      "diffuser",
    ]
      .join(" ")
      .toLowerCase(),
  })),
  ...oils.map((o): BrowseItem => ({
    slug: o.slug,
    name: o.name,
    href: `/shop/${o.slug}`,
    image: o.image,
    priceINR: o.priceINR,
    category: "oils",
    categoryLabel:
      o.tier === "hotel-credential" ? "Oil · Hotel Credential" : "Fragrance Oil",
    meta: o.mood ?? `${o.volumeML} ml`,
    keywords: [
      o.name,
      o.tagline,
      o.mood,
      o.origin,
      ...o.notes.top,
      ...o.notes.heart,
      ...o.notes.base,
      "oil",
      "fragrance",
    ]
      .join(" ")
      .toLowerCase(),
  })),
];

export function ShopBrowser() {
  const [category, setCategory] = useState<CategoryKey>("all");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const ddRef = useRef<HTMLDivElement>(null);

  // Close the category menu on outside click or Escape.
  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (ddRef.current && !ddRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const currentLabel =
    CATEGORIES.find((c) => c.key === category)?.label ?? "Everything";

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ITEMS.filter((item) => {
      if (category !== "all" && item.category !== category) return false;
      if (!q) return true;
      // Match every whitespace-separated term — narrows as you type more.
      return q.split(/\s+/).every((term) => item.keywords.includes(term));
    });
  }, [category, query]);

  const total =
    category === "all"
      ? ITEMS.length
      : ITEMS.filter((i) => i.category === category).length;

  return (
    <section
      id="browse"
      className="scroll-mt-24 border-b border-[color:var(--color-rule)] bg-[color:var(--color-white)]"
    >
      <div className="mx-auto max-w-[var(--container-full)] px-6 py-12 md:px-10 md:py-16">
        <p className="text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
          Find your scent
        </p>

        {/* Controls — category selector + search, on one rule-divided row */}
        <div className="mt-7 flex flex-col gap-6 border-b border-[color:var(--color-rule)] pb-6 lg:flex-row lg:items-end lg:justify-between">
          {/* Category dropdown — future categories (reed diffusers, candles,
              room sprays) live in lib/data/categories.ts, hidden until active. */}
          <div className="relative" ref={ddRef}>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-haspopup="listbox"
              aria-expanded={open}
              className="group inline-flex min-w-[12rem] items-center justify-between gap-6 border-b border-[color:var(--color-charcoal)] pb-2 text-left text-[0.72rem] uppercase tracking-[0.24em] text-[color:var(--color-charcoal)] transition-colors duration-300"
            >
              <span className="flex items-center gap-2.5">
                <Monogram
                  className="h-4 w-4 shrink-0 text-[color:var(--color-aerial)]"
                  aria-hidden="true"
                />
                <span>{currentLabel}</span>
              </span>
              <ChevronDown
                className={`h-4 w-4 text-[color:var(--color-charcoal-soft)] transition-transform duration-300 ease-[var(--ease-quint)] ${
                  open ? "rotate-180 text-[color:var(--color-clay)]" : ""
                }`}
                aria-hidden="true"
              />
            </button>

            <ul
              role="listbox"
              className={`absolute left-0 top-full z-30 mt-3 w-[16rem] origin-top overflow-hidden border border-[color:var(--color-rule)] bg-[color:var(--color-white)] shadow-[0_18px_50px_-20px_rgba(58,53,50,0.28)] transition-all duration-300 ease-[var(--ease-quint)] ${
                open
                  ? "pointer-events-auto translate-y-0 opacity-100"
                  : "pointer-events-none -translate-y-2 opacity-0"
              }`}
            >
              {CATEGORIES.map((c) => {
                const active = category === c.key;
                return (
                  <li key={c.key}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={active}
                      onClick={() => {
                        setCategory(c.key);
                        setOpen(false);
                      }}
                      className={`flex w-full items-center justify-between gap-4 px-5 py-3.5 text-left text-[0.72rem] uppercase tracking-[0.24em] transition-colors duration-200 ${
                        active
                          ? "bg-[color:var(--color-stardust-soft)] text-[color:var(--color-charcoal)]"
                          : "text-[color:var(--color-charcoal-soft)] hover:bg-[color:var(--color-stardust-soft)] hover:text-[color:var(--color-clay)]"
                      }`}
                    >
                      {c.label}
                      <span
                        className={`h-1.5 w-1.5 rounded-full bg-[color:var(--color-clay)] transition-opacity duration-200 ${
                          active ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Search field */}
          <div className="relative flex w-full items-center gap-3 border-b border-[color:var(--color-rule)] pb-2 lg:w-[22rem]">
            <Search
              className="h-[18px] w-[18px] shrink-0 text-[color:var(--color-charcoal-soft)]"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, note or room…"
              aria-label="Search products"
              className="w-full bg-transparent text-[0.92rem] text-[color:var(--color-charcoal)] placeholder:text-[color:var(--color-charcoal-soft)]/70 focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="shrink-0 text-[color:var(--color-charcoal-soft)] transition-colors duration-200 hover:text-[color:var(--color-clay)]"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Result count */}
        <p className="mt-5 text-[0.6rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)]">
          {results.length === total
            ? `${total} products`
            : `${results.length} of ${total}`}
          {query && (
            <span className="normal-case tracking-normal">
              {" "}
              — for &ldquo;{query.trim()}&rdquo;
            </span>
          )}
        </p>

        {/* Results */}
        {results.length > 0 ? (
          <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-4 md:gap-x-8 lg:grid-cols-5">
            {results.map((item) => (
              <li key={item.slug}>
                <Link href={item.href} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden bg-[color:var(--color-stardust-soft)]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(min-width: 1024px) 18vw, (min-width: 640px) 30vw, 45vw"
                      className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-quint)] group-hover:scale-[1.05]"
                    />
                  </div>
                  <p className="mt-4 text-[0.54rem] uppercase tracking-[0.28em] text-[color:var(--color-charcoal-soft)]">
                    {item.categoryLabel}
                  </p>
                  <h3
                    className="mt-2 transition-colors duration-300 group-hover:text-[color:var(--color-clay)]"
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "var(--text-xl)",
                      lineHeight: 1.08,
                      letterSpacing: "-0.014em",
                      fontWeight: 400,
                    }}
                  >
                    {item.name}
                  </h3>
                  <div className="mt-2 flex items-baseline justify-between gap-2 border-t border-[color:var(--color-rule)] pt-2">
                    <span className="truncate text-[0.74rem] leading-[1.4] text-[color:var(--color-charcoal-soft)]">
                      {item.meta}
                    </span>
                    <span className="shrink-0 tabular-nums text-[0.8rem] text-[color:var(--color-charcoal)]">
                      {formatINR(item.priceINR)}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-10 border-t border-[color:var(--color-rule)] pt-10">
            <p
              className="max-w-[28ch] text-balance"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "var(--text-2xl)",
                lineHeight: 1.1,
                letterSpacing: "-0.014em",
                fontWeight: 400,
              }}
            >
              Nothing matches{" "}
              <em className="text-[color:var(--color-aerial-deep)]">
                &ldquo;{query.trim()}&rdquo;
              </em>{" "}
              yet.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("all");
              }}
              className="mt-6 border-b border-[color:var(--color-charcoal)] pb-1.5 text-[0.72rem] uppercase tracking-[0.24em] transition-colors duration-300 hover:border-[color:var(--color-clay)] hover:text-[color:var(--color-clay)]"
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
