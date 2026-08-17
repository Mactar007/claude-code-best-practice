const WIX_API_BASE = 'https://www.wixapis.com';

function wixHeaders() {
  const apiKey = process.env.WIX_API_KEY;
  const siteId = process.env.WIX_SITE_ID;
  if (!apiKey || !siteId) {
    throw new Error('WIX_API_KEY and WIX_SITE_ID must be set');
  }
  return {
    'Content-Type': 'application/json',
    Authorization: apiKey,
    'wix-site-id': siteId,
  };
}

function formatProduct(product) {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug ?? null,
    description: product.plainDescription ?? null,
    price: product.actualPriceRange?.minValue?.formattedAmount ?? null,
    currency: product.currency ?? null,
    inStock: product.inventory?.availabilityStatus === 'IN_STOCK',
    availabilityStatus: product.inventory?.availabilityStatus ?? null,
  };
}

// Free-text search across product name/description. Used to answer
// "avez-vous X ?" / "quel est le prix de X ?" style questions.
export async function searchProducts(query, limit = 5) {
  const response = await fetch(`${WIX_API_BASE}/stores/v3/products/search`, {
    method: 'POST',
    headers: wixHeaders(),
    body: JSON.stringify({
      fields: ['CURRENCY'],
      search: {
        search: { expression: query, fields: ['name', 'description'] },
        cursorPaging: { limit },
      },
    }),
  });
  if (!response.ok) {
    throw new Error(`Wix search failed: ${response.status} ${await response.text()}`);
  }
  const data = await response.json();
  return (data.products || []).map(formatProduct);
}

// Full detail for one product, including live stock status, once the
// workflow already knows which productId it's asking about.
export async function getProduct(productId) {
  const params = new URLSearchParams();
  ['CURRENCY', 'DESCRIPTION'].forEach((f) => params.append('fields', f));
  const response = await fetch(
    `${WIX_API_BASE}/stores/v3/products/${productId}?${params.toString()}`,
    { headers: wixHeaders() },
  );
  if (!response.ok) {
    throw new Error(`Wix get product failed: ${response.status} ${await response.text()}`);
  }
  const { product } = await response.json();
  return formatProduct(product);
}
