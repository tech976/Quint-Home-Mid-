"use server";

import { subscribeToNewsletter } from "@/lib/shopify/admin";

export interface SubscribeResult {
  ok: boolean;
  message: string;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

/**
 * Newsletter signup. Never leaks the underlying error to the visitor — a
 * failure here is ours to fix, not theirs to decode.
 */
export async function subscribeAction(email: string): Promise<SubscribeResult> {
  const address = email.trim().toLowerCase();

  if (!EMAIL.test(address) || address.length > 200) {
    return { ok: false, message: "That email doesn’t look right." };
  }

  try {
    const outcome = await subscribeToNewsletter(address);
    return {
      ok: true,
      message:
        outcome === "already"
          ? "You’re already on the list — thank you."
          : "Thank you. Look out for the next one.",
    };
  } catch (e) {
    console.error("[newsletter] signup failed", {
      error: e instanceof Error ? e.message : String(e),
    });
    return {
      ok: false,
      message: "Something went wrong. Please try again shortly.",
    };
  }
}
