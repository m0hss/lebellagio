"use client"

import { Star } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { useLocale } from "@/lib/locale-context"
import { t } from "@/lib/i18n"
import { RESTAURANT } from "@/lib/restaurant"

// TODO: replace with the restaurant's real Google reviews (author, rating, date, text).
const REVIEWS = [
  {
    author: "Camille R.",
    rating: 5,
    date: { fr: "il y a 2 semaines", en: "2 weeks ago" },
    text: {
      fr: "Très bonne surprise ! Le confit de canard est délicieux et la pizza Bellagio a régalé toute la table. Accueil chaleureux, on reviendra.",
      en: "Great surprise! The duck confit is delicious and the Bellagio pizza was a hit with the whole table. Warm welcome, we'll be back.",
    },
  },
  {
    author: "Julien M.",
    rating: 5,
    date: { fr: "il y a 1 mois", en: "1 month ago" },
    text: {
      fr: "Cuisine familiale et généreuse, produits frais, service rapide même en plein service du midi. Le rapport qualité-prix est excellent.",
      en: "Generous home cooking, fresh produce, quick service even during a busy lunch rush. Excellent value for money.",
    },
  },
  {
    author: "Sophie L.",
    rating: 5,
    date: { fr: "il y a 1 mois", en: "1 month ago" },
    text: {
      fr: "Adresse conviviale au cœur d'Alès. La terrine de foie gras maison est un régal et l'équipe est adorable. Merci pour ce moment !",
      en: "A friendly spot in the heart of Alès. The homemade foie gras terrine is a treat and the team is lovely. Thank you for the great time!",
    },
  },
  {
    author: "Marc D.",
    rating: 4,
    date: { fr: "il y a 2 mois", en: "2 months ago" },
    text: {
      fr: "Belle carte, pizzas maison très généreuses. On a pris le confit de canard, un délice. Petite attente le samedi soir mais ça vaut le coup.",
      en: "Great menu, generous homemade pizzas. We had the duck confit, delicious. A short wait on Saturday nights, but worth it.",
    },
  },
  {
    author: "Nadia B.",
    rating: 5,
    date: { fr: "il y a 3 mois", en: "3 months ago" },
    text: {
      fr: "Un vrai coup de cœur pour la salade de chèvre chaud et l'entrecôte. Cadre chaleureux, parfait pour un dîner entre amis.",
      en: "A real favourite: the warm goat cheese salad and the ribeye steak. Cosy setting, perfect for a dinner with friends.",
    },
  },
  {
    author: "Thomas V.",
    rating: 5,
    date: { fr: "il y a 3 mois", en: "3 months ago" },
    text: {
      fr: "Commande à emporter parfaite, prête à l'heure, encore chaude. La pizza 4 fromages est excellente. Je recommande vivement.",
      en: "Perfect takeaway order, ready on time, still hot. The four-cheese pizza is excellent. Highly recommend.",
    },
  },
  {
    author: "Claire F.",
    rating: 5,
    date: { fr: "il y a 4 mois", en: "4 months ago" },
    text: {
      fr: "Petite terrasse agréable et service attentionné. La crème brûlée maison est un vrai régal pour finir le repas.",
      en: "Lovely little terrace and attentive service. The homemade crème brûlée is a real treat to finish the meal.",
    },
  },
  {
    author: "Karim S.",
    rating: 4,
    date: { fr: "il y a 5 mois", en: "5 months ago" },
    text: {
      fr: "Bon rapport qualité-prix, cuisine généreuse et savoureuse. On a passé un bon moment en famille, on reviendra avec plaisir.",
      en: "Good value for money, generous and tasty food. We had a great time as a family and will happily come back.",
    },
  },
]

const MARQUEE_REVIEWS = [...REVIEWS, ...REVIEWS]

export function ReviewsSection() {
  const { locale } = useLocale()

  return (
    <section aria-labelledby="reviews-heading" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal className="text-center max-w-xl mx-auto mb-12">
          <p className="text-secondary text-sm font-medium tracking-widest uppercase mb-2">
            {locale === "fr" ? "Avis clients" : "Customer reviews"}
          </p>
          <h2
            id="reviews-heading"
            className="font-serif text-3xl sm:text-4xl font-bold text-foreground text-pretty mb-3"
          >
            {t(locale, "reviews_heading")}
          </h2>
          <a
            href={RESTAURANT.google}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <GoogleLogo className="w-4 h-4 shrink-0" />
            <span className="text-sm">
              {locale === "fr" ? "Avis vérifiés sur Google" : "Verified reviews on Google"}
            </span>
          </a>
        </Reveal>

        {/* Screen-reader list: the marquee below is duplicated and aria-hidden for a seamless loop */}
        <ul className="sr-only">
          {REVIEWS.map((review) => (
            <li key={review.author}>
              {review.author}, {review.rating}/5 — {review.text[locale]}
            </li>
          ))}
        </ul>

        <Reveal className="relative -mx-4 sm:-mx-6 overflow-hidden mask-[linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
          <div
            aria-hidden="true"
            className="flex w-max gap-5 px-4 sm:px-6 animate-marquee"
            style={{ animationDuration: `${MARQUEE_REVIEWS.length * 6}s` }}
          >
            {MARQUEE_REVIEWS.map((review, i) => (
              <figure
                key={`${review.author}-${i}`}
                className="shrink-0 w-75 sm:w-85 flex flex-col bg-card rounded-2xl border border-border p-6"
              >
                <div className="flex items-center gap-0.5 mb-3" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      size={16}
                      className={
                        starIndex < review.rating
                          ? "fill-secondary text-secondary"
                          : "fill-transparent text-muted-foreground/30"
                      }
                    />
                  ))}
                </div>
                <blockquote className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {"\u201C"}
                  {review.text[locale]}
                  {"\u201D"}
                </blockquote>
                <figcaption className="mt-4 pt-4 border-t border-border flex items-center justify-between gap-2">
                  <span className="font-semibold text-foreground text-sm">{review.author}</span>
                  <span className="text-xs text-muted-foreground">{review.date[locale]}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function GoogleLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.85-.08-1.66-.22-2.45H12v4.63h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.88c2.27-2.09 3.57-5.17 3.57-8.81Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.95-2.92l-3.88-3c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.95H1.27v3.1A11.998 11.998 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.28A7.2 7.2 0 0 1 4.89 12c0-.79.14-1.56.38-2.28v-3.1H1.27A11.998 11.998 0 0 0 0 12c0 1.94.46 3.77 1.27 5.38l4-3.1Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.77c1.77 0 3.35.61 4.6 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.69 1.27 6.62l4 3.1C6.22 6.88 8.87 4.77 12 4.77Z"
      />
    </svg>
  )
}
