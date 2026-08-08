"use client"

import { useEffect, useState } from "react"
import { Download, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLocale } from "@/lib/locale-context"
import { t } from "@/lib/i18n"

const INSTALL_KEY = "lb_pwa_install"
const COOKIE_KEY = "lb_cookie_consent"

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

function isStandalone() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as unknown as { standalone?: boolean }).standalone === true
  )
}

function isIos() {
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent)
}

export function InstallPrompt() {
  const { locale } = useLocale()
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [visible, setVisible] = useState(false)
  const [ios, setIos] = useState(false)

  useEffect(() => {
    if (isStandalone()) return
    if (localStorage.getItem(INSTALL_KEY)) return

    if (isIos()) {
      setIos(true)
      if (localStorage.getItem(COOKIE_KEY)) setVisible(true)
      return
    }

    function handleBeforeInstallPrompt(event: Event) {
      event.preventDefault()
      setDeferredPrompt(event as BeforeInstallPromptEvent)
      if (localStorage.getItem(COOKIE_KEY)) setVisible(true)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
  }, [])

  function dismiss() {
    localStorage.setItem(INSTALL_KEY, "dismissed")
    setVisible(false)
  }

  async function install() {
    if (!deferredPrompt) return
    await deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === "accepted") localStorage.setItem(INSTALL_KEY, "installed")
    setDeferredPrompt(null)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label={t(locale, "pwa_install_cta")}
      className="fixed bottom-4 left-4 right-4 z-50 max-w-xl mx-auto bg-card border border-border rounded-xl shadow-lg p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3"
    >
      <p className="flex-1 text-sm text-foreground leading-relaxed">
        {t(locale, "pwa_install_text")}
        {ios && <span className="block text-muted-foreground mt-1">{t(locale, "pwa_install_ios_hint")}</span>}
      </p>
      <div className="flex items-center gap-2 shrink-0">
        <Button size="sm" variant="outline" onClick={dismiss} className="text-xs border-border">
          {t(locale, "pwa_later")}
        </Button>
        {!ios && (
          <Button
            size="sm"
            onClick={install}
            className="text-xs bg-primary text-primary-foreground hover:bg-primary/90 gap-1"
          >
            <Download size={14} aria-hidden="true" />
            {t(locale, "pwa_install_cta")}
          </Button>
        )}
        <button
          onClick={dismiss}
          aria-label="Fermer"
          className="ml-1 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X size={16} aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
