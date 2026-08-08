"use client"

import { Suspense, useState } from "react"
import { useSearchParams } from "next/navigation"
import { format } from "date-fns"
import { enUS, fr } from "react-day-picker/locale"
import { CalendarIcon, CheckCircle2, MessageCircleMore } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
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
    initialValues.date ? new Date(initialValues.date) : undefined,
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
                !date && "text-muted-foreground",
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

      <p className="text-center text-sm text-muted-foreground inline-flex items-center justify-center gap-2.5 w-full flex-wrap">
        {t(locale, "reservation_or")}
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
