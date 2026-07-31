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

      <div className="fixed inset-0 z-[300] bg-[#140d07]">
        {/* Phones get the portrait cut, wider screens the landscape one, so
            neither has to letterbox or crop the wordmark. */}
        <Image
          src="/images/coming-soon-mobile.webp"
          alt="Quint Home — something extraordinary is on its way. Stay tuned."
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover md:hidden"
        />
        <Image
          src="/images/coming-soon.webp"
          alt="Quint Home — something extraordinary is on its way. Stay tuned."
          fill
          priority
          quality={90}
          sizes="100vw"
          className="hidden object-cover md:block"
        />
      </div>
    </>
  );
}
