"use client"

import { useLocale } from "@/lib/locale-context"
import { SERVICES } from "@/lib/restaurant"
import { cn } from "@/lib/utils"

interface FeatureChipsProps {
  className?: string
}

export function FeatureChips({ className }: FeatureChipsProps) {
  const { locale } = useLocale()

  return (
    <ul className={cn("flex flex-wrap gap-2", className)} aria-label="Services">
      {SERVICES.map((s, i) => (
        <li
          key={i}
          className="px-3 py-1.5 bg-accent text-accent-foreground rounded-full text-xs font-medium border border-border/50"
        >
          {s[locale]}
        </li>
      ))}
    </ul>
  )
}
