import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { getSellAppProducts } from "@/lib/sellapp";
import { getSellAppProductImage } from "@/lib/sellapp-image";
import type { SellAppProduct } from "@/types/sellapp";

export const dynamic = "force-dynamic";
export const revalidate = 60;

function ProductCard({ product }: { product: SellAppProduct }) {
  const imageUrl = getSellAppProductImage(product);
  const stockLabel = product.sold_out
    ? "Out of stock"
    : product.stock === null
      ? "Instant delivery"
      : `${product.stock} available`;

  const content = (
    <>
      <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-xl border border-liquid-chrome bg-[radial-gradient(circle_at_70%_30%,rgba(255,30,66,0.18),transparent_38%),#07080b]">
        {imageUrl ? (
          <Image
            alt={product.title}
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
            fill
            sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
            src={imageUrl}
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center font-display text-4xl font-bold uppercase text-white/10">
            Zoro
          </div>
        )}
      </div>
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-mist">
            {stockLabel}
          </p>
          <h3 className="mt-3 font-display text-2xl font-semibold uppercase tracking-[-0.04em]">
            {product.title}
          </h3>
        </div>
        <ArrowUpRight aria-hidden="true" className="size-5 text-mist" />
      </div>
      <div className="mt-10 flex items-end justify-between gap-4">
        <span className="font-mono text-lg text-chrome">
          {product.price_range}
        </span>
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-mist">
          {product.variants.length}{" "}
          {product.variants.length === 1 ? "variant" : "variants"}
        </span>
      </div>
    </>
  );

  const className =
    "group block rounded-2xl border border-liquid-chrome bg-carbon/80 p-5 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.055]";

  return (
    <Link
      className={className}
      href={`/product/${encodeURIComponent(product.slug)}`}
    >
      {content}
    </Link>
  );
}

export default async function Home() {
  let products: SellAppProduct[] = [];

  try {
    products = await getSellAppProducts();
  } catch (error) {
    console.error("Unable to render Sell.app products.", error);
  }

  return (
    <main className="relative isolate min-h-dvh overflow-hidden px-6 py-16 sm:px-10 lg:px-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_72%_32%,rgba(255,30,66,0.12),transparent_24%),radial-gradient(circle_at_18%_80%,rgba(255,255,255,0.06),transparent_30%)]"
      />
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-20">
        <header className="flex items-center justify-between border-b border-liquid-chrome pb-5">
          <span className="font-display text-xl font-bold uppercase tracking-[0.22em]">
            Zoro
          </span>
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-mist">
            Phase 01 / Core online
          </span>
        </header>

        <section className="max-w-5xl">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.28em] text-crimson">
            Digital access, evolved
          </p>
          <h1 className="text-balance font-display text-5xl font-bold uppercase leading-[0.9] tracking-[-0.055em] text-chrome sm:text-7xl lg:text-9xl">
            The next form of digital commerce.
          </h1>
          <p className="mt-8 max-w-xl text-pretty text-base leading-7 text-mist sm:text-lg">
            A precision-built storefront for instant digital banking, crypto,
            and telecom products.
          </p>
        </section>

        <section aria-labelledby="live-products">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-crimson">
                Synced with Sell.app
              </p>
              <h2
                className="mt-3 font-display text-3xl font-semibold uppercase tracking-[-0.045em] sm:text-5xl"
                id="live-products"
              >
                Live products
              </h2>
            </div>
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-mist">
              {products.length} {products.length === 1 ? "product" : "products"}
            </span>
          </div>

          {products.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-liquid-chrome bg-carbon/70 p-8 text-sm text-mist">
              Products are temporarily unavailable.
            </div>
          )}
        </section>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-liquid-chrome bg-liquid-chrome sm:grid-cols-3">
          {["Secure by design", "Instant delivery", "Bilingual ready"].map(
            (label, index) => (
              <div
                className="flex items-center justify-between bg-carbon px-5 py-4"
                key={label}
              >
                <span className="text-sm text-chrome">{label}</span>
                <span className="font-mono text-[0.65rem] text-mist">
                  0{index + 1}
                </span>
              </div>
            ),
          )}
        </div>
      </div>
    </main>
  );
}
