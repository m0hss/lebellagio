import type { Metadata } from "next"
import Link from "next/link"
import { ShoppingBag, UtensilsCrossed } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageShell } from "@/components/page-shell"
import { OrderForm } from "@/components/order/order-form"
import { Reveal } from "@/components/reveal"
import { MENU_CATEGORIES } from "@/lib/restaurant"

export const metadata: Metadata = {
  title: "Commander à emporter – Le Bellagio, Alès",
  description:
    "Commandez vos plats et pizzas à emporter au restaurant Le Bellagio à Alès. Formulaire en ligne ou par téléphone.",
  alternates: { canonical: "/order" },
  openGraph: {
    title: "Commander à emporter – Le Bellagio, Alès",
    description:
      "Commandez vos plats et pizzas à emporter au restaurant Le Bellagio à Alès. Formulaire en ligne ou par téléphone.",
    url: "/order",
    type: "website",
    locale: "fr_FR",
  },
}

export default function OrderPage() {
  return (
    <PageShell>
      {/* Hero strip */}
      <div className="bg-sidebar py-14 md:py-20">
        <Reveal className="max-w-6xl mx-auto px-4 sm:px-6 text-center" duration={600}>
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-secondary/20 mb-6">
            <ShoppingBag size={28} className="text-secondary" aria-hidden="true" />
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-sidebar-foreground mb-3 text-pretty">
            Commander à emporter
          </h1>
          <p className="text-sidebar-foreground/70 text-lg max-w-lg mx-auto text-balance">
            Nos plats et pizzas, prêts à être retirés au restaurant
          </p>
        </Reveal>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
          {/* Form */}
          <Reveal animation="fade-right" className="lg:col-span-2">
            <div className="bg-card rounded-2xl border border-border p-6 md:p-8 lg:p-10">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                Votre commande
              </h2>
              <OrderForm />
            </div>
          </Reveal>

          {/* Sidebar */}
          <Reveal animation="fade-left" delay={100} as="aside" className="space-y-6">
            {/* Menu link */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="flex items-center gap-3 mb-3">
                <UtensilsCrossed size={18} className="text-secondary" aria-hidden="true" />
                <h3 className="font-serif font-semibold text-base text-foreground">
                  Consulter la carte
                </h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                Retrouvez toutes nos spécialités : entrées, plats du jour, pizzas maison et desserts.
              </p>
              <Button nativeButton={false} render={<Link href="/menu" />} variant="outline" size="sm" className="w-full border-primary/30 text-primary hover:bg-accent">
                Voir la carte complète
              </Button>
            </div>

            {/* Practical info */}
            <div className="bg-primary/5 rounded-2xl border border-primary/15 p-6">
              <h3 className="font-serif font-semibold text-base text-foreground mb-3">
                Informations
              </h3>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0" aria-hidden="true" />
                  Retrait au restaurant uniquement
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0" aria-hidden="true" />
                  Paiement sur place (CB, espèces, ticket resto)
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0" aria-hidden="true" />
                  Commande confirmée par rappel téléphonique
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0" aria-hidden="true" />
                  Délai habituel : 20 à 30 minutes
                </li>
              </ul>
            </div>

            {/* Quick preview of categories */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <h3 className="font-serif font-semibold text-base text-foreground mb-3">
                Catégories disponibles
              </h3>
              <ul className="flex flex-wrap gap-2">
                {MENU_CATEGORIES.map((cat) => (
                  <li
                    key={cat.id}
                    className="px-2.5 py-1 bg-accent text-accent-foreground rounded-full text-xs font-medium"
                  >
                    {cat.label.fr}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </PageShell>
  )
}
