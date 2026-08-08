import type { Metadata } from "next"
import { PageShell } from "@/components/page-shell"
import { MenuPageClient } from "@/components/menu/menu-page-client"

export const metadata: Metadata = {
  title: "Menu – Le Bellagio, Alès",
  description:
    "Découvrez la carte du restaurant Le Bellagio à Alès : entrées, plats, pizzas maison, desserts. Cuisine française fait maison.",
  alternates: { canonical: "/menu" },
  openGraph: {
    title: "Menu – Le Bellagio, Alès",
    description:
      "Découvrez la carte du restaurant Le Bellagio à Alès : entrées, plats, pizzas maison, desserts. Cuisine française fait maison.",
    url: "/menu",
    type: "website",
    locale: "fr_FR",
  },
}

export default function MenuPage() {
  return (
    <PageShell>
      <MenuPageClient />
    </PageShell>
  )
}
