import { OPENING_HOURS, RESTAURANT } from "./restaurant"
import { SITE_URL } from "./site"

const SCHEMA_DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]

// Coordinates for 23 place Henri Barbusse, 30100 Alès (matches the map embed in lib/restaurant.ts).
const GEO = { latitude: 44.1255, longitude: 4.0815 }

export function buildRestaurantJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: RESTAURANT.name,
    image: `${SITE_URL}/images/hero.png`,
    url: SITE_URL,
    telephone: RESTAURANT.phoneRaw,
    email: RESTAURANT.email,
    servesCuisine: ["French", "Pizza"],
    priceRange: "€€",
    acceptsReservations: "True",
    menu: `${SITE_URL}/menu`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "23 place Henri Barbusse",
      addressLocality: "Alès",
      postalCode: "30100",
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: GEO.latitude,
      longitude: GEO.longitude,
    },
    openingHoursSpecification: OPENING_HOURS.flatMap((day) =>
      day.ranges.map(([opens, closes]) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: SCHEMA_DAY_NAMES[day.day],
        opens,
        closes,
      })),
    ),
    sameAs: [RESTAURANT.facebook, RESTAURANT.instagram],
  }
}
