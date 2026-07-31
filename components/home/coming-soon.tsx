import Image from "next/image";

/**
 * Launch teaser. The whole site still exists and every other route works — only
 * the home page is replaced, and only while COMING_SOON is on (see app/page.tsx).
 *
 * The site chrome (announcement bar, header, footer) is hidden rather than
 * merely covered, so nothing is reachable behind the artwork by keyboard or
 * screen reader.
 */
export function ComingSoon() {
  return (
    <>
      <style>{`
        [data-site-chrome], header, footer { display: none !important; }
        html, body { overflow: hidden; background: #140d07; }
      `}</style>

      {/* The artwork is 16:9. Filling a tall phone screen would crop the
          wordmark, so phones show it whole against the artwork's own edge
          colour; wider screens fill the viewport. */}
      <div className="fixed inset-0 z-[300] bg-[#140d07]">
        <Image
          src="/images/coming-soon.webp"
          alt="Quint Home — something extraordinary is on its way. Stay tuned."
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-contain md:object-cover"
        />
      </div>
    </>
  );
}
