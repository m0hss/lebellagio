import type { Metadata } from "next"
import Link from "next/link"
import { PageShell } from "@/components/page-shell"
import { RESTAURANT } from "@/lib/restaurant"

export const metadata: Metadata = {
  title: "Mentions légales – Le Bellagio, Alès",
  description: "Mentions légales du restaurant Le Bellagio à Alès.",
}

export default function LegalPage() {
  return (
    <PageShell>
      {/* Hero strip */}
      <div className="bg-sidebar py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-sidebar-foreground text-pretty">
            Mentions légales
          </h1>
          <p className="text-sidebar-foreground/60 mt-2 text-sm">
            Dernière mise à jour : juin 2025
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16 prose-like">
        <div className="space-y-10 text-sm text-foreground/80 leading-relaxed">
          <section>
            <h2 className="font-serif text-xl font-bold text-foreground mb-3">
              1. Éditeur du site
            </h2>
            <p>
              Le présent site est édité par&nbsp;:
            </p>
            <ul className="mt-3 space-y-1 pl-4 list-disc list-inside">
              <li><strong>Raison sociale :</strong> Le Bellagio</li>
              <li><strong>Adresse :</strong> {RESTAURANT.address}</li>
              <li>
                <strong>Téléphone :</strong>{" "}
                <a href={`tel:${RESTAURANT.phoneRaw}`} className="text-primary hover:underline">
                  {RESTAURANT.phone}
                </a>
              </li>
              <li>
                <strong>Email :</strong>{" "}
                <a href={`mailto:${RESTAURANT.email}`} className="text-primary hover:underline">
                  {RESTAURANT.email}
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-foreground mb-3">
              2. Hébergement
            </h2>
            <p>
              Ce site est hébergé par <strong>Vercel Inc.</strong>, 340 Pine Street, Suite 701, San
              Francisco, CA 94104, États-Unis. Site web :{" "}
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                vercel.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-foreground mb-3">
              3. Propriété intellectuelle
            </h2>
            <p>
              L&apos;ensemble des contenus présents sur ce site (textes, images, logos,
              photographies) est la propriété exclusive de Le Bellagio ou de ses
              prestataires et est protégé par le droit d&apos;auteur français et
              international. Toute reproduction, distribution ou utilisation sans
              autorisation préalable écrite est interdite.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-foreground mb-3">
              4. Responsabilité
            </h2>
            <p>
              Le Bellagio s&apos;efforce de maintenir les informations de ce site à jour et
              exactes. Toutefois, nous ne pouvons garantir l&apos;exactitude, la complétude
              ou l&apos;actualité des informations diffusées. L&apos;utilisation de ces
              informations se fait sous la responsabilité exclusive de l&apos;utilisateur.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-foreground mb-3">
              5. Données personnelles
            </h2>
            <p>
              Pour toute information sur le traitement de vos données personnelles,
              consultez notre{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                politique de confidentialité
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-foreground mb-3">
              6. Cookies
            </h2>
            <p>
              Ce site utilise des cookies. Pour en savoir plus, consultez notre{" "}
              <Link href="/cookies" className="text-primary hover:underline">
                politique de gestion des cookies
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-foreground mb-3">
              7. Droit applicable
            </h2>
            <p>
              Les présentes mentions légales sont soumises au droit français. En cas de
              litige, les tribunaux français seront seuls compétents.
            </p>
          </section>
        </div>
      </div>
    </PageShell>
  )
}
