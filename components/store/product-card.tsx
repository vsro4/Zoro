import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { getSellAppProductImage } from "@/lib/sellapp-image";
import type { SellAppProduct } from "@/types/sellapp";

interface ProductCardProps {
  featured?: boolean;
  product: SellAppProduct;
}

export function ProductCard({
  featured = false,
  product,
}: ProductCardProps) {
  const imageUrl = getSellAppProductImage(product);
  const stockLabel = product.sold_out
    ? "Sold out"
    : product.stock === null
      ? "Instant delivery"
      : `${product.stock} in stock`;

  return (
    <Link
      className={`group block overflow-hidden rounded-[1.75rem] border border-liquid-chrome bg-carbon/90 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_24px_80px_rgba(0,0,0,0.45)] ${
        featured
          ? "md:grid md:grid-cols-[minmax(0,1.08fr)_minmax(18rem,0.92fr)]"
          : ""
      }`}
      href={`/product/${encodeURIComponent(product.slug)}`}
    >
      <div
        className={`relative aspect-[4/5] overflow-hidden bg-[radial-gradient(circle_at_70%_25%,rgba(255,30,66,0.14),transparent_35%),linear-gradient(145deg,#101116,#050507)] ${
          featured
            ? "border-b border-liquid-chrome md:aspect-auto md:min-h-[32rem] md:border-b-0 md:border-r"
            : "border-b border-liquid-chrome"
        }`}
      >
        <div
          aria-hidden="true"
          className="absolute inset-x-[18%] top-[16%] h-[44%] rounded-full bg-crimson/10 blur-3xl transition duration-500 group-hover:bg-crimson/15"
        />
        {imageUrl ? (
          <Image
            alt={product.title}
            className="object-contain p-5 transition duration-500 group-hover:scale-[1.015] sm:p-7"
            fill
            loading={featured ? "eager" : "lazy"}
            sizes="(min-width: 1280px) 30vw, (min-width: 640px) 50vw, 100vw"
            src={imageUrl}
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center font-display text-5xl font-bold uppercase text-white/10">
            Zoro
          </div>
        )}

      </div>

      <div
        className={`p-6 ${
          featured ? "md:flex md:flex-col md:justify-center md:p-10" : ""
        }`}
      >
        <span className="mb-5 w-fit rounded-full border border-white/10 bg-white/[0.035] px-3 py-2 font-mono text-xs uppercase tracking-[0.14em] text-white/70">
          {stockLabel}
        </span>
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-white/65">
          Digital access · {product.variants.length}{" "}
          {product.variants.length === 1 ? "variant" : "variants"}
        </p>
        <h3
          className={`mt-3 text-balance font-display font-semibold uppercase leading-none tracking-[-0.035em] text-chrome ${
            featured
              ? "text-[2rem] sm:text-[2.65rem]"
              : "text-[1.75rem] sm:text-[2rem]"
          }`}
        >
          {product.title}
        </h3>

        <div
          className={`flex items-end justify-between gap-4 border-t border-liquid-chrome pt-5 ${
            featured ? "mt-10 md:mt-14" : "mt-7"
          }`}
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-white/60">
              From
            </p>
            <p className="mt-1 font-mono text-xl text-chrome">
              {product.price_range}
            </p>
          </div>
          <span className="grid size-11 place-items-center rounded-full bg-crimson text-white shadow-[0_0_30px_rgba(255,30,66,0.22)] transition duration-300 group-hover:rotate-45 group-hover:bg-white group-hover:text-abyss">
            <ArrowUpRight aria-hidden="true" className="size-5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
