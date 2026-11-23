import { ArrowLeft, Check, PackageCheck, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getSellAppProducts } from "@/lib/sellapp";
import { getSellAppProductImage } from "@/lib/sellapp-image";

export const dynamic = "force-dynamic";
export const revalidate = 60;

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

function plainText(html: string) {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

async function findProduct(slug: string) {
  const products = await getSellAppProducts();
  return products.find((product) => product.slug === slug);
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await findProduct(slug);

  if (!product) {
    return { title: "Product not found" };
  }

  return {
    title: product.title,
    description:
      plainText(product.description) || `${product.title} from Zoro.`,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await findProduct(slug);

  if (!product) {
    notFound();
  }

  const description =
    plainText(product.description) ||
    "Instant digital delivery, securely fulfilled after checkout.";
  const imageUrl = getSellAppProductImage(product);
  const stockLabel = product.sold_out
    ? "Out of stock"
    : product.stock === null
      ? "Available for instant delivery"
      : `${product.stock} available`;

  return (
    <main className="relative isolate min-h-dvh overflow-hidden px-6 py-10 sm:px-10 lg:px-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_75%_24%,rgba(255,30,66,0.14),transparent_26%),radial-gradient(circle_at_15%_85%,rgba(255,255,255,0.05),transparent_28%)]"
      />

      <div className="mx-auto w-full max-w-7xl">
        <header className="flex items-center justify-between border-b border-liquid-chrome pb-5">
          <Link
            className="font-display text-xl font-bold uppercase tracking-[0.22em]"
            href="/"
          >
            Zoro
          </Link>
          <Link
            className="flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-mist transition hover:text-chrome"
            href="/"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back to catalog
          </Link>
        </header>

        <div className="grid gap-12 py-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(22rem,0.85fr)] lg:items-start lg:py-24">
          <section>
            <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-3xl border border-liquid-chrome bg-[radial-gradient(circle_at_70%_30%,rgba(255,30,66,0.18),transparent_38%),#07080b]">
              {imageUrl ? (
                <Image
                  alt={product.title}
                  className="object-cover"
                  fill
                  priority
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  src={imageUrl}
                />
              ) : (
                <div className="absolute inset-0 grid place-items-center font-display text-7xl font-bold uppercase text-white/10">
                  Zoro
                </div>
              )}
            </div>
            <p className="font-mono text-xs uppercase tracking-[0.26em] text-crimson">
              Live Sell.app product
            </p>
            <h1 className="mt-6 text-balance font-display text-5xl font-bold uppercase leading-[0.92] tracking-[-0.055em] sm:text-7xl">
              {product.title}
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-mist">
              {description}
            </p>

            <div className="mt-12 grid gap-3 sm:grid-cols-3">
              {[
                { icon: PackageCheck, label: "Instant delivery" },
                { icon: ShieldCheck, label: "Secure fulfillment" },
                { icon: Check, label: "Verified inventory" },
              ].map(({ icon: Icon, label }) => (
                <div
                  className="rounded-xl border border-liquid-chrome bg-carbon/70 p-4"
                  key={label}
                >
                  <Icon aria-hidden="true" className="size-4 text-crimson" />
                  <p className="mt-5 text-sm text-chrome">{label}</p>
                </div>
              ))}
            </div>
          </section>

          <aside className="rounded-3xl border border-liquid-chrome bg-carbon/90 p-6 shadow-2xl shadow-black/30 sm:p-8">
            <div className="flex items-start justify-between gap-6 border-b border-liquid-chrome pb-6">
              <div>
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-mist">
                  Starting price
                </p>
                <p className="mt-2 font-mono text-3xl text-chrome">
                  {product.price_range}
                </p>
              </div>
              <span
                className={`rounded-full border px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] ${
                  product.sold_out
                    ? "border-white/10 text-mist"
                    : "border-crimson/30 bg-crimson/10 text-crimson"
                }`}
              >
                {stockLabel}
              </span>
            </div>

            <div className="py-6">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-mist">
                Available variants
              </p>
              <div className="mt-3 grid gap-2">
                {product.variants.map((variant) => (
                  <div
                    className="flex items-center justify-between rounded-xl border border-liquid-chrome bg-white/[0.025] px-4 py-3"
                    key={variant.id}
                  >
                    <span className="text-sm text-chrome">{variant.title}</span>
                    <span className="size-2 rounded-full bg-crimson shadow-[0_0_18px_rgba(255,30,66,0.8)]" />
                  </div>
                ))}
              </div>
            </div>

            <p className="border-t border-liquid-chrome pt-6 text-sm leading-6 text-mist">
              Checkout will remain inside Zoro. Sell.app is used securely on the
              server for inventory and fulfillment.
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}
