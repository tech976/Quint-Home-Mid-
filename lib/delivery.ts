// Delivery estimate, derived from the promise made on /shipping so the two can
// never contradict each other: dispatched within 3 business days, then 3–5
// business days in transit.

export const DISPATCH_BUSINESS_DAYS = 3;
export const TRANSIT_MIN_BUSINESS_DAYS = 3;
export const TRANSIT_MAX_BUSINESS_DAYS = 5;

/** Adds business days, skipping weekends. Public holidays are not modelled —
 *  this is presented to the customer as an estimate, never a guarantee. */
export function addBusinessDays(from: Date, days: number): Date {
  const d = new Date(from);
  let added = 0;
  while (added < days) {
    d.setDate(d.getDate() + 1);
    const weekday = d.getDay();
    if (weekday !== 0 && weekday !== 6) added += 1;
  }
  return d;
}

const fmt = (d: Date) =>
  d.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

/**
 * Estimated delivery window as a display string, e.g. "Mon 18 Aug – Wed 20 Aug".
 * Computed from the customer's own clock, so it never disagrees with the date
 * on their device.
 */
export function deliveryEstimate(from: Date = new Date()): string {
  const earliest = addBusinessDays(
    from,
    DISPATCH_BUSINESS_DAYS + TRANSIT_MIN_BUSINESS_DAYS
  );
  const latest = addBusinessDays(
    from,
    DISPATCH_BUSINESS_DAYS + TRANSIT_MAX_BUSINESS_DAYS
  );
  return `${fmt(earliest)} – ${fmt(latest)}`;
}
