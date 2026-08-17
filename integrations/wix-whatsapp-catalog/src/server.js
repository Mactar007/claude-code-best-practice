import 'dotenv/config';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import express from 'express';
import { searchProducts, getProduct } from './wixClient.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const storePolicies = JSON.parse(
  readFileSync(path.join(__dirname, '../config/store-policies.json'), 'utf8'),
);

const app = express();
app.use(express.json());

// Shared secret so the public webhook URL can't be called by anyone who
// finds it — set WEBHOOK_SHARED_SECRET and have your Hermes/OpenClaw HTTP
// node send it back as `x-webhook-secret`.
app.use((req, res, next) => {
  const secret = process.env.WEBHOOK_SHARED_SECRET;
  if (secret && req.get('x-webhook-secret') !== secret) {
    return res.status(401).json({ error: 'unauthorized' });
  }
  next();
});

app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Called when the customer names a product loosely ("vous avez du riz
// parfumé ?"). Returns candidate matches with price and stock status.
app.post('/catalog/search', async (req, res) => {
  const { query, limit } = req.body ?? {};
  if (!query) return res.status(400).json({ error: 'query is required' });
  try {
    const results = await searchProducts(query, limit || 5);
    res.json({ results });
  } catch (err) {
    res.status(502).json({ error: err.message });
  }
});

// Called once the workflow already has a specific productId (e.g. after
// a /catalog/search call) and needs the authoritative price/stock.
app.get('/catalog/product/:id', async (req, res) => {
  try {
    const product = await getProduct(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(502).json({ error: err.message });
  }
});

// Payment & delivery terms aren't per-product data in Wix Stores, so
// they're kept in config/store-policies.json and served as-is.
app.get('/catalog/policies', (req, res) => {
  res.json(storePolicies);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Wix catalog webhook listening on port ${port}`));
