"use client"

import { useState } from "react"
import { Phone, Mail, CheckCircle2, MessageCircleMore } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Reveal } from "@/components/reveal"
import { useLocale } from "@/lib/locale-context"
import { t } from "@/lib/i18n"
import { RESTAURANT } from "@/lib/restaurant"
import { buildContactMessage, buildWhatsAppUrl } from "@/lib/whatsapp"

export function ContactSection() {
  const { locale } = useLocale()
  const [submitted, setSubmitted] = useState(false)
  const [whatsappUrl, setWhatsappUrl] = useState("")

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const message = buildContactMessage(locale, {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? ""),
    })
    const url = buildWhatsAppUrl(message)
    setWhatsappUrl(url)
    window.open(url, "_blank", "noopener,noreferrer")
    setSubmitted(true)
  }

  return (
    <section aria-labelledby="contact-heading" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Direct contact */}
          <Reveal animation="fade-right">
            <p className="text-secondary text-sm font-medium tracking-widest uppercase mb-3">
              {locale === "fr" ? "Nous contacter" : "Get in touch"}
            </p>
            <h2
              id="contact-heading"
              className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-6 text-pretty"
            >
              {t(locale, "contact_heading")}
            </h2>
            <div className="space-y-4 mb-8">
              <a
                href={`tel:${RESTAURANT.phoneRaw}`}
                className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border hover:border-primary/30 hover:-translate-y-0.5 transition-all group"
                aria-label={`Appeler ${RESTAURANT.phone}`}
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Phone size={18} className="text-primary" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{t(locale, "contact_phone")}</p>
                  <p className="font-semibold text-foreground">{RESTAURANT.phone}</p>
                </div>
              </a>
              <a
                href={RESTAURANT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border hover:border-primary/30 hover:-translate-y-0.5 transition-all group"
                aria-label={locale === "fr" ? "Écrire sur WhatsApp" : "Message on WhatsApp"}
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-primary"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.85 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{t(locale, "chat_whatsapp")}</p>
                  <p className="font-semibold text-foreground">{RESTAURANT.phone}</p>
                </div>
              </a>
              <a
                href={`mailto:${RESTAURANT.email}`}
                className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border hover:border-primary/30 hover:-translate-y-0.5 transition-all group"
                aria-label={`Envoyer un email à ${RESTAURANT.email}`}
              >
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 group-hover:bg-secondary/20 transition-colors">
                  <Mail size={18} className="text-secondary" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{t(locale, "contact_email")}</p>
                  <p className="font-semibold text-foreground break-all">{RESTAURANT.email}</p>
                </div>
              </a>
            </div>
          </Reveal>

          {/* Contact form */}
          <Reveal
            animation="fade-left"
            delay={100}
            className="bg-card rounded-2xl border border-border p-6 md:p-8"
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-8 gap-4">
                <CheckCircle2 size={48} className="text-primary" aria-hidden="true" />
                <p className="font-serif text-xl font-semibold text-foreground">
                  {locale === "fr" ? "Message envoyé !" : "Message sent!"}
                </p>
                <p className="text-muted-foreground text-sm">{t(locale, "contact_form_success")}</p>
                <Button
                  render={<a href={whatsappUrl} target="_blank" rel="noopener noreferrer" />}
                  nativeButton={false}
                  className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <MessageCircleMore size={16} aria-hidden="true" />
                  {t(locale, "whatsapp_open_button")}
                </Button>
                <Button variant="outline" onClick={() => setSubmitted(false)} className="mt-2">
                  {locale === "fr" ? "Envoyer un autre message" : "Send another message"}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="space-y-1.5">
                  <Label htmlFor="contact-name">{t(locale, "contact_form_name")}</Label>
                  <Input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    placeholder="Jean Dupont"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="contact-email">{t(locale, "contact_form_email")}</Label>
                  <Input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    placeholder="jean@exemple.fr"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="contact-message">{t(locale, "contact_form_message")}</Label>
                  <Textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={4}
                    className="field-sizing-fixed min-h-28"
                    placeholder={locale === "fr" ? "Votre message…" : "Your message…"}
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {t(locale, "contact_form_submit")}
                </Button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
