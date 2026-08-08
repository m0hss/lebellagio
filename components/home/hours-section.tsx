"use client"

import { Clock, CreditCard, Tag } from "lucide-react"
import { useLocale } from "@/lib/locale-context"
import { t } from "@/lib/i18n"
import { PAYMENT_METHODS, SERVICES } from "@/lib/restaurant"
import { HoursTable } from "@/components/hours-table"
import { Reveal } from "@/components/reveal"

export function HoursSection() {
  const { locale } = useLocale()

  return (
    <section aria-labelledby="hours-heading" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal className="text-center mb-12">
          <p className="text-secondary text-sm font-medium tracking-widest uppercase mb-2">
            {locale === "fr" ? "Pratique" : "Practical"}
          </p>
          <h2
            id="hours-heading"
            className="font-serif text-3xl sm:text-4xl font-bold text-foreground text-pretty"
          >
            {t(locale, "hours_heading")}
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Opening hours */}
          <Reveal delay={0} className="bg-card rounded-2xl border border-border p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock size={18} className="text-primary" aria-hidden="true" />
              </div>
              <h3 className="font-serif font-semibold text-lg text-foreground">
                {locale === "fr" ? "Horaires" : "Opening hours"}
              </h3>
            </div>
            <HoursTable />
          </Reveal>

          {/* Payment */}
          <Reveal delay={100} className="bg-card rounded-2xl border border-border p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                <CreditCard size={18} className="text-secondary" aria-hidden="true" />
              </div>
              <h3 className="font-serif font-semibold text-lg text-foreground">
                {t(locale, "hours_payment")}
              </h3>
            </div>
            <ul className="space-y-2.5">
              {PAYMENT_METHODS.map((p, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0"
                    aria-hidden="true"
                  />
                  {p[locale]}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Services */}
          <Reveal delay={200} className="bg-card rounded-2xl border border-border p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                <Tag size={18} className="text-accent-foreground" aria-hidden="true" />
              </div>
              <h3 className="font-serif font-semibold text-lg text-foreground">
                {t(locale, "hours_services")}
              </h3>
            </div>
            <ul className="flex flex-wrap gap-2">
              {SERVICES.map((s, i) => (
                <li
                  key={i}
                  className="px-2.5 py-1 bg-accent text-accent-foreground rounded-full text-xs font-medium border border-border/50"
                >
                  {s[locale]}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
