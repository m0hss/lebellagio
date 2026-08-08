"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { FileText, CalendarDays, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MenuCard } from "@/components/menu-card"
import { Reveal } from "@/components/reveal"
import { useLocale } from "@/lib/locale-context"
import { t } from "@/lib/i18n"
import { MENU_CATEGORIES, RESTAURANT } from "@/lib/restaurant"
import { cn } from "@/lib/utils"

export function MenuPageClient() {
  const { locale } = useLocale()
  const [activeCategory, setActiveCategory] = useState(MENU_CATEGORIES[0].id)
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})

  function scrollToCategory(id: string) {
    setActiveCategory(id)
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <>
      {/* Page hero */}
      <div className="bg-sidebar py-14 md:py-20">
        <Reveal className="max-w-6xl mx-auto px-4 sm:px-6 text-center" duration={600}>
          <p className="text-secondary text-sm font-medium tracking-widest uppercase mb-3">
            {locale === "fr" ? "Restaurant Le Bellagio" : "Le Bellagio Restaurant"}
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-sidebar-foreground mb-4 text-pretty">
            {t(locale, "page_menu_title")}
          </h1>
          <p className="text-sidebar-foreground/70 text-lg max-w-xl mx-auto text-balance">
            {t(locale, "page_menu_subtitle")}
          </p>
        </Reveal>
      </div>

      {/* Sticky category nav */}
      <div className="md:sticky md:top-16 z-30 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-1 overflow-x-auto py-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {MENU_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => scrollToCategory(cat.id)}
                className={cn(
                  "shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
                  activeCategory === cat.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent",
                )}
                aria-current={activeCategory === cat.id ? "true" : undefined}
              >
                {cat.label[locale]}
              </button>
            ))}
            <div className="ml-auto shrink-0">
              <Button
                nativeButton={false}
                render={
                  <a
                    href="/menu.pdf"
                    download="Le-Bellagio-Carte.pdf"
                    aria-label={t(locale, "menu_download_pdf")}
                  />
                }
                size="sm"
                variant="outline"
                className="bg-accent text-accent-foreground border-border/50 hover:bg-accent/80 hover:text-accent-foreground gap-1.5 text-xs"
              >
                <FileText size={13} aria-hidden="true" />
                {t(locale, "menu_download_pdf")}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Menu sections */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-14 space-y-16">
        {MENU_CATEGORIES.map((cat) => (
          <section
            key={cat.id}
            id={cat.id}
            ref={(el) => {
              sectionRefs.current[cat.id] = el
            }}
            aria-labelledby={`cat-${cat.id}-heading`}
          >
            <div className="flex items-center gap-4 mb-6">
              <h2
                id={`cat-${cat.id}-heading`}
                className="font-serif text-2xl sm:text-3xl font-bold text-foreground"
              >
                {cat.label[locale]}
              </h2>
              <span className="flex-1 h-px bg-border" aria-hidden="true" />
            </div>

            {/* Items with images get full cards; others get compact list */}
            {cat.items.some((i) => i.image) ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
                {cat.items.map((item, idx) =>
                  item.image ? (
                    <Reveal key={idx} delay={Math.min(idx * 60, 240)}>
                      <MenuCard item={item} />
                    </Reveal>
                  ) : (
                    <Reveal
                      key={idx}
                      delay={Math.min(idx * 60, 240)}
                      className="bg-card rounded-xl border border-border p-4"
                    >
                      <MenuCard item={item} compact />
                    </Reveal>
                  ),
                )}
              </div>
            ) : (
              <div className="bg-card rounded-xl border border-border divide-y divide-border overflow-hidden">
                {cat.items.map((item, idx) => (
                  <div key={idx} className="px-5">
                    <MenuCard item={item} compact />
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="bg-muted/40 border-t border-border py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-3 text-pretty">
            {locale === "fr" ? "Prêt à passer à table ?" : "Ready to dine with us?"}
          </h2>
          <p className="text-muted-foreground mb-7 text-balance">
            {locale === "fr"
              ? "Réservez votre table ou passez une commande à emporter."
              : "Book your table or place a takeaway order."}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              nativeButton={false}
              render={<Link href="/reservation" />}
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
            >
              <CalendarDays size={16} aria-hidden="true" />
              {t(locale, "reservation_cta")}
            </Button>
            <Button
              nativeButton={false}
              render={<a href={`tel:${RESTAURANT.phoneRaw}`} />}
              size="lg"
              variant="outline"
              className="border-primary/30 text-primary hover:bg-accent gap-2"
            >
              <Phone size={16} aria-hidden="true" />
              {RESTAURANT.phone}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
