import type { SellAppProduct } from "@/types/sellapp";

const SELL_APP_STORAGE_URL = "https://storage.sell.app";

export function getSellAppProductImage(
  product: SellAppProduct,
  index = 0,
): string | null {
  const image = product.images[index];

  if (!image?.path || !image.path.startsWith("store/")) {
    return null;
  }

  const encodedPath = image.path
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");

  return `${SELL_APP_STORAGE_URL}/${encodedPath}`;
}
