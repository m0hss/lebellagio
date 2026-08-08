"use client"

import Link from "next/link"
import { ShoppingBag, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/reveal"
import { useLocale } from "@/lib/locale-context"
import { t } from "@/lib/i18n"
import { RESTAURANT, PAYMENT_METHODS } from "@/lib/restaurant"

export function OrderCtaSection() {
  const { locale } = useLocale()

  return (
    <section aria-labelledby="order-cta-heading" className="py-16 md:py-24 bg-muted/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Copy */}
          <Reveal animation="fade-right">
            <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary-foreground rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              <ShoppingBag size={14} aria-hidden="true" />
              {locale === "fr" ? "À emporter" : "Takeaway"}
            </div>
            <h2
              id="order-cta-heading"
              className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4 text-pretty"
            >
              {t(locale, "order_heading")}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8 text-balance">
              {t(locale, "order_subheading")}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                nativeButton={false}
                render={<Link href="/order" />}
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {t(locale, "order_cta")}
              </Button>
              <Button
                nativeButton={false}
                render={<a href={`tel:${RESTAURANT.phoneRaw}`} />}
                size="lg"
                variant="outline"
                className="border-primary/30 text-primary hover:bg-accent gap-2"
              >
                <Phone size={16} aria-hidden="true" />
                {t(locale, "order_phone_cta")}
              </Button>
            </div>
          </Reveal>

          {/* Info card */}
          <Reveal
            animation="fade-left"
            delay={100}
            className="bg-card rounded-2xl border border-border p-6 md:p-8"
          >
            <h3 className="font-serif font-semibold text-lg mb-4 text-foreground">
              {locale === "fr" ? "Informations pratiques" : "Practical info"}
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0"
                  aria-hidden="true"
                />
                {locale === "fr"
                  ? "Commandez par téléphone ou via notre formulaire en ligne"
                  : "Order by phone or via our online form"}
              </li>
              <li className="flex items-start gap-3">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0"
                  aria-hidden="true"
                />
                {locale === "fr"
                  ? "Indiquez votre heure de retrait souhaitée"
                  : "Indicate your desired pickup time"}
              </li>
              <li className="flex items-start gap-3">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0"
                  aria-hidden="true"
                />
                {locale === "fr"
                  ? "Paiement sur place : " + PAYMENT_METHODS.map((p) => p.fr).join(", ")
                  : "Payment on site: " + PAYMENT_METHODS.map((p) => p.en).join(", ")}
              </li>
              <li className="flex items-start gap-3">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0"
                  aria-hidden="true"
                />
                {locale === "fr"
                  ? "Retrait au restaurant : 23 pl. Henri Barbusse, Alès"
                  : "Pickup at the restaurant: 23 pl. Henri Barbusse, Alès"}
              </li>
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
