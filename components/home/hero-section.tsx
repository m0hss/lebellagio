"use client"

import Image from "next/image"
import Link from "next/link"
import { Phone, MapPin, Clock, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/reveal"
import { useLocale } from "@/lib/locale-context"
import { t } from "@/lib/i18n"
import { RESTAURANT } from "@/lib/restaurant"
import { OpenStatusBadge } from "@/components/open-status-badge"

export function HeroSection() {
  const { locale } = useLocale()

  return (
    <section aria-label="Hero" className="relative overflow-hidden bg-sidebar">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[90vh] lg:min-h-[85vh]">
          {/* Text col */}
          <div className="relative flex flex-col justify-center py-16 lg:py-20 pr-0 lg:pr-12 z-10">
            <Reveal animation="fade-up" duration={700}>
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-sidebar-foreground leading-tight mb-6 text-pretty">
                {t(locale, "hero_heading")}
              </h1>
            </Reveal>
            <Reveal animation="fade-up" duration={700} delay={160}>
              <p className="text-lg text-sidebar-foreground/75 leading-relaxed mb-8 max-w-md text-pretty">
                {t(locale, "hero_subheading")}
              </p>
            </Reveal>

            {/* CTAs */}
            <Reveal animation="fade-up" duration={700} delay={240}>
              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <Button
                  render={<Link href="/reservation" />}
                  nativeButton={false}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground text-base px-8"
                >
                  {t(locale, "hero_cta_reserve")}
                </Button>
                <Button
                  render={<Link href="/order" />}
                  nativeButton={false}
                  size="lg"
                  variant="outline"
                  className="bg-accent text-accent-foreground border-border/50 hover:bg-accent/80 hover:text-accent-foreground text-base px-8"
                >
                  {t(locale, "hero_cta_order")}
                </Button>
              </div>
            </Reveal>

            {/* Quick facts */}
            <Reveal animation="fade-up" duration={700} delay={320}>
              <ul className="flex flex-wrap gap-x-5 gap-y-2.5 text-sm text-sidebar-foreground/60">
                <li className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-secondary shrink-0" aria-hidden="true" />
                  {t(locale, "hero_address")}
                </li>
                <li className="flex items-center gap-1.5">
                  <Clock size={14} className="text-secondary shrink-0" aria-hidden="true" />
                  <OpenStatusBadge showDot={false} />
                </li>
                <li className="flex items-center gap-1.5">
                  <ShoppingBag size={14} className="text-secondary shrink-0" aria-hidden="true" />
                  {t(locale, "hero_takeaway")}
                </li>
                <li className="flex items-center gap-1.5">
                  <Phone size={14} className="text-secondary shrink-0" aria-hidden="true" />
                  <a
                    href={`tel:${RESTAURANT.phoneRaw}`}
                    className="hover:text-secondary transition-colors"
                  >
                    {RESTAURANT.phone}
                  </a>
                </li>
              </ul>
            </Reveal>
          </div>

          {/* Image col — full-bleed background on mobile/tablet, right half on desktop */}
          <Reveal
            animation="zoom"
            duration={900}
            delay={120}
            className="absolute inset-0 lg:left-auto lg:w-1/2 overflow-hidden"
          >
            <Image
              src="/images/hero.png"
              alt="Intérieur du restaurant Le Bellagio à Alès"
              fill
              priority
              className="object-cover opacity-40 lg:opacity-80"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-sidebar via-sidebar/30 to-transparent lg:block hidden" />
            <div className="absolute inset-0 bg-gradient-to-b from-sidebar/95 via-sidebar/85 to-sidebar/70 lg:hidden" />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
