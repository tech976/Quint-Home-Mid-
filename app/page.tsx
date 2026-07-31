import { ComingSoon } from "@/components/home/coming-soon";
import { HomeSections } from "@/components/home/home-sections";

/**
 * The launch teaser is shown by default. To bring the real home page back, set
 *
 *     COMING_SOON=0
 *
 * in Vercel and redeploy — no code change needed. Every other route (shop,
 * product pages, checkout, journal, legal) stays live either way.
 */
export default function Home() {
  const teaser = process.env.COMING_SOON !== "0";
  return teaser ? <ComingSoon /> : <HomeSections />;
}
