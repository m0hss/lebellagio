"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Phone, CalendarDays, ShoppingBag, UtensilsCrossed } from "lucide-react"
import { useLocale } from "@/lib/locale-context"
import { t } from "@/lib/i18n"
import { RESTAURANT } from "@/lib/restaurant"
import { cn } from "@/lib/utils"

export function MobileActionBar() {
  const { locale } = useLocale()
  const pathname = usePathname()

  const linkClass = (active: boolean) =>
    cn(
      "flex flex-col items-center justify-center gap-1 text-xs transition-colors",
      active ? "text-primary" : "text-muted-foreground hover:text-primary active:text-primary",
    )

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-background border-t border-border pb-[env(safe-area-inset-bottom)]"
      aria-label="Actions rapides"
    >
      <div className="grid grid-cols-4 h-16">
        <Link
          href="/menu"
          className={linkClass(pathname === "/menu")}
          aria-current={pathname === "/menu" ? "page" : undefined}
          aria-label={t(locale, "nav_menu")}
        >
          <UtensilsCrossed size={20} aria-hidden="true" />
          <span className="text-[10px] font-medium">{t(locale, "nav_menu")}</span>
        </Link>

        <Link
          href="/reservation"
          className={linkClass(pathname === "/reservation")}
          aria-current={pathname === "/reservation" ? "page" : undefined}
          aria-label={t(locale, "nav_reservation")}
        >
          <CalendarDays size={20} aria-hidden="true" />
          <span className="text-[10px] font-medium">{t(locale, "nav_reservation")}</span>
        </Link>

        <Link
          href="/order"
          className={linkClass(pathname === "/order")}
          aria-current={pathname === "/order" ? "page" : undefined}
          aria-label={t(locale, "nav_order")}
        >
          <ShoppingBag size={20} aria-hidden="true" />
          <span className="text-[10px] font-medium">{t(locale, "nav_order")}</span>
        </Link>

        <a
          href={`tel:${RESTAURANT.phoneRaw}`}
          className={linkClass(false)}
          aria-label={`Appeler ${RESTAURANT.phone}`}
        >
          <Phone size={20} aria-hidden="true" />
          <span className="text-[10px] font-medium">{t(locale, "nav_call")}</span>
        </a>
      </div>
    </nav>
  )
}
