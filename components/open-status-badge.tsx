"use client"

import { useEffect, useState } from "react"
import { useLocale } from "@/lib/locale-context"
import { HOURS } from "@/lib/restaurant"
import { getOpenStatus, type OpenStatus } from "@/lib/open-status"
import { cn } from "@/lib/utils"

function toDisplayTime(hhmm: string, locale: "fr" | "en"): string {
  return locale === "fr" ? hhmm.replace(":", "h") : hhmm
}

// HOURS is ordered Monday-first; convert from Date.getDay() (0 = Sunday).
function dayLabel(jsDayIndex: number, locale: "fr" | "en"): string {
  const monFirstIndex = jsDayIndex === 0 ? 6 : jsDayIndex - 1
  return HOURS[monFirstIndex].day[locale]
}

function formatLabel(status: OpenStatus, locale: "fr" | "en"): string {
  if (status.open && status.closesAt) {
    const time = toDisplayTime(status.closesAt, locale)
    return locale === "fr" ? `Ouvert · ferme à ${time}` : `Open · closes at ${time}`
  }

  if (status.opensAt !== undefined) {
    const time = toDisplayTime(status.opensAt, locale)
    if (status.opensToday) {
      return locale === "fr" ? `Fermé · ouvre à ${time}` : `Closed · opens at ${time}`
    }
    if (status.opensDayIndex !== undefined) {
      const day = dayLabel(status.opensDayIndex, locale)
      return locale === "fr" ? `Fermé · ouvre ${day} à ${time}` : `Closed · opens ${day} at ${time}`
    }
  }

  return locale === "fr" ? "Fermé" : "Closed"
}

export function OpenStatusBadge({
  className,
  showDot = true,
}: {
  className?: string
  showDot?: boolean
}) {
  const { locale } = useLocale()
  const [status, setStatus] = useState<OpenStatus | null>(null)

  useEffect(() => {
    const update = () => setStatus(getOpenStatus())
    update()
    const id = setInterval(update, 60_000)
    return () => clearInterval(id)
  }, [])

  if (!status) return null

  return (
    <span className={cn("inline-flex items-center gap-1.5 whitespace-nowrap", className)}>
      {showDot && (
        <span
          className={cn(
            "size-2 shrink-0 rounded-full",
            status.open ? "bg-green-500" : "bg-muted-foreground/50"
          )}
          aria-hidden="true"
        />
      )}
      {formatLabel(status, locale)}
    </span>
  )
}
