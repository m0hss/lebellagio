"use client"

import Link from "next/link"
import { ArrowRight, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MenuCard } from "@/components/menu-card"
import { Reveal } from "@/components/reveal"
import { useLocale } from "@/lib/locale-context"
import { t } from "@/lib/i18n"
import { MENU_CATEGORIES } from "@/lib/restaurant"

export function MenuPreviewSection() {
  const { locale } = useLocale()

  // Pick featured items from different categories
  const featured = MENU_CATEGORIES.flatMap((c) => c.items.filter((i) => i.featured)).slice(0, 6)

  return (
    <section aria-labelledby="menu-preview-heading" className="py-16 md:py-24 bg-muted/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <Reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-secondary text-sm font-medium tracking-widest uppercase mb-2">
              {locale === "fr" ? "À la carte" : "On the menu"}
            </p>
            <h2
              id="menu-preview-heading"
              className="font-serif text-3xl sm:text-4xl font-bold text-foreground text-pretty"
            >
              {t(locale, "menu_preview_heading")}
            </h2>
            <p className="text-muted-foreground mt-2">{t(locale, "menu_preview_subheading")}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 shrink-0">
            <Button
              nativeButton={false}
              render={
                <a
                  href="/menu.pdf"
                  download="Le-Bellagio-Carte.pdf"
                  aria-label={t(locale, "menu_download_pdf")}
                />
              }
              variant="ghost"
              size="lg"
              className="text-muted-foreground gap-1.5"
            >
              <FileText size={15} aria-hidden="true" />
              {t(locale, "menu_download_pdf")}
            </Button>
            <Button
              nativeButton={false}
              render={<Link href="/menu" />}
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 gap-1.5"
            >
              {t(locale, "menu_see_all")}
              <ArrowRight size={15} aria-hidden="true" />
            </Button>
          </div>
        </Reveal>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((item, i) => (
            <Reveal key={i} delay={Math.min(i * 80, 320)}>
              <MenuCard item={item} />
            </Reveal>
          ))}
        </div>

        {/* Footer CTA */}
        <Reveal className="text-center mt-10">
          <Button
            nativeButton={false}
            render={<Link href="/menu" />}
            variant="outline"
            size="lg"
            className="border-primary/30 text-primary hover:bg-accent gap-2"
          >
            {t(locale, "menu_see_all")}
            <ArrowRight size={16} aria-hidden="true" />
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
