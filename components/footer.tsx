"use client"

import Link from "next/link"
import { Phone, Mail, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLocale } from "@/lib/locale-context"
import { t } from "@/lib/i18n"
import { RESTAURANT, HOURS } from "@/lib/restaurant"

export function Footer() {
  const { locale } = useLocale()
  const currentYear = new Date().getFullYear()

  const todayIndex = new Date().getDay()
  // Map Sunday (0) to our closed day, Mon-Sat to index 0-5
  const hoursIndex = todayIndex === 0 ? 6 : todayIndex - 1
  const todayHours = HOURS[hoursIndex]

  return (
    <footer className="bg-sidebar text-sidebar-foreground pb-16 md:pb-0">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-6 md:pt-14 md:pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <p className="font-serif text-2xl font-bold text-sidebar-primary mb-3">Le Bellagio</p>
            <p className="text-sm text-sidebar-foreground/70 leading-relaxed mb-4">
              {locale === "fr"
                ? "Cuisine française, fait maison, au cœur d'Alès."
                : "French cuisine, homemade, in the heart of Alès."}
            </p>
            <div className="flex gap-3">
              <a
                href={RESTAURANT.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full flex items-center justify-center bg-sidebar-foreground/15 text-sidebar-primary hover:bg-sidebar-foreground/25 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href={RESTAURANT.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full flex items-center justify-center bg-sidebar-foreground/15 text-sidebar-primary hover:bg-sidebar-foreground/25 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href={RESTAURANT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-8 h-8 rounded-full flex items-center justify-center bg-sidebar-foreground/15 text-sidebar-primary hover:bg-sidebar-foreground/25 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.85 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="font-semibold text-sidebar-foreground text-sm uppercase tracking-wider mb-4">
              {t(locale, "contact_heading")}
            </p>
            <ul className="space-y-3 text-sm text-sidebar-foreground/70">
              <li className="flex items-start gap-2">
                <MapPin size={15} className="mt-0.5 shrink-0 text-sidebar-primary" aria-hidden="true" />
                <address className="not-italic leading-relaxed">{RESTAURANT.address}</address>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={15} className="shrink-0 text-sidebar-primary" aria-hidden="true" />
                <a href={`tel:${RESTAURANT.phoneRaw}`} className="hover:text-sidebar-primary transition-colors">
                  {RESTAURANT.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={15} className="shrink-0 text-sidebar-primary" aria-hidden="true" />
                <a href={`mailto:${RESTAURANT.email}`} className="hover:text-sidebar-primary transition-colors break-all">
                  {RESTAURANT.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Hours summary */}
          <div>
            <p className="font-semibold text-sidebar-foreground text-sm uppercase tracking-wider mb-4">
              {t(locale, "hours_heading")}
            </p>
            <ul className="space-y-1.5 text-sm text-sidebar-foreground/70">
              {HOURS.slice(0, 6).map((h, i) => (
                <li key={i} className="flex justify-between gap-2">
                  <span>{h.day[locale]}</span>
                  {h.closed ? (
                    <span className="text-sidebar-foreground/40">{t(locale, "hours_closed")}</span>
                  ) : (
                    <span>{h.lunch}</span>
                  )}
                </li>
              ))}
              <li className="flex justify-between gap-2">
                <span>{HOURS[6].day[locale]}</span>
                <span className="text-sidebar-foreground/40">{t(locale, "hours_closed")}</span>
              </li>
            </ul>
          </div>

          {/* CTA + nav */}
          <div>
            <p className="font-semibold text-sidebar-foreground text-sm uppercase tracking-wider mb-4">
              {locale === "fr" ? "Réserver" : "Reserve"}
            </p>
            <div className="flex flex-col gap-3 mb-6">
              <Button nativeButton={false} render={<Link href="/reservation" />} className="bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/80 [a]:hover:bg-sidebar-primary/80 w-full">
                {t(locale, "reservation_cta")}
              </Button>
              <Button nativeButton={false} render={<Link href="/order" />} variant="outline" className="bg-accent text-accent-foreground border-border/50 hover:bg-accent/80 hover:text-accent-foreground w-full">
                {t(locale, "order_cta")}
              </Button>
            </div>
            <nav className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-sidebar-foreground/50">
              <Link href="/legal" className="hover:text-sidebar-primary transition-colors">
                {t(locale, "footer_legal")}
              </Link>
              <Link href="/privacy" className="hover:text-sidebar-primary transition-colors">
                {t(locale, "footer_privacy")}
              </Link>
              <Link href="/cookies" className="hover:text-sidebar-primary transition-colors">
                {t(locale, "footer_cookies")}
              </Link>
            </nav>
          </div>
        </div>

        <div className="border-t border-sidebar-border mt-8 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-sidebar-foreground/40">
          <p>©{currentYear} Le Bellagio</p>
          <p>
            {t(locale, "footer_rights")}
            <span aria-hidden="true"> · </span>
            Made by{" "}
            <a
              href="https://fixbyte.be"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sidebar-primary transition-colors"
            >
              FixByte
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
