// PayU (India) Hosted Checkout — server-side only.
//
// Flow: we POST a signed form to PayU, the customer pays on PayU's page, and
// PayU posts the result back to our callback. Payment never touches Shopify
// Checkout, so Shopify's third-party transaction fee does not apply; the paid
// order is written into Shopify afterwards via the Admin API.
//
// The SALT is a secret and must never reach the browser.

import crypto from "node:crypto";

const KEY = process.env.PAYU_MERCHANT_KEY;
const SALT = process.env.PAYU_MERCHANT_SALT;
const PRODUCTION = process.env.PAYU_MODE === "production";

/** True once the merchant key + salt are present in the environment. */
export const payuConfigured = Boolean(KEY && SALT);

/** Where the signed checkout form is submitted. */
export const PAYU_PAYMENT_URL = PRODUCTION
  ? "https://secure.payu.in/_payment"
  : "https://test.payu.in/_payment";

/** Server-to-server transaction verification endpoint. */
const PAYU_VERIFY_URL = PRODUCTION
  ? "https://info.payu.in/merchant/postservice.php?form=2"
  : "https://test.payu.in/merchant/postservice.php?form=2";

const sha512 = (value: string): string =>
  crypto.createHash("sha512").update(value).digest("hex");

/** PayU rejects amounts that are not plain decimals, e.g. "7999.00". */
export function formatAmount(rupees: number): string {
  return rupees.toFixed(2);
}

/** A transaction id unique per attempt. Letters/digits only — PayU is picky. */
export function newTxnId(): string {
  return `QH${Date.now().toString(36)}${crypto
    .randomBytes(5)
    .toString("hex")}`.toUpperCase();
}

export interface PayuOrderInput {
  txnid: string;
  amount: string; // already formatted, e.g. "7999.00"
  productinfo: string;
  firstname: string;
  email: string;
  phone: string;
  surl: string;
  furl: string;
  lastname?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  country?: string;
  zipcode?: string;
  udf1?: string;
  udf2?: string;
  udf3?: string;
  udf4?: string;
  udf5?: string;
}

/**
 * Builds the full set of form fields for PayU, including the request hash:
 *   sha512(key|txnid|amount|productinfo|firstname|email|udf1..udf5||||||SALT)
 */
export function buildPayuFields(input: PayuOrderInput): Record<string, string> {
  if (!payuConfigured) {
    throw new Error("PayU is not configured (missing PAYU_MERCHANT_KEY / PAYU_MERCHANT_SALT).");
  }

  const udf1 = input.udf1 ?? "";
  const udf2 = input.udf2 ?? "";
  const udf3 = input.udf3 ?? "";
  const udf4 = input.udf4 ?? "";
  const udf5 = input.udf5 ?? "";

  // The five trailing empty strings are the reserved udf6–udf10 slots; they are
  // part of the signature even though we never send them.
  const hash = sha512(
    [
      KEY,
      input.txnid,
      input.amount,
      input.productinfo,
      input.firstname,
      input.email,
      udf1,
      udf2,
      udf3,
      udf4,
      udf5,
      "",
      "",
      "",
      "",
      "",
      SALT,
    ].join("|")
  );

  const fields: Record<string, string> = {
    key: KEY as string,
    txnid: input.txnid,
    amount: input.amount,
    productinfo: input.productinfo,
    firstname: input.firstname,
    email: input.email,
    phone: input.phone,
    surl: input.surl,
    furl: input.furl,
    udf1,
    udf2,
    udf3,
    udf4,
    udf5,
    hash,
  };

  // Optional address fields, only when present.
  for (const k of [
    "lastname",
    "address1",
    "address2",
    "city",
    "state",
    "country",
    "zipcode",
  ] as const) {
    const v = input[k];
    if (v) fields[k] = v;
  }

  return fields;
}

/**
 * Verifies the hash PayU posts back:
 *   sha512(SALT|status||||||udf5|udf4|udf3|udf2|udf1|email|firstname|productinfo|amount|txnid|key)
 *
 * When PayU applies additional charges the amount is prefixed to the sequence,
 * so both variants are accepted.
 */
export function verifyPayuResponse(p: Record<string, string>): boolean {
  if (!payuConfigured || !p.hash) return false;

  const base = [
    p.status ?? "",
    "",
    "",
    "",
    "",
    "",
    p.udf5 ?? "",
    p.udf4 ?? "",
    p.udf3 ?? "",
    p.udf2 ?? "",
    p.udf1 ?? "",
    p.email ?? "",
    p.firstname ?? "",
    p.productinfo ?? "",
    p.amount ?? "",
    p.txnid ?? "",
    KEY,
  ];

  const candidates = [
    sha512([SALT, ...base].join("|")),
    // additionalCharges variant
    p.additionalCharges
      ? sha512([p.additionalCharges, SALT, ...base].join("|"))
      : null,
  ].filter(Boolean) as string[];

  const received = p.hash.toLowerCase();
  return candidates.some((expected) => {
    const a = Buffer.from(expected, "utf8");
    const b = Buffer.from(received, "utf8");
    return a.length === b.length && crypto.timingSafeEqual(a, b);
  });
}

export interface PayuVerification {
  status: string; // "success" / "failure" / "pending"
  amount: string;
  mihpayid: string;
}

/**
 * Second, independent confirmation straight from PayU's servers. The browser
 * postback alone is never trusted — PayU explicitly requires this check.
 * Returns null when the call fails or the transaction is unknown.
 */
export async function verifyPaymentWithPayu(
  txnid: string
): Promise<PayuVerification | null> {
  if (!payuConfigured) return null;

  const command = "verify_payment";
  const hash = sha512([KEY, command, txnid, SALT].join("|"));

  try {
    const res = await fetch(PAYU_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        key: KEY as string,
        command,
        var1: txnid,
        hash,
      }),
      cache: "no-store",
    });
    if (!res.ok) return null;

    const json = (await res.json()) as {
      status?: number;
      transaction_details?: Record<
        string,
        { status?: string; amt?: string; amount?: string; mihpayid?: string }
      >;
    };

    const tx = json.transaction_details?.[txnid];
    if (!tx?.status) return null;

    return {
      status: String(tx.status).toLowerCase(),
      amount: String(tx.amt ?? tx.amount ?? ""),
      mihpayid: String(tx.mihpayid ?? ""),
    };
  } catch {
    return null;
  }
}
