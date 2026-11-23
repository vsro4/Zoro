# Zoro

Zoro is a next-generation bilingual storefront for digital banking, crypto,
and telecom products. It is built with Next.js App Router, strict TypeScript,
Tailwind CSS v4, and a motion stack ready for React Three Fiber, GSAP, Framer
Motion, and Lenis.

## Requirements

- Node.js 20.9 or newer
- npm 10 or newer

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The Phase 1 shell does not need Sell.app credentials. From Phase 2 onward,
populate the three values in `.env.local`; they are server-only and must never
use the `NEXT_PUBLIC_` prefix.

## Commands

```bash
npm run dev        # Start the local development server
npm run lint       # Run ESLint
npm run typecheck  # Run strict TypeScript checks
npm run build      # Create a production build
npm run start      # Serve the production build
```

## Architecture

```text
app/
├── api/sellapp/      # Server-only Sell.app route handlers
├── product/[slug]/   # Product detail routes
├── reviews/          # Reputation hub
├── store/            # Searchable storefront
├── globals.css       # Tailwind v4 theme and global design tokens
├── layout.tsx        # Root metadata and bilingual font setup
└── page.tsx          # Landing route
components/
├── effects/          # Motion and interaction effects
├── layout/           # Navigation and shared page chrome
├── store/            # Catalog and checkout interfaces
├── three/            # WebGL scenes, materials, and shader code
└── ui/               # Accessible metallic/glass primitives
lib/                  # Sell.app client, cache helpers, and shared utilities
public/               # Static assets and non-WebGL fallbacks
types/                # Shared TypeScript contracts
```

Placeholder files preserve these boundaries until each owning phase replaces
them with its implementation.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `SELL_APP_API_KEY` | Private Sell.app v2 API credential |
| `SELL_APP_STORE` | Storefront slug used by the Sell.app `X-STORE` header |
| `SELL_APP_WEBHOOK_SECRET` | Signature secret for on-demand revalidation webhooks |
