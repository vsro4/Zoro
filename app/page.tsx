export default function Home() {
  return (
    <main className="relative isolate flex min-h-dvh items-center overflow-hidden px-6 py-16 sm:px-10 lg:px-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_72%_32%,rgba(255,30,66,0.12),transparent_24%),radial-gradient(circle_at_18%_80%,rgba(255,255,255,0.06),transparent_30%)]"
      />
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-16">
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
