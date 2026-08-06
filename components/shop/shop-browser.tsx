"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Monogram } from "@/components/brand/logo";
import { diffusers } from "@/lib/data/diffusers";
import { oils } from "@/lib/data/oils";

/**
 * Shop browse bar: a category jump control plus product search. Search filters
 * the full catalogue (diffusers + oils) by name, model code, tagline, notes and
 * placement tags, and surfaces matches as links to each PDP.
 */

type CategoryKey = "diffusers" | "oils" | "other";

const CATEGORIES: { key: CategoryKey; label: string; target?: string }[] = [
  { key: "diffusers", label: "Diffusers", target: "diffusers" },
  { key: "oils", label: "Fragrance Oils", target: "oils" },
  { key: "other", label: "Reed Diffusers & Candles" },
];

type SearchItem = {
  name: string;
  href: string;
  kind: string;
  meta: string;
  image: string;
  keywords: string;
};

const INDEX: SearchItem[] = [
  ...diffusers.map((d) => ({
    name: d.name,
    href: `/range/${d.slug}`,
    kind: "Diffuser",
    meta: d.coverageLabel,
    image: d.image,
    keywords:
      `${d.name} ${d.model} ${d.tagline} ${d.bestFor.join(" ")} diffuser`.toLowerCase(),
  })),
  ...oils.map((o) => ({
    name: o.name,
    href: `/range/${o.slug}`,
    kind: "Fragrance Oil",
    meta: o.mood,
    image: o.image,
    keywords:
      `${o.name} ${o.tagline} ${o.mood} ${o.origin} ${o.notes.top.join(" ")} ${o.notes.heart.join(" ")} ${o.notes.base.join(" ")} oil scent`.toLowerCase(),
  })),
];

export function ShopBrowser() {
  const [soon, setSoon] = useState(false);
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const results = q
    ? INDEX.filter((i) => q.split(/\s+/).every((t) => i.keywords.includes(t)))
    : [];

  function go(c: { target?: string }) {
    if (c.target) {
      setSoon(false);
      const el = document.getElementById(c.target);
      if (!el) return;
      // Route through Lenis when active so its internal scroll position stays in
      // sync (a raw scrollIntoView desyncs Lenis and snaps back on next wheel).
      if (window.__lenis) window.__lenis.scrollTo(el);
      else el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      setSoon((s) => !s);
    }
  }

  return (
    <section
      id="browse"
      className="scroll-mt-24 border-b border-[color:var(--color-rule)] bg-[color:var(--color-white)]"
    >
      <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
        <div className="flex flex-wrap items-center gap-x-7 gap-y-2 py-4">
          <span className="flex items-center gap-2 text-[0.58rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)]">
            <Monogram className="h-3.5 w-3.5 shrink-0 text-[color:var(--color-aerial)]" />
            Browse
          </span>
          <span className="hidden h-3 w-px bg-[color:var(--color-rule)] sm:block" />
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              type="button"
              onClick={() => go(c)}
              className="text-[0.72rem] uppercase tracking-[0.22em] text-[color:var(--color-charcoal)] transition-colors duration-300 hover:text-[color:var(--color-clay)]"
            >
              {c.label}
            </button>
          ))}

          {/* Search – filters the full catalogue */}
          <div className="relative ml-auto w-[100%] sm:w-auto sm:min-w-[16rem]">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-[0.8rem] text-[color:var(--color-charcoal-soft)]"
            >
              ⌕
            </span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, scents, notes…"
              aria-label="Search products"
              className="w-[100%] border-b border-[color:var(--color-rule)] bg-transparent py-2 pl-6 pr-2 text-[0.82rem] text-[color:var(--color-charcoal)] outline-none transition-colors placeholder:text-[color:var(--color-charcoal-soft)] focus:border-[color:var(--color-charcoal)]"
            />
          </div>
        </div>

        {/* Search results */}
        {q && (
          <div className="pb-5">
            {results.length === 0 ? (
              <p className="text-[0.82rem] text-[color:var(--color-charcoal-soft)]">
                No matches for “{query}”. Try a scent note, a room, or a product
                name.
              </p>
            ) : (
              <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {results.map((r) => (
                  <li key={r.href}>
                    <Link
                      href={r.href}
                      onClick={() => setQuery("")}
                      className="group flex items-center gap-3 border border-[color:var(--color-rule)] p-2 transition-colors hover:border-[color:var(--color-charcoal)]"
                    >
                      <span className="relative h-12 w-10 shrink-0 overflow-hidden bg-[color:var(--color-stardust-soft)]">
                        <Image
                          src={r.image}
                          alt=""
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate font-[family-name:var(--font-serif)] text-[0.95rem] text-[color:var(--color-charcoal)] transition-colors group-hover:text-[color:var(--color-clay)]">
                          {r.name}
                        </span>
                        <span className="block truncate text-[0.66rem] uppercase tracking-[0.18em] text-[color:var(--color-charcoal-soft)]">
                          {r.kind} · {r.meta}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {soon && (
          <p className="max-w-[52ch] pb-4 text-[0.82rem] leading-[1.6] text-[color:var(--color-charcoal-soft)]">
            Reed diffusers &amp; candles are{" "}
            <span className="text-[color:var(--color-aerial-deep)]">
              coming soon
            </span>{" "}
            – meanwhile, browse the diffusers and fragrance oils below.
          </p>
        )}
      </div>
    </section>
  );
}
