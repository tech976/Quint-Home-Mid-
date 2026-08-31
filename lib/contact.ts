// Contact details used by the site chrome.

/** Business WhatsApp, in the country-code-and-number form wa.me expects. */
export const WHATSAPP_NUMBER = "919819616668";

/**
 * Prefilled so the first message already says where it came from — a website
 * enquiry is then distinguishable at a glance from any other chat.
 *
 * Plain ASCII on purpose: apostrophes and dashes survive URL encoding but
 * render inconsistently in older WhatsApp clients.
 */
export const WHATSAPP_PREFILL =
  "Hi Quint Home, I have been through your website and have a query I would like to discuss with the owner.";
