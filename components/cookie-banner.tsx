"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useLocale } from "@/lib/locale-context"
import { t } from "@/lib/i18n"
import { X } from "lucide-react"

const COOKIE_KEY = "lb_cookie_consent"

export function CookieBanner() {
  const { locale } = useLocale()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_KEY)
    if (!stored) setVisible(true)
  }, [])

  function accept() {
    localStorage.setItem(COOKIE_KEY, "accepted")
    setVisible(false)
  }

  function refuse() {
    localStorage.setItem(COOKIE_KEY, "refused")
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Gestion des cookies"
      className="fixed bottom-4 left-4 right-4 z-50 max-w-xl mx-auto bg-card border border-border rounded-xl shadow-lg p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3"
    >
      <p className="flex-1 text-sm text-foreground leading-relaxed">
        {t(locale, "cookie_text")}{" "}
        <Link href="/cookies" className="underline text-primary hover:text-primary/80">
          {t(locale, "footer_cookies")}
        </Link>
      </p>
      <div className="flex items-center gap-2 shrink-0">
        <Button size="sm" variant="outline" onClick={refuse} className="text-xs border-border">
          {t(locale, "cookie_refuse")}
        </Button>
        <Button
          size="sm"
          onClick={accept}
          className="text-xs bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {t(locale, "cookie_accept")}
        </Button>
        <button
          onClick={refuse}
          aria-label="Fermer"
          className="ml-1 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X size={16} aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
