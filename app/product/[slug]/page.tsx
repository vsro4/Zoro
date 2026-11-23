import {
  ArrowLeft,
  Check,
  LockKeyhole,
  PackageCheck,
  ShieldCheck,
} from "lucide-react";
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

  const sourceDescription = plainText(product.description);
  const description =
    sourceDescription.length > 28
      ? sourceDescription
      : "Verified digital access with secure inventory and instant fulfillment.";
  const imageUrl = getSellAppProductImage(product);
  const stockLabel = product.sold_out
    ? "Out of stock"
    : product.stock === null
      ? "Instant delivery"
      : `${product.stock} in stock`;

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

        <div className="grid gap-10 py-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(24rem,0.78fr)] lg:items-start lg:gap-16 lg:py-20">
          <section className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-liquid-chrome bg-[radial-gradient(circle_at_70%_24%,rgba(255,30,66,0.15),transparent_34%),linear-gradient(145deg,#101116,#050507)] lg:aspect-auto lg:h-[72vh] lg:min-h-[34rem] lg:max-h-[46rem]">
            <div
              aria-hidden="true"
              className="absolute inset-x-[18%] top-[18%] h-[42%] rounded-full bg-crimson/10 blur-3xl"
            />
            {imageUrl ? (
              <Image
                alt={product.title}
                className="object-contain p-6 sm:p-10"
                fill
                priority
                sizes="(min-width: 1024px) 52vw, 100vw"
                src={imageUrl}
              />
            ) : (
              <div className="absolute inset-0 grid place-items-center font-display text-7xl font-bold uppercase text-white/10">
                Zoro
              </div>
            )}
          </section>

          <aside className="lg:sticky lg:top-10">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-crimson">
              Digital banking &amp; cards
            </p>
            <h1 className="mt-5 text-balance font-display text-5xl font-bold uppercase leading-[0.92] tracking-[-0.04em] sm:text-6xl">
              {product.title}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/60 sm:text-lg sm:leading-8">
              {description}
            </p>

            <div className="mt-9 rounded-[1.75rem] border border-liquid-chrome bg-carbon/90 p-6 shadow-2xl shadow-black/30 sm:p-7">
              <div className="flex items-start justify-between gap-5 border-b border-liquid-chrome pb-6">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-white/65">
                    Starting at
                  </p>
                  <p className="mt-2 font-mono text-3xl text-chrome">
                    {product.price_range}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full border px-3 py-2 font-mono text-[0.68rem] uppercase tracking-[0.12em] ${
                    product.sold_out
                      ? "border-white/10 text-white/50"
                      : "border-crimson/30 bg-crimson/10 text-crimson"
                  }`}
                >
                  {stockLabel}
                </span>
              </div>

              <div className="py-6">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-white/65">
                  Choose variant
                </p>
                <div className="mt-3 grid gap-2">
                  {product.variants.map((variant) => (
                    <div
                      className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3.5"
                      key={variant.id}
                    >
                      <span className="text-sm font-medium text-chrome">
                        {variant.title}
                      </span>
                      <Check
                        aria-hidden="true"
                        className="size-4 text-crimson"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-liquid-chrome bg-white/[0.035] px-5 py-4 text-white">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-crimson/10 text-crimson">
                  <LockKeyhole aria-hidden="true" className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold">Local secure checkout</p>
                  <p className="mt-0.5 text-xs leading-5 text-white/60">
                    This status panel will become active with checkout.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2">
              {[
                { icon: PackageCheck, label: "Instant" },
                { icon: ShieldCheck, label: "Secure" },
                { icon: Check, label: "Verified" },
              ].map(({ icon: Icon, label }) => (
                <div
                  className="flex min-w-0 items-center justify-center gap-2 rounded-xl border border-liquid-chrome bg-white/[0.02] px-2 py-3 text-white/75"
                  key={label}
                >
                  <Icon
                    aria-hidden="true"
                    className="size-3.5 shrink-0 text-crimson"
                  />
                  <span className="truncate text-xs">{label}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
