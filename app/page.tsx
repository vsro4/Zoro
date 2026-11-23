import { ProductCard } from "@/components/store/product-card";
import { getSellAppProducts } from "@/lib/sellapp";
import type { SellAppProduct } from "@/types/sellapp";

export const dynamic = "force-dynamic";
export const revalidate = 60;

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
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-mist">
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
          <div className="mb-8 flex flex-wrap items-end gap-x-6 gap-y-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-crimson">
                Synced with Sell.app
              </p>
              <h2
                className="mt-3 font-display text-4xl font-semibold uppercase leading-none tracking-[-0.035em] sm:text-5xl"
                id="live-products"
              >
                Live products
              </h2>
            </div>
            <span className="mb-1 rounded-full border border-liquid-chrome bg-white/[0.025] px-3 py-2 font-mono text-xs uppercase tracking-[0.14em] text-white/65">
              {products.length} {products.length === 1 ? "product" : "products"}
            </span>
          </div>

          {products.length > 0 ? (
            <div
              className={
                products.length === 1
                  ? "w-full"
                  : "grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
              }
            >
              {products.map((product) => (
                <ProductCard
                  featured={products.length === 1}
                  key={product.id}
                  product={product}
                />
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
                <span className="font-mono text-xs text-mist">
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
