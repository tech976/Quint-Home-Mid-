// Delivery estimate for a PIN code, asked for as the customer types their
// address. Credentials stay server-side; the browser only ever sends a PIN.

import { NextResponse, type NextRequest } from "next/server";
import { estimateForPin, shiprocketConfigured } from "@/lib/shiprocket/client";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const pin = (request.nextUrl.searchParams.get("pin") ?? "").trim();
  const weight = Number(request.nextUrl.searchParams.get("weight") ?? "0.5");

  if (!/^\d{6}$/.test(pin)) {
    return NextResponse.json({ status: "invalid" }, { status: 400 });
  }
  if (!shiprocketConfigured()) {
    // Caller keeps its own estimate rather than showing nothing.
    return NextResponse.json({ status: "unavailable" });
  }

  const estimate = await estimateForPin(
    pin,
    Number.isFinite(weight) && weight > 0 ? Math.min(weight, 50) : 0.5
  );

  if (!estimate) {
    // Either the PIN is not serviceable or the lookup failed; we cannot tell
    // them apart from here, so say the softer of the two.
    return NextResponse.json({ status: "no-estimate" });
  }

  return NextResponse.json(
    {
      status: "ok",
      courier: estimate.courier,
      etd: estimate.etd,
      days: estimate.days,
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
