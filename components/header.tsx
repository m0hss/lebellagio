"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect, startTransition, addTransitionType } from "react"
// import { Menu } from "lucide-react" // used by mobile hamburger
import { Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet" // used by mobile hamburger
import { useLocale } from "@/lib/locale-context"
import { t } from "@/lib/i18n"
import { RESTAURANT } from "@/lib/restaurant"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { OpenStatusBadge } from "@/components/open-status-badge"

const navLinks = [
  { key: "nav_menu" as const, href: "/menu" },
  { key: "nav_reservation" as const, href: "/reservation" },
  { key: "nav_order" as const, href: "/order" },
  { key: "nav_contact" as const, href: "/contact" },
]

export function Header() {
  const { locale } = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  // const [mobileOpen, setMobileOpen] = useState(false) // used by mobile hamburger
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  function handleNavClick(href: string) {
    // setMobileOpen(false) // used by mobile hamburger
    startTransition(() => {
      addTransitionType("nav-forward")
      router.push(href)
    })
  }

  return (
    <header
      className={cn(
        "md:sticky md:top-0 z-50 border-b transition-[background-color,backdrop-filter,border-color] duration-300",
        scrolled
          ? "bg-background/70 backdrop-blur-md border-border/60"
          : "bg-background/95 backdrop-blur-sm border-border"
      )}
      style={{ viewTransitionName: "persistent-nav" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center shrink-0"
            aria-label="Le Bellagio — Accueil"
            onClick={() =>
              startTransition(() => {
                addTransitionType("nav-back")
                router.push("/")
              })
            }
          >
            <Image
              src="/logo.svg"
              alt="Le Bellagio"
              width={328}
              height={100}
              className="h-14 w-auto md:h-15"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Navigation principale">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary cursor-pointer",
                  pathname === link.href ? "text-primary" : "text-foreground/70"
                )}
              >
                {t(locale, link.key)}
              </button>
            ))}
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-2 md:gap-3">
            <OpenStatusBadge className="hidden lg:inline-flex text-xs font-medium text-foreground/70" />

            {/* Socials */}
            <div className="flex items-center gap-1">
              <a
                href={RESTAURANT.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full flex items-center justify-center bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href={RESTAURANT.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full flex items-center justify-center bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href={RESTAURANT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-8 h-8 rounded-full flex items-center justify-center bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.85 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>

            {/* Phone CTA */}
            <Button nativeButton={false} render={<a href={`tel:${RESTAURANT.phoneRaw}`} aria-label={`Appeler ${RESTAURANT.phone}`} />} size="sm" className="hidden sm:inline-flex bg-primary hover:bg-primary/90 text-primary-foreground gap-1.5">
              <Phone size={14} aria-hidden="true" />
              {t(locale, "nav_call")}
            </Button>

            {/* Mobile hamburger — hidden for now; bottom action bar covers nav on small screens
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger
                className="md:hidden inline-flex items-center justify-center rounded-md w-9 h-9 text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                aria-label="Ouvrir le menu"
              >
                <Menu size={20} aria-hidden="true" />
              </SheetTrigger>
              <SheetContent side="right" className="bg-background w-72">
                <div className="flex flex-col gap-6 pt-6">
                  <Image
                    src="/logo.svg"
                    alt="Le Bellagio"
                    width={328}
                    height={100}
                    className="h-14 w-auto max-w-65"
                  />
                  <nav className="flex flex-col gap-1" aria-label="Navigation mobile">
                    <button
                      onClick={() => handleNavClick("/")}
                      className={cn(
                        "flex items-center gap-3 text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors hover:bg-accent",
                        pathname === "/" ? "text-primary bg-accent" : "text-foreground"
                      )}
                    >
                      <span
                        className={cn(
                          "size-2 shrink-0 rounded-full transition-colors",
                          pathname === "/" ? "bg-primary" : "bg-foreground/30"
                        )}
                        aria-hidden="true"
                      />
                      {t(locale, "nav_home")}
                    </button>
                    {navLinks.map((link) => (
                      <button
                        key={link.href}
                        onClick={() => handleNavClick(link.href)}
                        className={cn(
                          "flex items-center gap-3 text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors hover:bg-accent",
                          pathname === link.href ? "text-primary bg-accent" : "text-foreground"
                        )}
                      >
                        <span
                          className={cn(
                            "size-2 shrink-0 rounded-full transition-colors",
                            pathname === link.href ? "bg-primary" : "bg-foreground/30"
                          )}
                          aria-hidden="true"
                        />
                        {t(locale, link.key)}
                      </button>
                    ))}
                  </nav>
                  <div className="border-t border-border pt-4 flex items-center gap-2 px-3">
                    <a
                      href={`tel:${RESTAURANT.phoneRaw}`}
                      aria-label={`Appeler ${RESTAURANT.phone}`}
                      className="w-9 h-9 rounded-full flex items-center justify-center bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      <Phone size={16} aria-hidden="true" />
                    </a>
                    <a
                      href={RESTAURANT.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      className="w-9 h-9 rounded-full flex items-center justify-center bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                      </svg>
                    </a>
                    <a
                      href={RESTAURANT.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="w-9 h-9 rounded-full flex items-center justify-center bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                      </svg>
                    </a>
                    <a
                      href={RESTAURANT.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="WhatsApp"
                      className="w-9 h-9 rounded-full flex items-center justify-center bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.85 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            */}
          </div>
        </div>
      </div>
    </header>
  )
}
