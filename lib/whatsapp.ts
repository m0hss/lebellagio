import { RESTAURANT } from "./restaurant"
import type { Locale } from "./i18n"

/**
 * Builds a wa.me deep link that opens WhatsApp with a pre-filled message
 * addressed to the restaurant. No backend needed: the visitor just has to
 * hit send from their own WhatsApp app.
 */
export function buildWhatsAppUrl(message: string): string {
  const digits = RESTAURANT.phoneRaw.replace(/\D/g, "")
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
}

function formatLines(locale: Locale, entries: Array<[Bilingual, string | undefined]>): string {
  return entries
    .filter((entry): entry is [Bilingual, string] => Boolean(entry[1] && entry[1].trim()))
    .map(([label, value]) => `${label[locale]} : ${value}`)
    .join("\n")
}

interface Bilingual {
  fr: string
  en: string
}

export interface ReservationMessageData {
  name?: string
  phone?: string
  date?: string
  time?: string
  guests?: string
  notes?: string
}

export function buildReservationMessage(locale: Locale, data: ReservationMessageData): string {
  const title: Bilingual = {
    fr: "Nouvelle demande de réservation – Le Bellagio",
    en: "New reservation request – Le Bellagio",
  }
  const body = formatLines(locale, [
    [{ fr: "Nom", en: "Name" }, data.name],
    [{ fr: "Téléphone", en: "Phone" }, data.phone],
    [{ fr: "Date", en: "Date" }, data.date],
    [{ fr: "Heure", en: "Time" }, data.time],
    [{ fr: "Convives", en: "Guests" }, data.guests],
    [{ fr: "Message", en: "Notes" }, data.notes],
  ])
  return `${title[locale]}\n\n${body}`
}

export interface OrderMessageData {
  name?: string
  phone?: string
  pickup?: string
  notes?: string
  payment?: string
}

export function buildOrderMessage(locale: Locale, data: OrderMessageData): string {
  const title: Bilingual = {
    fr: "Nouvelle commande à emporter – Le Bellagio",
    en: "New takeaway order – Le Bellagio",
  }
  const body = formatLines(locale, [
    [{ fr: "Nom", en: "Name" }, data.name],
    [{ fr: "Téléphone", en: "Phone" }, data.phone],
    [{ fr: "Retrait", en: "Pickup" }, data.pickup],
    [{ fr: "Commande", en: "Order" }, data.notes],
    [{ fr: "Paiement", en: "Payment" }, data.payment],
  ])
  return `${title[locale]}\n\n${body}`
}

export interface ContactMessageData {
  name?: string
  email?: string
  message?: string
}

export function buildContactMessage(locale: Locale, data: ContactMessageData): string {
  const title: Bilingual = {
    fr: "Nouveau message via le site – Le Bellagio",
    en: "New website message – Le Bellagio",
  }
  const body = formatLines(locale, [
    [{ fr: "Nom", en: "Name" }, data.name],
    [{ fr: "Email", en: "Email" }, data.email],
    [{ fr: "Message", en: "Message" }, data.message],
  ])
  return `${title[locale]}\n\n${body}`
}
