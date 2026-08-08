import type { Metadata } from "next"
import Link from "next/link"
import { PageShell } from "@/components/page-shell"
import { RESTAURANT } from "@/lib/restaurant"

export const metadata: Metadata = {
  title: "Politique de confidentialité – Le Bellagio, Alès",
  description:
    "Politique de confidentialité du restaurant Le Bellagio à Alès. Traitement des données personnelles conformément au RGPD.",
}

export default function PrivacyPage() {
  return (
    <PageShell>
      {/* Hero strip */}
      <div className="bg-sidebar py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-sidebar-foreground text-pretty">
            Politique de confidentialité
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
              1. Responsable du traitement
            </h2>
            <p>
              Le responsable du traitement de vos données personnelles est&nbsp;:
            </p>
            <ul className="mt-3 space-y-1 pl-4 list-disc list-inside">
              <li><strong>Le Bellagio</strong></li>
              <li>{RESTAURANT.address}</li>
              <li>
                <a href={`mailto:${RESTAURANT.email}`} className="text-primary hover:underline">
                  {RESTAURANT.email}
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-foreground mb-3">
              2. Données collectées
            </h2>
            <p>
              Dans le cadre de l&apos;utilisation de notre site, nous pouvons collecter les
              données suivantes&nbsp;:
            </p>
            <ul className="mt-3 space-y-2 pl-4 list-disc list-inside">
              <li>
                <strong>Formulaire de réservation :</strong> nom, téléphone, email, date,
                heure, nombre de convives et commentaires éventuels.
              </li>
              <li>
                <strong>Formulaire de commande à emporter :</strong> nom, téléphone, heure
                de retrait, détail de la commande et préférence de paiement.
              </li>
              <li>
                <strong>Formulaire de contact :</strong> nom, email et message.
              </li>
              <li>
                <strong>Données de navigation :</strong> cookies techniques nécessaires au
                bon fonctionnement du site.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-foreground mb-3">
              3. Finalités du traitement
            </h2>
            <p>Vos données sont utilisées pour&nbsp;:</p>
            <ul className="mt-3 space-y-2 pl-4 list-disc list-inside">
              <li>Gérer vos réservations de table.</li>
              <li>Traiter et confirmer vos commandes à emporter.</li>
              <li>Répondre à vos demandes de contact.</li>
              <li>Améliorer notre service et l&apos;expérience utilisateur du site.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-foreground mb-3">
              4. Base légale
            </h2>
            <p>
              Le traitement de vos données est fondé sur l&apos;exécution d&apos;un contrat
              (réservation, commande) ou sur votre consentement (formulaire de contact,
              cookies).
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-foreground mb-3">
              5. Durée de conservation
            </h2>
            <p>
              Vos données sont conservées pour la durée strictement nécessaire à leur
              finalité et ne dépassant pas trois ans à compter du dernier contact.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-foreground mb-3">
              6. Vos droits
            </h2>
            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD), vous
              disposez des droits suivants&nbsp;: accès, rectification, effacement,
              opposition, limitation du traitement et portabilité de vos données.
            </p>
            <p className="mt-3">
              Pour exercer ces droits, contactez-nous par email à{" "}
              <a href={`mailto:${RESTAURANT.email}`} className="text-primary hover:underline">
                {RESTAURANT.email}
              </a>{" "}
              ou par courrier à notre adresse. En cas de réclamation, vous pouvez saisir la
              CNIL (
              <a
                href="https://www.cnil.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                cnil.fr
              </a>
              ).
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-foreground mb-3">
              7. Partage des données
            </h2>
            <p>
              Nous ne vendons ni ne louons vos données personnelles à des tiers. Vos données
              peuvent être transmises à des prestataires techniques (hébergeur) dans le seul
              but d&apos;assurer le bon fonctionnement du site.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-foreground mb-3">
              8. Cookies
            </h2>
            <p>
              Pour en savoir plus sur notre utilisation des cookies, consultez notre{" "}
              <Link href="/cookies" className="text-primary hover:underline">
                politique de gestion des cookies
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </PageShell>
  )
}
