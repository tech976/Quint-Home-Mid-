import { ComingSoon } from "@/components/home/coming-soon";
import { HomeSections } from "@/components/home/home-sections";

/**
 * The real home page is live. To put the launch teaser back up, set
 *
 *     COMING_SOON=1
 *
 * in Vercel and redeploy — no code change needed. Every other route (shop,
 * product pages, checkout, journal, legal) stays live either way.
 */
export default function Home() {
  const teaser = process.env.COMING_SOON === "1";
  return teaser ? <ComingSoon /> : <HomeSections />;
}
