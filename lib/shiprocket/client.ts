// Shiprocket — used only to estimate delivery at checkout.
//
// Nothing here is on the payment path: if Shiprocket is slow, rate-limited or
// down, the caller falls back to the static estimate rather than blocking a
// sale. No customer data is sent — only two PIN codes and a weight.

const BASE = "https://apiv2.shiprocket.in/v1/external";

const email = () => process.env.SHIPROCKET_EMAIL;
const password = () => process.env.SHIPROCKET_PASSWORD;
export const pickupPin = () => process.env.SHIPROCKET_PICKUP_PIN;

export const shiprocketConfigured = (): boolean =>
  Boolean(email() && password() && pickupPin());

// Tokens last several days, so hold one per warm instance rather than logging
// in on every keystroke. A cold start simply fetches a fresh one.
let cached: { token: string; expires: number } | null = null;

export async function getToken(): Promise<string | null> {
  if (!shiprocketConfigured()) return null;
  if (cached && cached.expires > Date.now()) return cached.token;

  try {
    const res = await fetch(`${BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email(), password: password() }),
      cache: "no-store",
    });
    if (!res.ok) return null;
    const json = (await res.json()) as { token?: string };
    if (!json.token) return null;

    // Shiprocket tokens are valid ~10 days; refresh well inside that.
    cached = { token: json.token, expires: Date.now() + 6 * 24 * 60 * 60 * 1000 };
    return json.token;
  } catch {
    return null;
  }
}

export interface CourierEstimate {
  /** Courier the estimate came from, e.g. "Delhivery Surface". */
  courier: string;
  /** Shiprocket's estimated delivery date, as it returns it. */
  etd: string | null;
  /** Days in transit, when given. */
  days: number | null;
}

/**
 * Fastest serviceable option for a PIN code, or null when the destination is
 * not serviceable / the call fails.
 */
export async function estimateForPin(
  deliveryPin: string,
  weightKg = 0.5
): Promise<CourierEstimate | null> {
  const token = await getToken();
  if (!token) return null;

  const qs = new URLSearchParams({
    pickup_postcode: String(pickupPin()),
    delivery_postcode: deliveryPin,
    weight: String(weightKg),
    cod: "0",
  });

  try {
    const res = await fetch(`${BASE}/courier/serviceability/?${qs}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) return null;

    const json = (await res.json()) as {
      data?: {
        available_courier_companies?: {
          courier_name?: string;
          etd?: string;
          estimated_delivery_days?: string | number;
        }[];
      };
    };

    const options = json.data?.available_courier_companies ?? [];
    if (options.length === 0) return null;

    // Quickest first, so the customer sees the best realistic date.
    const sorted = [...options].sort(
      (a, b) => Number(a.estimated_delivery_days ?? 99) - Number(b.estimated_delivery_days ?? 99)
    );
    const best = sorted[0];

    return {
      courier: best.courier_name ?? "Courier",
      etd: best.etd ?? null,
      days: best.estimated_delivery_days ? Number(best.estimated_delivery_days) : null,
    };
  } catch {
    return null;
  }
}
