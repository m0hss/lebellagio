import { OPENING_HOURS, type DayHours } from "./restaurant"

const WEEKDAY_INDEX: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
}

function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number)
  return h * 60 + m
}

/** Reads the current day/time in Europe/Paris, regardless of the visitor's own timezone. */
function getParisNow(date: Date): { dayIndex: number; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Paris",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date)

  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "Mon"
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? "0")
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? "0")

  return { dayIndex: WEEKDAY_INDEX[weekday] ?? 1, minutes: hour * 60 + minute }
}

export interface OpenStatus {
  open: boolean
  /** "HH:MM" time the current service closes, only set when open. */
  closesAt?: string
  /** "HH:MM" time of the next opening, only set when closed. */
  opensAt?: string
  /** JS Date.getDay() convention (0 = Sunday) for the day the next opening falls on. */
  opensDayIndex?: number
  /** Whether the next opening is later today. */
  opensToday?: boolean
}

export function getOpenStatus(now: Date = new Date(), hours: DayHours[] = OPENING_HOURS): OpenStatus {
  const { dayIndex, minutes } = getParisNow(now)
  const today = hours.find((d) => d.day === dayIndex)

  if (today) {
    for (const [start, end] of today.ranges) {
      if (minutes >= toMinutes(start) && minutes < toMinutes(end)) {
        return { open: true, closesAt: end }
      }
    }
    const upcomingToday = today.ranges.find(([start]) => toMinutes(start) > minutes)
    if (upcomingToday) {
      return { open: false, opensAt: upcomingToday[0], opensDayIndex: dayIndex, opensToday: true }
    }
  }

  for (let offset = 1; offset <= 7; offset++) {
    const idx = (dayIndex + offset) % 7
    const day = hours.find((d) => d.day === idx)
    if (day && day.ranges.length > 0) {
      return { open: false, opensAt: day.ranges[0][0], opensDayIndex: idx, opensToday: false }
    }
  }

  return { open: false }
}
