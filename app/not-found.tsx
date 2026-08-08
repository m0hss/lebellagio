"use client"

import Link from "next/link"
import { Compass, UtensilsCrossed } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageShell } from "@/components/page-shell"
import { useLocale } from "@/lib/locale-context"
import { t } from "@/lib/i18n"

export default function NotFound() {
  const { locale } = useLocale()

  return (
    <PageShell>
      <div className="bg-sidebar py-20 md:py-28">
        <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/20 mb-6">
            <Compass size={28} className="text-secondary" aria-hidden="true" />
          </div>
          <p className="font-serif text-6xl font-bold text-sidebar-foreground/20 mb-3">404</p>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-sidebar-foreground mb-3 text-pretty">
            {t(locale, "not_found_title")}
          </h1>
          <p className="text-sidebar-foreground/70 text-lg mb-8 text-balance">
            {t(locale, "not_found_subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button nativeButton={false} render={<Link href="/" />} size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
              {t(locale, "not_found_home")}
            </Button>
            <Button nativeButton={false} render={<Link href="/menu" />} size="lg" variant="outline" className="border-primary/30 text-primary hover:bg-accent gap-2">
              <UtensilsCrossed size={16} aria-hidden="true" />
              {t(locale, "not_found_menu")}
            </Button>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
