"use client"

import { Suspense, useState } from "react"
import { useSearchParams } from "next/navigation"
import { CheckCircle2, MessageCircleMore, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
import { PICKUP_TIMES } from "@/lib/chat-flows"
import { buildOrderMessage, buildWhatsAppUrl } from "@/lib/whatsapp"

interface OrderInitialValues {
  name?: string
  phone?: string
  pickup?: string
  notes?: string
  payment?: string
}

function OrderFormFields({ initialValues = {} }: { initialValues?: OrderInitialValues }) {
  const { locale } = useLocale()
  const [submitted, setSubmitted] = useState(false)
  const [whatsappUrl, setWhatsappUrl] = useState("")
  const [payment, setPayment] = useState(initialValues.payment ?? "")
  const [pickup, setPickup] = useState(initialValues.pickup ?? "")

  function paymentLabel(value: string): string {
    if (value === "card") return t(locale, "order_form_payment_card")
    if (value === "cash") return t(locale, "order_form_payment_cash")
    if (value === "voucher") return t(locale, "order_form_payment_voucher")
    return value
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const message = buildOrderMessage(locale, {
      name: String(formData.get("name") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      pickup,
      notes: String(formData.get("notes") ?? ""),
      payment: payment ? paymentLabel(payment) : "",
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
          {locale === "fr" ? "Commande envoyée !" : "Order sent!"}
        </h2>
        <p className="text-muted-foreground max-w-sm text-balance leading-relaxed">
          {t(locale, "form_success_order")}
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
          {locale === "fr" ? "Nouvelle commande" : "New order"}
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="order-name">{t(locale, "order_form_name")} *</Label>
          <Input
            id="order-name"
            name="name"
            type="text"
            required
            defaultValue={initialValues.name}
            placeholder={locale === "fr" ? "Jean Dupont" : "Jane Smith"}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="order-phone">{t(locale, "order_form_phone")} *</Label>
          <Input
            id="order-phone"
            name="phone"
            type="tel"
            required
            defaultValue={initialValues.phone}
            placeholder="+33 6 12 34 56 78"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="order-pickup">{t(locale, "order_form_pickup")} *</Label>
          <Select value={pickup} onValueChange={(value) => setPickup(value ?? "")} required>
            <SelectTrigger id="order-pickup" className="w-full">
              <SelectValue placeholder={locale === "fr" ? "Choisir…" : "Choose…"} />
            </SelectTrigger>
            <SelectContent>
              {PICKUP_TIMES.map((slot) => (
                <SelectItem key={slot} value={slot}>
                  {slot}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="order-payment">{t(locale, "order_form_payment")}</Label>
          <Select value={payment} onValueChange={(value) => setPayment(value ?? "")}>
            <SelectTrigger id="order-payment" className="w-full">
              <SelectValue placeholder={locale === "fr" ? "Choisir…" : "Choose…"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="card">{t(locale, "order_form_payment_card")}</SelectItem>
              <SelectItem value="cash">{t(locale, "order_form_payment_cash")}</SelectItem>
              <SelectItem value="voucher">{t(locale, "order_form_payment_voucher")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="order-notes">{t(locale, "order_form_notes")} *</Label>
        <Textarea
          id="order-notes"
          name="notes"
          required
          rows={5}
          defaultValue={initialValues.notes}
          placeholder={
            locale === "fr"
              ? "Ex: 1 confit de canard, 2 pizzas Margherita, sans noix…"
              : "E.g: 1 duck confit, 2 Margherita pizzas, no nuts…"
          }
        />
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
      >
        {t(locale, "order_form_submit")}
      </Button>

      <div className="flex items-center gap-3 py-3">
        <span className="flex-1 h-px bg-border" aria-hidden="true" />
        <span className="text-xs text-muted-foreground">{locale === "fr" ? "ou" : "or"}</span>
        <span className="flex-1 h-px bg-border" aria-hidden="true" />
      </div>

      <Button
        render={<a href={`tel:${RESTAURANT.phoneRaw}`} />}
        nativeButton={false}
        size="lg"
        variant="outline"
        className="w-full border-primary/30 text-primary hover:bg-accent gap-2"
      >
        <Phone size={16} aria-hidden="true" />
        {locale === "fr" ? "Commander par téléphone" : "Order by phone"}
        <span className="font-semibold ml-1">{RESTAURANT.phone}</span>
      </Button>
    </form>
  )
}

function OrderFormWithParams() {
  const params = useSearchParams()
  const initialValues: OrderInitialValues = {
    name: params.get("name") ?? undefined,
    phone: params.get("phone") ?? undefined,
    pickup: params.get("pickup") ?? undefined,
    notes: params.get("notes") ?? undefined,
    payment: params.get("payment") ?? undefined,
  }
  return <OrderFormFields initialValues={initialValues} />
}

export function OrderForm() {
  return (
    <Suspense fallback={<OrderFormFields />}>
      <OrderFormWithParams />
    </Suspense>
  )
}
