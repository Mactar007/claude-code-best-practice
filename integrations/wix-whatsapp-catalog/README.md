# Wix Catalog Webhook for WhatsApp (Hermes/OpenClaw)

A small webhook that gives a WhatsApp automation workflow built in Hermes or
OpenClaw read access to a Wix Stores catalog, so it can answer customer
questions about products, prices, stock and store policies without a human
in the loop.

## Architecture

```
WhatsApp message
      |
      v
Hermes/OpenClaw workflow  (intent detection: search / product / policies)
      |  HTTP Request node
      v
this webhook  (Express, src/server.js)
      |  Wix Stores Catalog V1 REST API
      v
Wix Stores catalog (products, prices, inventory)
      |
      v
Hermes/OpenClaw formats the reply
      |
      v
WhatsApp reply
```

The webhook only *reads* the Wix catalog. It does not create orders, carts
or contacts — see [Limitations](#limitations) below if you need that.

## Setup

1. `cd integrations/wix-whatsapp-catalog && npm install`
2. Generate a Wix API key at https://manage.wix.com/account/api-keys, scoped
   to **only** "Read Products" (`SCOPE.DC-STORES.READ-PRODUCTS`) on the one
   site you want the bot to answer for (least privilege — this key never
   needs write access).
3. Copy `.env.example` to `.env` and fill in `WIX_API_KEY`, `WIX_SITE_ID`
   (for dakardiscount.com: `e72fad7a-f210-4036-828d-728afc03d10c`), and a
   `WEBHOOK_SHARED_SECRET` (any random string).
4. `npm start` — the webhook listens on `PORT` (default `3000`).
5. Deploy it somewhere Hermes/OpenClaw can reach over HTTP (Railway,
   Render, Fly.io, a small VPS, etc.) since most no-code tools cannot call
   `localhost`.

## Endpoints

### `POST /catalog/search`
Free-text product lookup — use this when the customer names a product
loosely ("vous avez du riz parfumé ?").

```json
// request
{ "query": "riz parfumé", "limit": 5 }

// response
{
  "results": [
    {
      "id": "9e8924aa-...",
      "name": "Riz parfumé 5kg",
      "slug": "riz-parfume-5kg",
      "description": "...",
      "price": "8.50 XOF",
      "discountedPrice": "7.50 XOF",
      "currency": "XOF",
      "inStock": true,
      "availabilityStatus": "IN_STOCK",
      "url": "https://www.dakardiscount.com/product-page/riz-parfume-5kg"
    }
  ]
}
```

### `GET /catalog/product/:id`
Authoritative price/stock for one product, once the workflow already has
its `id` (typically from a prior `/catalog/search` call).

### `GET /catalog/policies`
Static payment and delivery terms, edited by you in
`config/store-policies.json`. Wix Stores doesn't expose "how do you accept
payment / how long is delivery" as catalog data, so this is a plain JSON
file rather than a live API call — update it whenever your terms change.

### `GET /health`
Liveness check for your deployment platform.

All routes (except `/health`) require the header
`x-webhook-secret: <WEBHOOK_SHARED_SECRET>` when that env var is set.

## Wiring into Hermes/OpenClaw

In your WhatsApp workflow, after classifying what the customer is asking
about, add an HTTP Request node:

- **Method**: `POST` (search) or `GET` (product/policies)
- **URL**: `https://<your-deployment>/catalog/search`
- **Headers**: `Content-Type: application/json`, `x-webhook-secret: <secret>`
- **Body** (for search): `{ "query": "{{customer_message}}" }`

Feed the JSON response into whatever node formats the WhatsApp reply text
(a template node, or an LLM node that turns the structured data into a
natural sentence).

## Limitations

- Read-only: no order/cart creation. If you later want the bot to place
  orders, that's the Wix eCommerce Checkout API and a separate, more
  sensitive integration (it needs write scopes).
- `/catalog/search` matches on product `name` and `description` only —
  it won't understand synonyms or typos beyond Wix's own fuzzy matching.
- Payment and delivery terms are static config, not derived from your Wix
  site's actual checkout/shipping settings.
