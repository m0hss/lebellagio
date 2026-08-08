import type { Metadata, Viewport } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import "./globals.css"
import { LocaleProvider } from "@/lib/locale-context"
import { CookieBanner } from "@/components/cookie-banner"
import { ServiceWorkerRegister } from "@/components/pwa/service-worker-register"
import { InstallPrompt } from "@/components/pwa/install-prompt"
import { buildRestaurantJsonLd } from "@/lib/json-ld"
import { SITE_URL } from "@/lib/site"

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-playfair",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Le Bellagio – Restaurant français à Alès",
  description:
    "Restaurant Le Bellagio à Alès. Cuisine française fait maison, pizzas, à emporter. 23 place Henri Barbusse, 30100 Alès. Réservation : +33 4 66 52 99 59.",
  keywords: ["restaurant alès", "le bellagio", "cuisine française", "pizza alès", "restaurant gard"],
  applicationName: "Le Bellagio",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Bellagio",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Le Bellagio – Restaurant français à Alès",
    description: "Cuisine française, fait maison, au cœur d'Alès.",
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: "Le Bellagio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Le Bellagio – Restaurant français à Alès",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Le Bellagio – Restaurant français à Alès",
    description: "Cuisine française, fait maison, au cœur d'Alès.",
    images: ["/og-image.jpg"],
  },
}

export const viewport: Viewport = {
  themeColor: "#8B1E2D",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const restaurantJsonLd = buildRestaurantJsonLd()

  return (
    <html lang="fr" className={`${playfair.variable} ${inter.variable} bg-background`}>
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        <LocaleProvider>
          {children}
          <CookieBanner />
          <InstallPrompt />
          <ServiceWorkerRegister />
        </LocaleProvider>
      </body>
    </html>
  )
}
