import type { MetadataRoute } from "next";

const SITE = "https://www.quinthome.in";

/**
 * There was no robots.txt at all, so crawlers were free to index anything —
 * including the cart and checkout. This keeps them to the public pages and
 * points them at the sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/cart", "/checkout", "/order/", "/api/"],
    },
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
