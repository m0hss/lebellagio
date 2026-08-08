import type { Metadata } from "next"
import Link from "next/link"
import { PageShell } from "@/components/page-shell"
import { RESTAURANT } from "@/lib/restaurant"

export const metadata: Metadata = {
  title: "Gestion des cookies – Le Bellagio, Alès",
  description:
    "Politique de gestion des cookies du restaurant Le Bellagio à Alès.",
}

export default function CookiesPage() {
  return (
    <PageShell>
      {/* Hero strip */}
      <div className="bg-sidebar py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-sidebar-foreground text-pretty">
            Gestion des cookies
          </h1>
          <p className="text-sidebar-foreground/60 mt-2 text-sm">
            Dernière mise à jour : juin 2025
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="space-y-10 text-sm text-foreground/80 leading-relaxed">
          <section>
            <h2 className="font-serif text-xl font-bold text-foreground mb-3">
              Qu&apos;est-ce qu&apos;un cookie ?
            </h2>
            <p>
              Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur,
              tablette, smartphone) lors de la visite d&apos;un site web. Il permet de
              mémoriser certaines informations sur votre navigation.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-foreground mb-3">
              Cookies utilisés sur ce site
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 pr-4 font-semibold text-foreground">Nom</th>
                    <th className="text-left py-3 pr-4 font-semibold text-foreground">Type</th>
                    <th className="text-left py-3 font-semibold text-foreground">Finalité</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  <tr>
                    <td className="py-3 pr-4 font-mono text-xs text-primary">lb_cookie_consent</td>
                    <td className="py-3 pr-4">Technique</td>
                    <td className="py-3">Mémorise votre choix de consentement aux cookies.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4">
              Ce site n&apos;utilise pas de cookies publicitaires, de traceurs tiers ni
              d&apos;outils d&apos;analyse comportementale.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-foreground mb-3">
              Comment gérer vos cookies ?
            </h2>
            <p>
              Vous pouvez à tout moment modifier vos préférences en cliquant sur le bandeau
              cookie qui s&apos;affiche lors de votre première visite. Vous pouvez également
              configurer votre navigateur pour bloquer ou supprimer les cookies&nbsp;:
            </p>
            <ul className="mt-3 space-y-2 pl-4 list-disc list-inside">
              <li>
                <a
                  href="https://support.google.com/chrome/answer/95647"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Google Chrome
                </a>
              </li>
              <li>
                <a
                  href="https://support.mozilla.org/fr/kb/activer-desactiver-cookies-preferences"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Mozilla Firefox
                </a>
              </li>
              <li>
                <a
                  href="https://support.apple.com/fr-fr/HT201265"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Safari (iOS &amp; macOS)
                </a>
              </li>
              <li>
                <a
                  href="https://support.microsoft.com/fr-fr/microsoft-edge/supprimer-les-cookies-dans-microsoft-edge"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Microsoft Edge
                </a>
              </li>
            </ul>
            <p className="mt-4">
              Notez que la désactivation de certains cookies peut altérer votre expérience
              de navigation sur notre site.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-foreground mb-3">
              Contact
            </h2>
            <p>
              Pour toute question relative à l&apos;utilisation des cookies sur ce site,
              contactez-nous à{" "}
              <a href={`mailto:${RESTAURANT.email}`} className="text-primary hover:underline">
                {RESTAURANT.email}
              </a>
              .
            </p>
          </section>

          <div className="pt-4 border-t border-border flex flex-wrap gap-4 text-xs text-muted-foreground">
            <Link href="/legal" className="hover:text-primary transition-colors">
              Mentions légales
            </Link>
            <Link href="/privacy" className="hover:text-primary transition-colors">
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
