import { MENU_CATEGORIES, PAYMENT_METHODS } from "./restaurant"

export type FlowId = "reservation" | "order"

export type StepKind = "text" | "chips" | "date"

export interface Bilingual {
  fr: string
  en: string
}

export interface ChipOption {
  value: string
  label: Bilingual
}

export interface FlowStep {
  id: string
  kind: StepKind
  question: Bilingual
  placeholder?: Bilingual
  options?: ChipOption[]
  suggestions?: ChipOption[]
  optional?: boolean
}

export interface FlowDefinition {
  id: FlowId
  steps: FlowStep[]
}

// Shared with the real reservation form (components/reservation/reservation-form.tsx)
export const TIME_SLOTS = [
  "12:00",
  "12:15",
  "12:30",
  "12:45",
  "13:00",
  "13:15",
  "13:30",
  "13:45",
  "14:00",
  "19:00",
  "19:15",
  "19:30",
  "19:45",
  "20:00",
  "20:15",
  "20:30",
  "20:45",
  "21:00",
  "21:15",
  "21:30",
  "21:45",
  "22:00",
]

// Shared with the real order form (components/order/order-form.tsx)
export const PICKUP_TIMES = [
  "12:00",
  "12:15",
  "12:30",
  "12:45",
  "13:00",
  "13:15",
  "13:30",
  "13:45",
  "14:00",
  "19:00",
  "19:15",
  "19:30",
  "19:45",
  "20:00",
  "20:15",
  "20:30",
  "20:45",
  "21:00",
  "21:30",
  "22:00",
]

export function isPastDay(date: Date): boolean {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const compared = new Date(date)
  compared.setHours(0, 0, 0, 0)
  return compared < today
}

// The restaurant is closed on Sundays (see lib/restaurant.ts HOURS).
export function isClosedDay(date: Date): boolean {
  return date.getDay() === 0
}

const GUEST_OPTIONS: ChipOption[] = [
  ...[1, 2, 3, 4, 5, 6].map((n) => ({
    value: String(n),
    label: {
      fr: n === 1 ? "1 personne" : `${n} personnes`,
      en: n === 1 ? "1 guest" : `${n} guests`,
    },
  })),
  { value: "7+", label: { fr: "7 personnes ou +", en: "7 guests or more" } },
]

const TIME_OPTIONS: ChipOption[] = TIME_SLOTS.map((slot) => ({
  value: slot,
  label: { fr: slot, en: slot },
}))

const PICKUP_OPTIONS: ChipOption[] = PICKUP_TIMES.map((slot) => ({
  value: slot,
  label: { fr: slot, en: slot },
}))

// Card / cash / meal voucher only — matches the choices on the real order form.
const PAYMENT_OPTIONS: ChipOption[] = [
  { value: "card", label: PAYMENT_METHODS[0] },
  { value: "cash", label: PAYMENT_METHODS[1] },
  { value: "voucher", label: PAYMENT_METHODS[3] },
]

const DISH_SUGGESTIONS: ChipOption[] = MENU_CATEGORIES.flatMap((category) =>
  category.items
    .filter(
      (item): item is typeof item & { featured: true } =>
        "featured" in item && item.featured === true,
    )
    .map((item) => ({ value: item.name.fr, label: item.name })),
)

export const RESERVATION_FLOW: FlowDefinition = {
  id: "reservation",
  steps: [
    {
      id: "name",
      kind: "text",
      question: { fr: "Quel est votre nom ?", en: "What's your name?" },
      placeholder: { fr: "Jean Dupont", en: "Jane Smith" },
    },
    {
      id: "phone",
      kind: "text",
      question: { fr: "Votre numéro de téléphone ?", en: "What's your phone number?" },
      placeholder: { fr: "+33 6 12 34 56 78", en: "+33 6 12 34 56 78" },
    },
    {
      id: "date",
      kind: "date",
      question: { fr: "Pour quelle date ?", en: "For which date?" },
    },
    {
      id: "time",
      kind: "chips",
      question: { fr: "À quelle heure ?", en: "At what time?" },
      options: TIME_OPTIONS,
    },
    {
      id: "guests",
      kind: "chips",
      question: { fr: "Pour combien de personnes ?", en: "For how many guests?" },
      options: GUEST_OPTIONS,
    },
    {
      id: "notes",
      kind: "text",
      question: {
        fr: "Une info à ajouter ? (allergie, anniversaire…)",
        en: "Anything to add? (allergy, birthday…)",
      },
      placeholder: { fr: "Ex : allergie aux noix", en: "E.g: nut allergy" },
      optional: true,
    },
  ],
}

export const ORDER_FLOW: FlowDefinition = {
  id: "order",
  steps: [
    {
      id: "name",
      kind: "text",
      question: { fr: "Quel est votre nom ?", en: "What's your name?" },
      placeholder: { fr: "Jean Dupont", en: "Jane Smith" },
    },
    {
      id: "phone",
      kind: "text",
      question: { fr: "Votre numéro de téléphone ?", en: "What's your phone number?" },
      placeholder: { fr: "+33 6 12 34 56 78", en: "+33 6 12 34 56 78" },
    },
    {
      id: "pickup",
      kind: "chips",
      question: {
        fr: "À quelle heure souhaitez-vous récupérer votre commande ?",
        en: "What pickup time would you like?",
      },
      options: PICKUP_OPTIONS,
    },
    {
      id: "dishes",
      kind: "text",
      question: {
        fr: "Que souhaitez-vous commander ?",
        en: "What would you like to order?",
      },
      placeholder: {
        fr: "Ex : 1 confit de canard, 2 margherita…",
        en: "E.g: 1 duck confit, 2 margherita pizzas…",
      },
      suggestions: DISH_SUGGESTIONS,
    },
    {
      id: "payment",
      kind: "chips",
      question: { fr: "Comment souhaitez-vous payer ?", en: "How would you like to pay?" },
      options: PAYMENT_OPTIONS,
      optional: true,
    },
  ],
}

export const FLOWS: Record<FlowId, FlowDefinition> = {
  reservation: RESERVATION_FLOW,
  order: ORDER_FLOW,
}
