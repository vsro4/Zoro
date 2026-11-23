export interface SellAppVariant {
  id: number;
  title: string;
}

export interface SellAppImage {
  path: string;
  metadata: {
    size: number;
    filename: string;
    extension: string;
    mime_type: string;
  };
}

export interface SellAppProduct {
  id: number;
  title: string;
  slug: string;
  description: string;
  images: SellAppImage[];
  store_id: number;
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

export interface SellAppPaymentMethod {
  id: string;
  name: string;
  description: string;
  category: "processor" | "crypto";
  connection_type: "oauth" | "api_keys" | "wallet" | "custom";
  status: "disconnected" | "configured" | "enabled";
  enabled: boolean;
  health_status: "disconnected" | "healthy" | "attention_required";
}

export interface SellAppPaymentMethodsResponse {
  data: SellAppPaymentMethod[];
}
