import { WHATSAPP_NUMBER, WHATSAPP_PREFILL } from "@/lib/contact";

/**
 * Floating WhatsApp button. WhatsApp is how most Indian customers would rather
 * ask a question than fill in a form, so this is a direct line rather than
 * another contact page.
 *
 * Carries data-site-chrome so it hides alongside the header and footer if the
 * holding page is ever switched back on, and sits at z-40 so the cart drawer
 * (z-100) and the mobile menu (z-50) both cover it rather than fighting it.
 */
export function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    WHATSAPP_PREFILL
  )}`;

  return (
    <a
      data-site-chrome
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Message Quint Home on WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[color:var(--color-charcoal)] text-[color:var(--color-ivory)] shadow-[0_10px_30px_-8px_rgba(58,53,50,0.55)] transition-[background-color,transform] duration-500 ease-[var(--ease-quint)] hover:bg-[color:var(--color-clay-deep)] hover:-translate-y-0.5 md:bottom-8 md:right-8 md:h-[56px] md:w-[56px]"
    >
      {/* WhatsApp mark, inlined so it inherits currentColor and costs no request. */}
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="h-[26px] w-[26px] md:h-7 md:w-7"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 0 1 6.988 2.896 9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.359.101 11.944c0 2.105.549 4.16 1.595 5.971L0 24l6.305-1.654a11.9 11.9 0 0 0 5.734 1.46h.005c6.581 0 11.94-5.359 11.943-11.945A11.86 11.86 0 0 0 20.52 3.45" />
      </svg>
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-[color:var(--color-charcoal)] px-4 py-2 text-[0.62rem] uppercase tracking-[0.28em] text-[color:var(--color-ivory)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:block">
        Chat with us
      </span>
    </a>
  );
}
