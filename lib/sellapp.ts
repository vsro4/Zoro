import "server-only";

import { mockSellAppProducts } from "@/lib/mock-sellapp";
import type {
  SellAppPaymentMethod,
  SellAppPaymentMethodsResponse,
  SellAppProduct,
  SellAppProductsResponse,
} from "@/types/sellapp";

const SELL_APP_API_BASE_URL =
  process.env.SELL_APP_API_BASE_URL ?? "https://sell.app/api";
const MAX_PRODUCT_PAGES = 20;

export const SELL_APP_PRODUCTS_TAG = "sellapp-products";
export const SELL_APP_PAYMENT_METHODS_TAG = "sellapp-payment-methods";

interface SellAppConfig {
  apiKey: string;
  store: string;
}

function getSellAppConfig(): SellAppConfig | null {
  const apiKey = process.env.SELL_APP_API_KEY;
  const store = process.env.SELL_APP_STORE;

  if (!apiKey && process.env.NODE_ENV === "development") {
    return null;
  }

  if (!apiKey) {
    throw new Error("SELL_APP_API_KEY is not configured.");
  }

  if (!store) {
    throw new Error("SELL_APP_STORE is not configured.");
  }

  return { apiKey, store };
}

async function fetchProductPage(
  url: string,
  config: SellAppConfig,
): Promise<SellAppProductsResponse> {
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${config.apiKey}`,
      "X-STORE": config.store,
    },
    next: {
      revalidate: 60,
      tags: [SELL_APP_PRODUCTS_TAG],
    },
  });

  if (!response.ok) {
    throw new Error(`Sell.app products request failed with ${response.status}.`);
  }

  const payload = (await response.json()) as SellAppProductsResponse;

  if (!Array.isArray(payload.data)) {
    throw new Error("Sell.app returned an invalid products response.");
  }

  return payload;
}

export async function getSellAppProducts(): Promise<SellAppProduct[]> {
  const config = getSellAppConfig();

  if (!config) {
    return mockSellAppProducts;
  }

  const products: SellAppProduct[] = [];
  let nextUrl: string | null =
    `${SELL_APP_API_BASE_URL}/v2/products?limit=100&page=1`;

  for (let page = 0; nextUrl && page < MAX_PRODUCT_PAGES; page += 1) {
    const payload = await fetchProductPage(nextUrl, config);
    products.push(...payload.data);

    const candidate = payload.links?.next;
    if (!candidate) {
      nextUrl = null;
      continue;
    }

    const parsedNextUrl = new URL(candidate);
    const apiBaseUrl = new URL(SELL_APP_API_BASE_URL);
    if (parsedNextUrl.origin !== apiBaseUrl.origin) {
      throw new Error("Sell.app returned an unexpected pagination URL.");
    }

    nextUrl = parsedNextUrl.toString();
  }

  return products.filter((product) => product.visibility === "PUBLIC");
}

export async function getSellAppPaymentMethods(): Promise<
  SellAppPaymentMethod[]
> {
  const config = getSellAppConfig();

  if (!config) {
    return [];
  }

  const response = await fetch(`${SELL_APP_API_BASE_URL}/v2/payment-methods`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${config.apiKey}`,
      "X-STORE": config.store,
    },
    next: {
      revalidate: 60,
      tags: [SELL_APP_PAYMENT_METHODS_TAG],
    },
  });

  if (!response.ok) {
    throw new Error(
      `Sell.app payment methods request failed with ${response.status}.`,
    );
  }

  const payload = (await response.json()) as SellAppPaymentMethodsResponse;

  if (!Array.isArray(payload.data)) {
    throw new Error("Sell.app returned an invalid payment methods response.");
  }

  return payload.data.filter(
    (method) =>
      method.enabled &&
      method.status === "enabled" &&
      method.health_status === "healthy",
  );
}
