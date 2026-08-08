"use client"

import { MapPin, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/reveal"
import { useLocale } from "@/lib/locale-context"
import { t } from "@/lib/i18n"
import { RESTAURANT } from "@/lib/restaurant"

export function MapSection() {
  const { locale } = useLocale()

  return (
    <section aria-labelledby="map-heading" className="py-16 md:py-24 bg-muted/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal className="text-center mb-10">
          <h2
            id="map-heading"
            className="font-serif text-3xl sm:text-4xl font-bold text-foreground text-pretty"
          >
            {t(locale, "map_heading")}
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {/* Info panel */}
          <Reveal animation="fade-right" className="bg-card rounded-2xl border border-border p-6 md:p-8 flex flex-col justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-primary" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    {t(locale, "map_address_label")}
                  </p>
                  <p className="font-medium text-sm text-foreground">Le Bellagio</p>
                </div>
              </div>
              <address className="not-italic text-sm text-muted-foreground leading-relaxed">
                23 place Henri Barbusse
                <br />
                30100 Alès
                <br />
                France
              </address>
            </div>

            <Button
              render={<a href="https://www.google.com/maps/dir/?api=1&destination=Le+Bellagio+23+place+Henri+Barbusse+Al%C3%A8s" target="_blank" rel="noopener noreferrer" />}
              nativeButton={false}
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 w-full"
            >
              <Navigation size={15} aria-hidden="true" />
              {t(locale, "map_directions")}
            </Button>
          </Reveal>

          {/* Map embed */}
          <Reveal
            animation="fade"
            delay={100}
            className="lg:col-span-2 rounded-2xl overflow-hidden border border-border aspect-[16/9] lg:aspect-auto lg:min-h-72"
          >
            <iframe
              src={RESTAURANT.mapEmbed}
              width="100%"
              height="100%"
              style={{ border: 0, display: "block", minHeight: "300px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={locale === "fr" ? "Localisation du restaurant Le Bellagio à Alès" : "Location of Le Bellagio restaurant in Alès"}
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
