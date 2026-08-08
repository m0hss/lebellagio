"use client"

import Link from "next/link"
import { CalendarDays, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/reveal"
import { useLocale } from "@/lib/locale-context"
import { t } from "@/lib/i18n"
import { RESTAURANT } from "@/lib/restaurant"

export function ReservationCtaSection() {
  const { locale } = useLocale()

  return (
    <section aria-labelledby="reservation-cta-heading" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal animation="zoom" className="bg-primary rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Copy */}
            <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
              <CalendarDays
                size={40}
                className="text-primary-foreground/50 mb-6"
                aria-hidden="true"
              />
              <h2
                id="reservation-cta-heading"
                className="font-serif text-3xl sm:text-4xl font-bold text-primary-foreground mb-4 text-pretty"
              >
                {t(locale, "reservation_heading")}
              </h2>
              <p className="text-primary-foreground/80 leading-relaxed mb-8 text-balance">
                {t(locale, "reservation_subheading")}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  render={<Link href="/reservation" />}
                  nativeButton={false}
                  size="lg"
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 hover:text-primary [a]:hover:bg-primary-foreground/90 [a]:hover:text-primary font-semibold"
                >
                  {t(locale, "reservation_cta")}
                </Button>
                <Button
                  render={<a href={`tel:${RESTAURANT.phoneRaw}`} />}
                  nativeButton={false}
                  size="lg"
                  variant="ghost"
                  className="text-primary-foreground hover:bg-primary-foreground/10 gap-2"
                >
                  <Phone size={16} aria-hidden="true" />
                  {RESTAURANT.phone}
                </Button>
              </div>
            </div>

            {/* Decorative right panel */}
            <div className="hidden lg:flex items-center justify-center bg-primary/80 p-12">
              <div className="text-center text-primary-foreground/60">
                <p className="font-serif text-6xl font-bold text-primary-foreground/20 mb-2">LB</p>
                <p className="text-sm tracking-widest uppercase text-primary-foreground/50">
                  {locale === "fr" ? "Réservation recommandée" : "Booking recommended"}
                </p>
                <div className="mt-8 flex flex-col items-center gap-2 text-sm">
                  <p className="text-primary-foreground/70">
                    {locale === "fr" ? "Lundi – Samedi" : "Monday – Saturday"}
                  </p>
                  <p className="text-primary-foreground/70">12h00 – 14h00 · 19h00 – 22h30</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
