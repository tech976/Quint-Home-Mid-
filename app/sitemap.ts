import type { MetadataRoute } from "next";
import { diffusers } from "@/lib/data/diffusers";
import { oils } from "@/lib/data/oils";
import { journal } from "@/lib/data/journal";

const SITE = "https://www.quinthome.in";

/**
 * Without a sitemap, search engines were left to guess which pages mattered —
 * which is how a listing page can end up outranking the home page. Priorities
 * here state the intended hierarchy: home first, then the range.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE, changeFrequency: "weekly", priority: 1.0, lastModified: now },
    { url: `${SITE}/shop`, changeFrequency: "weekly", priority: 0.8, lastModified: now },
    { url: `${SITE}/find-your-scent`, changeFrequency: "monthly", priority: 0.7, lastModified: now },
    { url: `${SITE}/about`, changeFrequency: "monthly", priority: 0.6, lastModified: now },
    { url: `${SITE}/journal`, changeFrequency: "weekly", priority: 0.6, lastModified: now },
    { url: `${SITE}/businesses`, changeFrequency: "monthly", priority: 0.5, lastModified: now },
    { url: `${SITE}/contact`, changeFrequency: "monthly", priority: 0.5, lastModified: now },
    { url: `${SITE}/faq`, changeFrequency: "monthly", priority: 0.4, lastModified: now },
    { url: `${SITE}/shipping`, changeFrequency: "yearly", priority: 0.3, lastModified: now },
    { url: `${SITE}/privacy`, changeFrequency: "yearly", priority: 0.2, lastModified: now },
    { url: `${SITE}/terms`, changeFrequency: "yearly", priority: 0.2, lastModified: now },
  ];

  const products: MetadataRoute.Sitemap = [...diffusers, ...oils].map((p) => ({
    url: `${SITE}/range/${p.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.7,
    lastModified: now,
  }));

  const articles: MetadataRoute.Sitemap = journal.map((a) => ({
    url: `${SITE}/journal/${a.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.5,
    lastModified: new Date(a.publishedAt),
  }));

  return [...staticPages, ...products, ...articles];
}
