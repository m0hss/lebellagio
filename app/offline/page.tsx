"use client"

import Image from "next/image"
import { Phone, RotateCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLocale } from "@/lib/locale-context"
import { t } from "@/lib/i18n"
import { RESTAURANT } from "@/lib/restaurant"

export default function OfflinePage() {
  const { locale } = useLocale()

  return (
    <div className="min-h-screen flex items-center justify-center bg-sidebar px-4 py-16">
      <div className="max-w-sm w-full text-center">
        <Image
          src="/logo.svg"
          alt="Le Bellagio"
          width={64}
          height={64}
          className="mx-auto mb-6"
        />
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-sidebar-foreground mb-3 text-pretty">
          {t(locale, "offline_heading")}
        </h1>
        <p className="text-sidebar-foreground/70 mb-8 text-balance">{t(locale, "offline_text")}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            size="lg"
            onClick={() => window.location.reload()}
            className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 w-full sm:w-auto"
          >
            <RotateCw size={16} aria-hidden="true" />
            {t(locale, "offline_retry")}
          </Button>
          <Button
            nativeButton={false}
            render={<a href={`tel:${RESTAURANT.phoneRaw}`} />}
            size="lg"
            variant="outline"
            className="border-secondary/40 text-sidebar-foreground hover:bg-sidebar-accent gap-2 w-full sm:w-auto"
          >
            <Phone size={16} aria-hidden="true" />
            {RESTAURANT.phone}
          </Button>
        </div>
      </div>
    </div>
  )
}
