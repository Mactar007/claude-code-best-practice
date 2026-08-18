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

// dakardiscount.com runs Wix Stores Catalog V1 (confirmed via GetSiteContext),
// not the newer V3 catalog — V1 and V3 endpoints are not interchangeable.
function formatProduct(product) {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug ?? null,
    description: product.description ?? null,
    price: product.priceData?.formatted?.price ?? null,
    discountedPrice: product.priceData?.formatted?.discountedPrice ?? null,
    currency: product.priceData?.currency ?? null,
    inStock: product.stock?.inventoryStatus === 'IN_STOCK',
    availabilityStatus: product.stock?.inventoryStatus ?? null,
    url: product.productPageUrl
      ? `${product.productPageUrl.base}${product.productPageUrl.path}`
      : null,
  };
}

// Free-text search on product name. Used to answer "avez-vous X ?" /
// "quel est le prix de X ?" style questions. Catalog V1's filter is a
// JSON-stringified object, not a nested JSON body like V3.
export async function searchProducts(query, limit = 5) {
  const response = await fetch(`${WIX_API_BASE}/stores/v1/products/query`, {
    method: 'POST',
    headers: wixHeaders(),
    body: JSON.stringify({
      query: {
        filter: JSON.stringify({ name: { $contains: query } }),
        paging: { limit },
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
  const response = await fetch(`${WIX_API_BASE}/stores/v1/products/${productId}`, {
    headers: wixHeaders(),
  });
  if (!response.ok) {
    throw new Error(`Wix get product failed: ${response.status} ${await response.text()}`);
  }
  const { product } = await response.json();
  return formatProduct(product);
}
