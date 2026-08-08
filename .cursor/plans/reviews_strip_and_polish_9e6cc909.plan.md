---
name: Reviews strip and polish
overview: Add a hardcoded Google-reviews strip to the home page, wire up real dish photos once dropped in public/images/, and round out per-page metadata with OpenGraph (titles/descriptions already exist).
todos:
  - id: reviews-section
    content: Create ReviewsSection component with 4 placeholder Google reviews, stars, and Google badge
    status: completed
  - id: i18n-keys
    content: Add reviews heading/link i18n keys to lib/i18n.ts
    status: completed
  - id: insert-home
    content: Insert ReviewsSection into app/page.tsx after MenuPreviewSection
    status: completed
  - id: photo-wiring
    content: Swap dish image paths in lib/restaurant.ts if real photos are present in public/images/
    status: completed
  - id: og-metadata
    content: Add metadataBase and per-page openGraph to the four page metadata exports
    status: completed
isProject: false
---

# Reviews Strip, Real Photos, Metadata Polish

## Findings that change scope

- Per-page metadata already exists: all four pages ([app/menu/page.tsx](app/menu/page.tsx), [app/reservation/page.tsx](app/reservation/page.tsx), [app/order/page.tsx](app/order/page.tsx), [app/contact/page.tsx](app/contact/page.tsx)) export French `title` + `description`. What's missing is per-page `openGraph`, so link shares fall back to the root layout's generic OG text.
- No raw `<img>` anywhere. Dish images are string paths in [lib/restaurant.ts](lib/restaurant.ts) rendered via `next/image` in [components/menu-card.tsx](components/menu-card.tsx). The photo swap is file drop + path update only.
- Real Google review text for Le Bellagio Alès is not publicly fetchable (web results only surface unrelated Bellagio restaurants in Senlis/Mions). Reviews will be realistic placeholders with a clear `// TODO: replace with real Google reviews` marker.

## 1. Reviews strip (new)

- New `components/home/reviews-section.tsx`, client component following the existing section pattern (`Reveal` wrapper, `useLocale` + `t()` for the heading/subheading, `bg` alternating with neighbors).
- Hardcode an array of 4 review objects: `{ author, rating (1-5), text: { fr, en? }, relativeDate }`. Placeholder French reviews praising food, service, terrace — flagged with a TODO comment for real ones.
- Render: 5-star row (lucide `Star`, filled per rating, gold `text-secondary`), review text, author name, "Avis Google" badge with the Google "G" and an aggregate line ("4,X sur Google"), linking out to the restaurant's Google Maps listing (same destination URL already used in [app/contact/page.tsx](app/contact/page.tsx)).
- Add the two i18n keys (heading, "see all reviews") to [lib/i18n.ts](lib/i18n.ts).
- Insert `<ReviewsSection />` in [app/page.tsx](app/page.tsx) after `MenuPreviewSection`, before `ReservationCtaSection`.

## 2. Real dish photos (wiring only)

- You drop the real photos into `public/images/`. Once present, update the 16 `image:` paths in [lib/restaurant.ts](lib/restaurant.ts) to the new filenames/extensions and delete the old `dish-*.png` AI renders.
- Sanity-check `components/menu-card.tsx` `sizes`/`fill` props still fit the new aspect ratios. No `<img>` conversion needed.
- If the photos aren't there yet when I implement, I'll leave the current paths untouched and this step becomes a follow-up.

## 3. Metadata polish

- Add `metadataBase` to [app/layout.tsx](app/layout.tsx) (site URL) so OG images/URLs resolve.
- Add a per-page `openGraph: { title, description }` block to the four page metadata exports, mirroring their existing French titles/descriptions.