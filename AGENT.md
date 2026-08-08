# Agent guide

Context and conventions for AI agents working in this repository. See `README.md` for setup and a general overview.

## What this project is

A static marketing site for Le Bellagio, a restaurant in Alès, France. Next.js 16 App Router, React 19, TypeScript, Tailwind v4, shadcn/ui v4 on `@base-ui/react`. Package manager is pnpm.

There is deliberately **no database, no API route, no auth and no CMS**. Reservations, orders and contact messages are delivered as pre-filled WhatsApp deep links. Do not introduce a backend, a server action or a form-submission endpoint unless the user explicitly asks for one.

## Commands

```bash
pnpm dev
pnpm build
pnpm exec tsc --noEmit   # the real type check; the build ignores TS errors
```

`pnpm lint` is declared in `package.json` but ESLint is not installed and there is no config, so it will fail. There is no test suite.

## Where things live

| Concern                              | Location                                                                                               |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| Routes and layouts                   | `app/`                                                                                                 |
| Theme, CSS variables, Tailwind setup | `app/globals.css`                                                                                      |
| Page sections                        | `components/home/`, `components/menu/`, `components/reservation/`, `components/order/`                 |
| Shared chrome                        | `components/page-shell.tsx`, `header.tsx`, `footer.tsx`, `mobile-action-bar.tsx`                       |
| Chat assistant                       | `components/chat-bubble/` (`chat-panel.tsx` UI, `use-chat-flow.ts` reducer, `lib/chat-flows.ts` steps) |
| shadcn primitives                    | `components/ui/`                                                                                       |
| All restaurant content               | `lib/restaurant.ts`                                                                                    |
| UI strings                           | `lib/i18n.ts` + `lib/locale-context.tsx`                                                               |
| WhatsApp message builders            | `lib/whatsapp.ts`                                                                                      |
| Open/closed computation              | `lib/open-status.ts`                                                                                   |
| SEO structured data                  | `lib/json-ld.ts`                                                                                       |
| PWA install banner + SW registration | `components/pwa/`                                                                                      |
| Service worker                       | `public/sw.js`                                                                                         |
| Offline fallback page                | `app/offline/page.tsx`                                                                                 |

Never edit `.next/`, `node_modules/`, `.pnpm-store/`, `pnpm-lock.yaml` by hand, or `tsconfig.tsbuildinfo`.

## Conventions

- Files are kebab-case, exports are PascalCase (`hero-section.tsx` exports `HeroSection`).
- Pages are server components that compose `PageShell` plus section components; only interactive leaves carry `"use client"`.
- Import via the `@/` alias (`@/lib/restaurant`, `@/components/ui/button`); it maps to the project root.
- Merge class names with `cn()` from `lib/utils.ts`; use `class-variance-authority` for variants, matching the existing `ui/` components.
- State is plain `useState`/`useReducer`. No Redux, Zustand, react-hook-form or zod — forms use native `FormData`.
- Scroll animations go through the `Reveal` component rather than ad-hoc observers.
- Anything reading `useSearchParams` must be wrapped in `<Suspense>`, as the reservation and order forms already do.
- Tailwind v4 has no config file; add design tokens as CSS variables in `app/globals.css`, not in a `tailwind.config`.
- UI primitives come from `@base-ui/react`, **not Radix**. Copy the import style of the neighbouring `components/ui/` file when adding one.

## Content changes

Menu items, prices, hours, address, phone and social links all belong in `lib/restaurant.ts`. When touching hours, update **both** `HOURS` (display) and `OPENING_HOURS` (drives the live badge and JSON-LD) — they are separate structures that must agree.

New user-facing strings go into both the `fr` and `en` maps in `lib/i18n.ts`, read through `t(locale, key)` with `useLocale()`.

## Gotchas

- `next.config.mjs` sets `typescript.ignoreBuildErrors: true`, so a green build says nothing about type safety. Verify with `tsc --noEmit`.
- `images.unoptimized: true` — Next `Image` works but does not optimise.
- English translations exist but are unreachable: `setLocale` is never called and there is no language switcher. Locale is always `"fr"`. Several page heroes and all legal pages are hardcoded French.
- Reviews in `components/home/reviews-section.tsx` and the coordinates in `RESTAURANT.mapEmbed` are placeholders.
- `@vercel/analytics` is installed but `<Analytics />` is not mounted in the layout.
- The cookie banner only records consent in `localStorage` under `lb_cookie_consent`; no scripts are actually gated behind it.
- The header's mobile hamburger/`Sheet` is commented out on purpose — mobile navigation is the bottom `MobileActionBar`.
- The project was scaffolded with v0, so `.gitignore` carries v0 and Vercel artefacts and `package.json` is still named `my-project`.

## PWA

The site is installable: `public/site.webmanifest` declares standalone display, icons and shortcuts, and `public/sw.js` is a hand-written service worker (no Workbox/Serwist) that precaches the app shell and applies cache-first for static assets, network-first with an `/offline` fallback for navigations. It ignores non-GET, cross-origin and `?_rsc=` requests so it never serves a stale RSC payload.

- **Releasing a change**: bump `VERSION` at the top of `public/sw.js`. That renames the cache keys, so `activate` deletes the old ones on the next visit. Forgetting this means old assets can linger in `lb-precache-*`/`lb-runtime-*` caches.
- The service worker only registers in production (`components/pwa/service-worker-register.tsx` checks `NODE_ENV`), so `pnpm dev` never has stale-cache surprises.
- `components/pwa/install-prompt.tsx` shows a custom install banner, mirroring `cookie-banner.tsx`'s styling and `localStorage` pattern (`lb_pwa_install`). It listens for `beforeinstallprompt` on Chrome/Android and shows a manual "Add to Home Screen" hint on iOS Safari (no such event there). It waits for cookie consent (`lb_cookie_consent`) so the two bottom banners never stack.
- `next.config.mjs` sends `Cache-Control: no-cache` and `Service-Worker-Allowed: /` for `/sw.js` so browsers always fetch the latest worker file instead of caching it.
