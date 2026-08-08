---
name: "MVP polish: WhatsApp, badge, SEO"
overview: Make the three forms deliver via WhatsApp deep links, add a live "Open now / Closed" badge computed from restaurant hours, and add the full SEO layer (JSON-LD, sitemap, robots, OG image, metadataBase).
todos:
  - id: whatsapp-helper
    content: Create lib/whatsapp.ts helper and wire reservation, order, and contact forms to open wa.me with prefilled details
    status: completed
  - id: chat-bubble
    content: Add WhatsApp send button to chat-bubble success screen
    status: completed
  - id: open-badge
    content: Add structured hours + open-status logic and live badge in header and hero
    status: completed
  - id: seo
    content: Add metadataBase, JSON-LD Restaurant schema, sitemap.ts, robots.ts, and opengraph-image.tsx
    status: completed
  - id: verify
    content: Verify forms, badge, and SEO endpoints in the dev server
    status: completed
isProject: false
---

# MVP Polish: WhatsApp Delivery, Open-Now Badge, SEO

## 1. Forms deliver via WhatsApp

New helper [lib/whatsapp.ts](lib/whatsapp.ts): `buildWhatsAppUrl(message: string)` returning `https://wa.me/33466529959?text=` + encoded message (number from `RESTAURANT.phoneRaw`).

Wire into all three forms. Pattern: on submit, read field values via `FormData` (inputs are currently uncontrolled) plus the controlled state (date/time/guests/pickup/payment), build a readable FR/EN message, `window.open(url, "_blank")`, then show the existing success screen — amended with a "Renvoyer sur WhatsApp" button holding the same link as a popup-blocker fallback, and success copy updated to say the request opens in WhatsApp and isn't confirmed until the restaurant replies.

- [components/reservation/reservation-form.tsx](components/reservation/reservation-form.tsx) — message with name, phone, date (formatted per locale), time, guests, notes.
- [components/order/order-form.tsx](components/order/order-form.tsx) — name, phone, pickup time, order contents, payment method.
- [components/home/contact-section.tsx](components/home/contact-section.tsx) — name, email, message.
- Chat bubble success screen ([components/chat-bubble/chat-panel.tsx](components/chat-bubble/chat-panel.tsx), `state.submitted` branch) — add a "Envoyer sur WhatsApp" button built from `state.answers`, next to the existing prefilled-form link.

New i18n keys in [lib/i18n.ts](lib/i18n.ts) for the WhatsApp button labels and adjusted success copy.

## 2. Live "Ouvert maintenant" badge

Add structured hours to [lib/restaurant.ts](lib/restaurant.ts) alongside the existing display `HOURS` (single source, e.g. `OPENING_HOURS: { day: 0-6, ranges: [["12:00","14:00"],["19:00","22:00"]] }[]` matching Mon–Sat lunch/dinner, Fri/Sat dinner until 22h30, Sat lunch until 14h30, Sunday closed).

New [lib/open-status.ts](lib/open-status.ts): `getOpenStatus(now)` computed in Europe/Paris (via `Intl.DateTimeFormat` parts, so visitors abroad see correct status) returning `{ open, until?, nextOpen? }`.

New client component [components/open-status-badge.tsx](components/open-status-badge.tsx): green-dot "Ouvert · ferme à 22h00" or muted "Fermé · ouvre lundi à 12h00", bilingual, refreshed with a minute interval. Rendered client-side after mount to avoid hydration mismatch.

Placement:
- [components/header.tsx](components/header.tsx) — small badge next to the desktop nav / phone CTA.
- [components/home/hero-section.tsx](components/home/hero-section.tsx) — replace the static `hero_open` quick-fact (line 67-70) with the live badge.

## 3. SEO layer

- `metadataBase` in [app/layout.tsx](app/layout.tsx) from `process.env.NEXT_PUBLIC_SITE_URL` with fallback `https://lebellagio-ales.fr`; add the var to `.env.example` (create if absent).
- JSON-LD `Restaurant` schema injected in the layout via a `<script type="application/ld+json">`: name, url, telephone, email, `PostalAddress`, `geo` (44.1255, 4.0815 — coordinates from the existing map embed), `servesCuisine`, `priceRange`, `openingHoursSpecification` derived from the new structured hours, `menu` URL (`/menu`), `acceptsReservations`, image, `sameAs` (Facebook/Instagram).
- [app/sitemap.ts](app/sitemap.ts) — routes: `/`, `/menu`, `/reservation`, `/order`, `/contact`, `/legal`, `/privacy`, `/cookies`.
- [app/robots.ts](app/robots.ts) — allow all, point to sitemap.
- OG image: [app/opengraph-image.tsx](app/opengraph-image.tsx) using `ImageResponse` (built into Next, no assets or deps needed) — restaurant name, tagline, address on the brand cream/dark palette; also add `openGraph.images` alt text and `twitter` card metadata in the layout.

## Verification

Run the dev server: submit each form and confirm the wa.me tab opens with a correctly encoded message; check the badge against the current Paris time; view page source for the JSON-LD block and check `/sitemap.xml`, `/robots.txt`, `/opengraph-image` respond.