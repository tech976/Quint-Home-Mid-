import type { NextConfig } from "next";

// Old model-code product paths → new title-based slugs. Permanent (301) so the
// SEO value of any indexed/linked old URLs carries over to the new URLs.
const SLUG_REDIRECTS: Record<string, string> = {
  "tabletop-a326": "monolith",
  "tabletop-fabric-a974": "loom",
  "clock-at370": "ember",
  "dual-mist-at302": "pillar",
  "plug-in-a815": "pebble",
  quietude: "terrain",
};

const nextConfig: NextConfig = {
  images: {
    // Allow a crisper quality for hero/editorial imagery (Next 16 requires
    // whitelisting any quality value used via the `quality` prop).
    qualities: [75, 90],
    // Next 16 defaults this to 4h, which makes swapped-in images look stale
    // during editing; a short TTL re-optimises promptly.
    minimumCacheTTL: 60,
  },
  async redirects() {
    return [
      // Old model-code paths first, so they win over the catch-all below.
      ...Object.entries(SLUG_REDIRECTS).flatMap(([from, to]) => [
        { source: `/shop/${from}`, destination: `/range/${to}`, statusCode: 301 as const },
        { source: `/range/${from}`, destination: `/range/${to}`, statusCode: 301 as const },
      ]),
      // /shop moved to /range. Permanent redirects rather than dead links, so
      // anything already indexed or shared keeps working and passes its ranking on.
      { source: "/shop", destination: "/range", statusCode: 301 as const },
      { source: "/shop/:slug*", destination: "/range/:slug*", statusCode: 301 as const },
    ];
  },
};

export default nextConfig;
