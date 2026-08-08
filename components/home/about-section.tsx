"use client"

import Image from "next/image"
import { useLocale } from "@/lib/locale-context"
import { t } from "@/lib/i18n"
import { FeatureChips } from "@/components/feature-chips"
import { Separator } from "@/components/ui/separator"
import { Reveal } from "@/components/reveal"

export function AboutSection() {
  const { locale } = useLocale()

  return (
    <section aria-labelledby="about-heading" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <Reveal
            animation="fade-left"
            className="relative aspect-[4/3] rounded-2xl overflow-hidden order-2 lg:order-1 group"
          >
            <Image
              src="/images/ambience.png"
              alt="Salle du restaurant Le Bellagio"
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </Reveal>

          {/* Text */}
          <Reveal animation="fade-right" delay={100} className="order-1 lg:order-2">
            <p className="text-secondary text-sm font-medium tracking-widest uppercase mb-3">
              {locale === "fr" ? "Notre restaurant" : "Our restaurant"}
            </p>
            <h2
              id="about-heading"
              className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-6 text-pretty"
            >
              {t(locale, "about_heading")}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8 text-base">
              {t(locale, "about_text")}
            </p>
            <Separator className="mb-6" />
            <FeatureChips />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
