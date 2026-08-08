import type { Metadata } from "next"
import { PageShell } from "@/components/page-shell"
import { ReservationForm } from "@/components/reservation/reservation-form"
import { HoursTable } from "@/components/hours-table"
import { Reveal } from "@/components/reveal"
import { CalendarDays } from "lucide-react"

export const metadata: Metadata = {
  title: "Réservation – Le Bellagio, Alès",
  description:
    "Réservez votre table au restaurant Le Bellagio à Alès. Formulaire en ligne ou par téléphone au +33 4 66 52 99 59.",
  alternates: { canonical: "/reservation" },
  openGraph: {
    title: "Réservation – Le Bellagio, Alès",
    description:
      "Réservez votre table au restaurant Le Bellagio à Alès. Formulaire en ligne ou par téléphone au +33 4 66 52 99 59.",
    url: "/reservation",
    type: "website",
    locale: "fr_FR",
  },
}

export default function ReservationPage() {
  return (
    <PageShell>
      {/* Hero strip */}
      <div className="bg-sidebar py-14 md:py-20">
        <Reveal className="max-w-6xl mx-auto px-4 sm:px-6 text-center" duration={600}>
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/20 mb-6">
            <CalendarDays size={28} className="text-secondary" aria-hidden="true" />
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-sidebar-foreground mb-3 text-pretty">
            Réservation
          </h1>
          <p className="text-sidebar-foreground/70 text-lg max-w-lg mx-auto text-balance">
            Réservez votre table au Bellagio
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
                Votre réservation
              </h2>
              <ReservationForm />
            </div>
          </Reveal>

          {/* Sidebar info */}
          <Reveal animation="fade-left" delay={100} as="aside" className="space-y-6">
            <div className="bg-card rounded-2xl border border-border p-6">
              <h3 className="font-serif font-semibold text-lg text-foreground mb-4">
                Nos horaires
              </h3>
              <HoursTable />
            </div>

            <div className="bg-primary/5 rounded-2xl border border-primary/15 p-6">
              <h3 className="font-serif font-semibold text-base text-foreground mb-3">
                Confirmation
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Vous recevrez une confirmation par téléphone ou email sous 24h. Pour les groupes de plus de 6 personnes, merci de nous appeler directement.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </PageShell>
  )
}
