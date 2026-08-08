"use client"

import { Suspense, useState } from "react"
import { useSearchParams } from "next/navigation"
import { format } from "date-fns"
import { enUS, fr } from "react-day-picker/locale"
import { CalendarIcon, CheckCircle2, MessageCircleMore, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useLocale } from "@/lib/locale-context"
import { t } from "@/lib/i18n"
import { RESTAURANT } from "@/lib/restaurant"
import { TIME_SLOTS, isClosedDay, isPastDay } from "@/lib/chat-flows"
import { buildReservationMessage, buildWhatsAppUrl } from "@/lib/whatsapp"
import { cn } from "@/lib/utils"

interface ReservationInitialValues {
  name?: string
  phone?: string
  email?: string
  date?: string
  time?: string
  guests?: string
  notes?: string
}

function ReservationFormFields({
  initialValues = {},
}: {
  initialValues?: ReservationInitialValues
}) {
  const { locale } = useLocale()
  const [submitted, setSubmitted] = useState(false)
  const [whatsappUrl, setWhatsappUrl] = useState("")
  const [guests, setGuests] = useState(initialValues.guests ?? "")
  const [time, setTime] = useState(initialValues.time ?? "")
  const [date, setDate] = useState<Date | undefined>(
    initialValues.date ? new Date(initialValues.date) : undefined
  )
  const [dateOpen, setDateOpen] = useState(false)
  const dayPickerLocale = locale === "fr" ? fr : enUS

  function guestsLabel(value: string): string {
    if (value === "7+") return t(locale, "guests_more")
    if (["1", "2", "3", "4", "5", "6"].includes(value)) {
      return t(locale, `guests_${value}` as Parameters<typeof t>[1])
    }
    return value
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!date || !time || !guests) return
    const formData = new FormData(e.currentTarget)
    const dateLabel = format(date, locale === "fr" ? "d MMMM yyyy" : "MMM d, yyyy", {
      locale: dayPickerLocale,
    })
    const message = buildReservationMessage(locale, {
      name: String(formData.get("name") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      date: dateLabel,
      time,
      guests: guestsLabel(guests),
      notes: String(formData.get("notes") ?? ""),
    })
    const url = buildWhatsAppUrl(message)
    setWhatsappUrl(url)
    window.open(url, "_blank", "noopener,noreferrer")
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 gap-5">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <CheckCircle2 size={32} className="text-primary" aria-hidden="true" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-foreground">
          {locale === "fr" ? "Demande envoyée !" : "Request sent!"}
        </h2>
        <p className="text-muted-foreground max-w-sm text-balance leading-relaxed">
          {t(locale, "form_success_reservation")}
        </p>
        <Button
          render={<a href={whatsappUrl} target="_blank" rel="noopener noreferrer" />}
          nativeButton={false}
          className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <MessageCircleMore size={16} aria-hidden="true" />
          {t(locale, "whatsapp_open_button")}
        </Button>
        <Button variant="outline" onClick={() => setSubmitted(false)} className="mt-2">
          {locale === "fr" ? "Nouvelle réservation" : "New reservation"}
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="res-name">{t(locale, "form_name")} *</Label>
          <Input
            id="res-name"
            name="name"
            type="text"
            required
            defaultValue={initialValues.name}
            placeholder={locale === "fr" ? "Jean Dupont" : "Jane Smith"}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="res-phone">{t(locale, "form_phone")} *</Label>
          <Input
            id="res-phone"
            name="phone"
            type="tel"
            required
            defaultValue={initialValues.phone}
            placeholder="+33 6 12 34 56 78"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="res-email">{t(locale, "form_email")}</Label>
        <Input
          id="res-email"
          name="email"
          type="email"
          defaultValue={initialValues.email}
          placeholder={locale === "fr" ? "jean@exemple.fr" : "jane@example.com"}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-1.5 sm:col-span-1">
          <Label htmlFor="res-date">{t(locale, "form_date")} *</Label>
          <Popover open={dateOpen} onOpenChange={setDateOpen}>
            <PopoverTrigger
              id="res-date"
              className={cn(
                "flex h-8 w-full items-center justify-between gap-1.5 rounded-lg border border-input bg-transparent px-2.5 text-sm transition-colors outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
                !date && "text-muted-foreground"
              )}
              aria-required="true"
            >
              <span className="truncate">
                {date
                  ? format(date, locale === "fr" ? "d MMMM yyyy" : "MMM d, yyyy", {
                      locale: dayPickerLocale,
                    })
                  : locale === "fr"
                    ? "Choisir…"
                    : "Choose…"}
              </span>
              <CalendarIcon className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
            </PopoverTrigger>
            <PopoverContent align="start" className="w-auto p-0">
              <Calendar
                mode="single"
                locale={dayPickerLocale}
                selected={date}
                onSelect={(value) => {
                  setDate(value)
                  setDateOpen(false)
                }}
                disabled={(day) => isPastDay(day) || isClosedDay(day)}
                defaultMonth={date}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="res-time">{t(locale, "form_time")} *</Label>
          <Select value={time} onValueChange={(value) => setTime(value ?? "")} required>
            <SelectTrigger id="res-time" className="w-full">
              <SelectValue placeholder={locale === "fr" ? "Choisir…" : "Choose…"} />
            </SelectTrigger>
            <SelectContent>
              {TIME_SLOTS.map((slot) => (
                <SelectItem key={slot} value={slot}>
                  {slot}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="res-guests">{t(locale, "form_guests")} *</Label>
          <Select value={guests} onValueChange={(value) => setGuests(value ?? "")} required>
            <SelectTrigger id="res-guests" className="w-full">
              <SelectValue placeholder={locale === "fr" ? "Choisir…" : "Choose…"} />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <SelectItem key={n} value={String(n)}>
                  {t(locale, `guests_${n}` as Parameters<typeof t>[1])}
                </SelectItem>
              ))}
              <SelectItem value="7+">{t(locale, "guests_more")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="res-message">{t(locale, "form_message")}</Label>
        <Textarea
          id="res-message"
          name="notes"
          rows={3}
          defaultValue={initialValues.notes}
          placeholder={
            locale === "fr"
              ? "Ex: anniversaire, allergie aux noix, chaise haute…"
              : "E.g: birthday, nut allergy, high chair…"
          }
        />
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
      >
        {t(locale, "form_submit")}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        {t(locale, "reservation_or")}{" "}
        <a
          href={`tel:${RESTAURANT.phoneRaw}`}
          className="font-medium text-primary hover:underline inline-flex items-center gap-1"
        >
          <Phone size={13} aria-hidden="true" />
          {RESTAURANT.phone}
        </a>
      </p>
    </form>
  )
}

function ReservationFormWithParams() {
  const params = useSearchParams()
  const initialValues: ReservationInitialValues = {
    name: params.get("name") ?? undefined,
    phone: params.get("phone") ?? undefined,
    email: params.get("email") ?? undefined,
    date: params.get("date") ?? undefined,
    time: params.get("time") ?? undefined,
    guests: params.get("guests") ?? undefined,
    notes: params.get("notes") ?? undefined,
  }
  return <ReservationFormFields initialValues={initialValues} />
}

export function ReservationForm() {
  return (
    <Suspense fallback={<ReservationFormFields />}>
      <ReservationFormWithParams />
    </Suspense>
  )
}
