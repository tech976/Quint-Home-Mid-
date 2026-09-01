import Script from "next/script";

/** Microsoft Clarity project for quinthome.in. */
const CLARITY_PROJECT_ID = "ybcekf8e6g";

/**
 * Clarity — heatmaps and session replay, so we can see where people hesitate
 * rather than guess.
 *
 * afterInteractive rather than beforeInteractive: analytics should never sit in
 * front of the page rendering, and Clarity still attaches early enough to catch
 * the session. An id is required for Next to track an inline script.
 */
export function Clarity() {
  return (
    <Script id="ms-clarity" strategy="afterInteractive">
      {`(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");`}
    </Script>
  );
}
