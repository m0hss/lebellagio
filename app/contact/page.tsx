import type { Metadata } from "next"
import { Phone, Mail, MapPin, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageShell } from "@/components/page-shell"
import { HoursTable } from "@/components/hours-table"
import { FeatureChips } from "@/components/feature-chips"
import { Reveal } from "@/components/reveal"
import { RESTAURANT } from "@/lib/restaurant"

export const metadata: Metadata = {
  title: "Contact & accès – Le Bellagio, Alès",
  description:
    "Contactez le restaurant Le Bellagio à Alès. Téléphone, email, adresse, horaires et accès. 23 place Henri Barbusse, 30100 Alès.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact & accès – Le Bellagio, Alès",
    description:
      "Contactez le restaurant Le Bellagio à Alès. Téléphone, email, adresse, horaires et accès. 23 place Henri Barbusse, 30100 Alès.",
    url: "/contact",
    type: "website",
    locale: "fr_FR",
  },
}

export default function ContactPage() {
  return (
    <PageShell>
      {/* Hero strip */}
      <div className="bg-sidebar py-14 md:py-20">
        <Reveal className="max-w-6xl mx-auto px-4 sm:px-6 text-center" duration={600}>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-sidebar-foreground mb-3 text-pretty">
            Contact &amp; accès
          </h1>
          <p className="text-sidebar-foreground/70 text-lg max-w-lg mx-auto text-balance">
            Retrouvez-nous au 23 place Henri Barbusse, Alès
          </p>
        </Reveal>
      </div>

      {/* Contact cards */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <Reveal delay={0}>
            <a
              href={`tel:${RESTAURANT.phoneRaw}`}
              className="flex flex-col items-center text-center gap-3 p-6 bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5 transition-all group h-full"
              aria-label={`Appeler ${RESTAURANT.phone}`}
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Phone size={22} className="text-primary" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Téléphone</p>
                <p className="font-semibold text-foreground">{RESTAURANT.phone}</p>
              </div>
            </a>
          </Reveal>

          <Reveal delay={80}>
            <a
              href={`mailto:${RESTAURANT.email}`}
              className="flex flex-col items-center text-center gap-3 p-6 bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5 transition-all group h-full"
              aria-label={`Envoyer un email à ${RESTAURANT.email}`}
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Mail size={22} className="text-primary" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Email</p>
                <p className="font-semibold text-foreground break-all text-sm">{RESTAURANT.email}</p>
              </div>
            </a>
          </Reveal>

          <Reveal delay={160}>
            <a
              href={RESTAURANT.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center text-center gap-3 p-6 bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5 transition-all group h-full"
              aria-label="Facebook — Le Bellagio Alès"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary" aria-hidden="true">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Facebook</p>
                <p className="font-semibold text-foreground text-sm">Le Bellagio Alès</p>
              </div>
            </a>
          </Reveal>

          <Reveal delay={240}>
            <a
              href={RESTAURANT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center text-center gap-3 p-6 bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5 transition-all group h-full"
              aria-label="Instagram — Le Bellagio Alès"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-primary" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Instagram</p>
                <p className="font-semibold text-foreground text-sm">@lebellagioales</p>
              </div>
            </a>
          </Reveal>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left col */}
          <Reveal animation="fade-right" className="space-y-6">
            {/* Address + map link */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-primary" aria-hidden="true" />
                </div>
                <h2 className="font-serif font-semibold text-lg text-foreground">Adresse</h2>
              </div>
              <address className="not-italic text-muted-foreground text-sm leading-relaxed mb-5">
                23 place Henri Barbusse<br />
                30100 Alès<br />
                France
              </address>
              <Button
                render={<a href="https://www.google.com/maps/dir/?api=1&destination=Le+Bellagio+23+place+Henri+Barbusse+Al%C3%A8s" target="_blank" rel="noopener noreferrer" />}
                nativeButton={false}
                className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 w-full sm:w-auto"
              >
                <Navigation size={15} aria-hidden="true" />
                {"Obtenir l'itinéraire"}
              </Button>
            </div>

            {/* Hours */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <h2 className="font-serif font-semibold text-lg text-foreground mb-4">Horaires</h2>
              <HoursTable />
            </div>

            {/* Services */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <h2 className="font-serif font-semibold text-lg text-foreground mb-4">Services</h2>
              <FeatureChips />
            </div>
          </Reveal>

          {/* Right col: map */}
          <Reveal
            animation="fade-left"
            delay={100}
            className="rounded-2xl overflow-hidden border border-border min-h-80 lg:min-h-0"
          >
            <iframe
              src={RESTAURANT.mapEmbed}
              width="100%"
              height="100%"
              style={{ border: 0, display: "block", minHeight: "400px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localisation du restaurant Le Bellagio à Alès"
            />
          </Reveal>
        </div>
      </div>
    </PageShell>
  )
}
