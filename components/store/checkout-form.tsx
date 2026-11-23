"use client";

import {
  ArrowRight,
  CircleCheck,
  LockKeyhole,
  WalletCards,
} from "lucide-react";
import Script from "next/script";
import { useState } from "react";

import type {
  SellAppPaymentMethod,
  SellAppVariant,
} from "@/types/sellapp";

interface CheckoutFormProps {
  paymentMethods: SellAppPaymentMethod[];
  productId: number;
  soldOut: boolean;
  storeId: number;
  variants: SellAppVariant[];
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function CheckoutForm({
  paymentMethods,
  productId,
  soldOut,
  storeId,
  variants,
}: CheckoutFormProps) {
  const [customerEmail, setCustomerEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(
    paymentMethods[0]?.id ?? "",
  );
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(
    variants[0]?.id ?? 0,
  );

  const emailIsValid = EMAIL_PATTERN.test(customerEmail.trim());
  const checkoutAvailable =
    !soldOut &&
    storeId > 0 &&
    productId > 0 &&
    variants.length > 0 &&
    paymentMethods.length > 0 &&
    selectedVariant > 0 &&
    emailIsValid;

  return (
    <>
      <Script
        crossOrigin="anonymous"
        src="https://cdn.sell.app/embed/script.js"
        strategy="afterInteractive"
        type="module"
      />

      <div className="space-y-5">
        <div>
          <label
            className="font-mono text-xs uppercase tracking-[0.16em] text-white/65"
            htmlFor="customer-email"
          >
            Delivery email
          </label>
          <input
            autoComplete="email"
            className="mt-3 h-[3.125rem] w-full rounded-xl border border-white/10 bg-white/[0.035] px-4 text-sm text-chrome outline-none transition placeholder:text-white/45 focus:border-crimson/60"
            id="customer-email"
            onChange={(event) => setCustomerEmail(event.target.value)}
            placeholder="you@example.com"
            required
            type="email"
            value={customerEmail}
          />
          {customerEmail && !emailIsValid ? (
            <p className="mt-2 text-xs text-red-300">
              Enter a valid email to continue.
            </p>
          ) : null}
        </div>

        <div className="grid gap-4 sm:grid-cols-[1fr_7rem]">
          <div>
            <p
              className="block font-mono text-xs uppercase tracking-[0.16em] text-white/65"
              id="product-variant-label"
            >
              Variant
            </p>
            {variants.length === 1 ? (
              <div
                aria-labelledby="product-variant-label"
                className="mt-3 flex h-[3.125rem] items-center rounded-xl border border-white/10 bg-white/[0.035] px-4 text-sm text-chrome"
                role="status"
              >
                {variants[0].title}
              </div>
            ) : (
              <select
                aria-label="Product variant"
                className="mt-3 h-[3.125rem] w-full rounded-xl border border-white/10 bg-[#111216] px-4 text-sm text-chrome outline-none transition focus:border-crimson/60"
                onChange={(event) =>
                  setSelectedVariant(Number(event.target.value))
                }
                value={selectedVariant}
              >
                {variants.map((variant) => (
                  <option key={variant.id} value={variant.id}>
                    {variant.title}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div>
            <label
              className="block font-mono text-xs uppercase tracking-[0.16em] text-white/65"
              htmlFor="quantity"
            >
              Quantity
            </label>
            <input
              className="mt-3 h-[3.125rem] w-full rounded-xl border border-white/10 bg-white/[0.035] px-4 text-sm text-chrome outline-none transition focus:border-crimson/60"
              id="quantity"
              max={10}
              min={1}
              onChange={(event) => setQuantity(Number(event.target.value))}
              type="number"
              value={quantity}
            />
          </div>
        </div>

        <fieldset>
          <legend className="font-mono text-xs uppercase tracking-[0.16em] text-white/65">
            Payment method
          </legend>
          {paymentMethods.length > 0 ? (
            <div className="mt-3 grid gap-2">
              {paymentMethods.map((method) => (
                <label
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3.5 transition focus-within:ring-2 focus-within:ring-white focus-within:ring-offset-2 focus-within:ring-offset-carbon ${
                    paymentMethod === method.id
                      ? "border-crimson/60 bg-crimson/10"
                      : "border-white/10 bg-white/[0.025] hover:border-white/20"
                  }`}
                  key={method.id}
                >
                  <input
                    checked={paymentMethod === method.id}
                    className="sr-only"
                    name="payment-method"
                    onChange={() => setPaymentMethod(method.id)}
                    type="radio"
                    value={method.id}
                  />
                  <WalletCards
                    aria-hidden="true"
                    className="size-4 text-crimson"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium text-chrome">
                      {method.name}
                    </span>
                    <span className="mt-0.5 block text-xs text-white/60">
                      {method.description}
                    </span>
                  </span>
                  <span className="flex items-center gap-2 text-crimson">
                    <span className="font-mono text-xs uppercase tracking-[0.1em] text-white/60">
                      {method.category}
                    </span>
                    <CircleCheck aria-hidden="true" className="size-4" />
                  </span>
                </label>
              ))}
            </div>
          ) : (
            <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.025] px-4 py-4 text-sm leading-6 text-white/55">
              No payment method is enabled in Sell.app.
            </div>
          )}
        </fieldset>

        <button
          className="flex w-full cursor-pointer items-center justify-between rounded-2xl bg-crimson px-5 py-4 text-left text-white shadow-[0_0_40px_rgba(255,30,66,0.2)] transition hover:bg-[#ff3655] disabled:cursor-not-allowed disabled:opacity-45"
          data-sell-darkmode="true"
          data-sell-disable-cart="true"
          data-sell-email={customerEmail.trim()}
          data-sell-language="en"
          data-sell-payment_method={paymentMethod}
          data-sell-product={productId}
          data-sell-quantity={quantity}
          data-sell-store={storeId}
          data-sell-theme="#ff1e42"
          data-sell-variant={selectedVariant}
          disabled={!checkoutAvailable}
          type="button"
        >
          <span className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-full bg-black/20">
              <LockKeyhole aria-hidden="true" className="size-4" />
            </span>
            <span>
              <span className="block text-sm font-semibold">
                Open secure payment
              </span>
              <span className="mt-0.5 block text-xs text-white/70">
                Opens as a modal without leaving Zoro
              </span>
            </span>
          </span>
          <ArrowRight aria-hidden="true" className="size-5" />
        </button>
      </div>
    </>
  );
}
