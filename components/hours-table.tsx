"use client"

import { useLocale } from "@/lib/locale-context"
import { t } from "@/lib/i18n"
import { HOURS } from "@/lib/restaurant"
import { cn } from "@/lib/utils"

export function HoursTable() {
  const { locale } = useLocale()
  const todayIndex = new Date().getDay()
  // 0 = Sunday → index 6; 1-6 = Mon-Sat → index 0-5
  const currentDayIndex = todayIndex === 0 ? 6 : todayIndex - 1

  return (
    <table className="w-full text-xs">
      <thead className="sr-only">
        <tr>
          <th>{locale === "fr" ? "Jour" : "Day"}</th>
          <th>{t(locale, "hours_lunch")}</th>
          <th>{t(locale, "hours_dinner")}</th>
        </tr>
      </thead>
      <tbody>
        {HOURS.map((row, i) => (
          <tr
            key={i}
            className={cn(
              "border-b border-border/60 last:border-0",
              i === currentDayIndex && "text-primary font-semibold"
            )}
          >
            <td className="py-2.5 pr-4 font-medium whitespace-nowrap">
              {row.day[locale]}
              {i === currentDayIndex && (
                <span className="sr-only"> ({locale === "fr" ? "aujourd'hui" : "today"})</span>
              )}
            </td>
            {row.closed ? (
              <td colSpan={2} className="py-2.5 text-muted-foreground">
                {t(locale, "hours_closed")}
              </td>
            ) : (
              <>
                <td className="py-2.5 pr-4 text-muted-foreground whitespace-nowrap">{row.lunch}</td>
                <td className="py-2.5 text-muted-foreground whitespace-nowrap">{row.dinner}</td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
