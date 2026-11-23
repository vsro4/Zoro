import type { SellAppProduct } from "@/types/sellapp";

const timestamp = "2026-01-01T00:00:00.000000Z";

function mockProduct(
  id: number,
  title: string,
  slug: string,
  price: string,
  stock: number,
): SellAppProduct {
  return {
    id,
    title,
    slug,
    description: `${title} digital product with instant delivery.`,
    images: [],
    visibility: "PUBLIC",
    variants: [{ id: id * 10, title: "Default" }],
    url: "",
    price_range: price,
    stock,
    sales: 0,
    sold_out: stock === 0,
    created_at: timestamp,
    updated_at: timestamp,
  };
}

export const mockSellAppProducts: SellAppProduct[] = [
  mockProduct(1, "MyFawry Yellow Card", "myfawry-yellow-card", "$150.00", 18),
  mockProduct(2, "Telda", "telda", "$120.00", 12),
  mockProduct(3, "Kast Banking", "kast-banking", "$95.00", 9),
  mockProduct(4, "RedotPay", "redotpay", "$110.00", 14),
  mockProduct(5, "Binance", "binance", "$80.00", 20),
  mockProduct(6, "KuCoin", "kucoin", "$75.00", 16),
  mockProduct(7, "Bybit", "bybit", "$70.00", 11),
  mockProduct(8, "Vodafone eSIM", "vodafone-esim", "$25.00", 30),
  mockProduct(9, "Orange eSIM", "orange-esim", "$25.00", 24),
  mockProduct(10, "Etisalat eSIM", "etisalat-esim", "$25.00", 28),
];
