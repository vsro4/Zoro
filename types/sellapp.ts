export interface SellAppVariant {
  id: number;
  title: string;
}

export interface SellAppProduct {
  id: number;
  title: string;
  slug: string;
  description: string;
  images: string[];
  visibility: "PUBLIC" | "HIDDEN" | string;
  variants: SellAppVariant[];
  url: string;
  price_range: string;
  stock: number | null;
  sales: number;
  sold_out: boolean;
  created_at: string;
  updated_at: string;
}

export interface SellAppPaginationLinks {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface SellAppPaginationMeta {
  current_page: number;
  per_page: number;
  total: number;
}

export interface SellAppProductsResponse {
  data: SellAppProduct[];
  links: SellAppPaginationLinks;
  meta: SellAppPaginationMeta;
}
