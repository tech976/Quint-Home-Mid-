# Own checkout + PayU, with Shopify as the backend

Shopify charges a **2% third-party transaction fee** on payments taken through
Shopify Checkout (Shopify Payments is not available to this store, so there is
no 0% option). Taking the payment ourselves and writing the finished order into
Shopify avoids that fee — PayU's ~2% is then the only cost.

Shopify remains the source of truth: orders, inventory, customers, fulfilment
and reporting all still live in Shopify Admin. Only the *checkout page* moves.

```
/cart → /checkout (our form)
      → POST /api/payu/initiate   signs the order, redirects to PayU
      → PayU hosted payment page  (cards / UPI / net banking / wallets)
      → POST /api/payu/callback   verifies, then creates the Shopify order
      → /order/confirmed
```

## Environment

The checkout only takes over once **both** PayU and the Shopify Admin API are
configured. Until then `/cart` keeps handing off to the Shopify-hosted
checkout, so nothing breaks in the meantime.

| Variable | Required | Notes |
| --- | --- | --- |
| `PAYU_MERCHANT_KEY` | yes | From PayU. Public half of the credentials. |
| `PAYU_MERCHANT_SALT` | yes | **Secret.** Signs requests and verifies responses — server-side only. |
| `PAYU_MODE` | no | `production` to use `secure.payu.in`; anything else uses `test.payu.in`. |
| `SHOPIFY_ADMIN_TOKEN` | yes | Custom app token with `write_orders`, `read_products`, `write_inventory`. |
| `NEXT_PUBLIC_SITE_URL` | no | Overrides the origin used for the PayU callback URLs. |
| `SHIPPING_FLAT_INR` | no | Flat shipping below ₹5,000. **Defaults to 0** — set it to the real fee. |

Create the Admin token in Shopify: *Settings → Apps and sales channels →
Develop apps → Create an app → Configure Admin API scopes*.

## Security

PayU require both checks, and both are implemented:

1. **Response hash** — the postback is re-hashed with the salt
   (`sha512(SALT|status||||||udf5|…|txnid|key)`) and compared before anything
   is trusted. A forged callback is rejected.
2. **Verify API** — an independent server-to-server confirmation that the
   transaction really succeeded, so a replayed browser postback cannot create
   an order.

Amounts are never taken from the browser: the bag is re-read from Shopify and
the total recomputed server-side, then compared with the amount PayU confirms.

## Known gaps

- **Webhook** — PayU also post server-to-server. Worth adding as a safety net
  for customers who close the tab before being redirected back.
- **Idempotency** — protection today is the single-use pending-order cookie. A
  duplicate-order check against the PayU `txnid` would be sturdier.
- **Refunds** — issued in PayU *and* marked in Shopify; the two are not linked.
- **Discount codes / tax rules** — Shopify's checkout engine no longer applies
  these, so anything beyond flat shipping must be implemented here.
