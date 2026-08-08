"use client"

import { useState } from "react"
import { format } from "date-fns"
import { enUS, fr } from "react-day-picker/locale"
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock,
  MessageCircleMore,
  Phone,
  ShoppingBag,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { HoursTable } from "@/components/hours-table"
import { useLocale } from "@/lib/locale-context"
import { t, type TranslationKey } from "@/lib/i18n"
import { RESTAURANT } from "@/lib/restaurant"
import { isClosedDay, isPastDay, type FlowId, type FlowStep } from "@/lib/chat-flows"
import { buildOrderMessage, buildReservationMessage, buildWhatsAppUrl } from "@/lib/whatsapp"
import { cn } from "@/lib/utils"
import type { Locale } from "@/lib/i18n"
import { useChatFlow } from "./use-chat-flow"
import type { Screen } from "./types"

const FIELD_LABEL_KEYS: Record<FlowId, Record<string, TranslationKey>> = {
  reservation: {
    name: "form_name",
    phone: "form_phone",
    date: "form_date",
    time: "form_time",
    guests: "form_guests",
    notes: "form_message",
  },
  order: {
    name: "order_form_name",
    phone: "order_form_phone",
    pickup: "order_form_pickup",
    dishes: "order_form_notes",
    payment: "order_form_payment",
  },
}

interface ChatPanelProps {
  onClose: () => void
}

export function ChatPanel({ onClose }: ChatPanelProps) {
  const { locale } = useLocale()
  const chat = useChatFlow()
  const { state } = chat

  const showBack = state.screen !== "menu"

  return (
    <div className="flex h-[min(560px,70vh)] w-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border bg-sidebar px-4 py-3">
        {showBack ? (
          <button
            type="button"
            onClick={chat.goToMenu}
            aria-label={t(locale, "chat_back_to_menu")}
            className="flex size-8 shrink-0 items-center justify-center rounded-full text-sidebar-foreground/70 hover:bg-sidebar-foreground/10 hover:text-sidebar-foreground transition-colors"
          >
            <ArrowLeft size={18} aria-hidden="true" />
          </button>
        ) : (
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-sidebar-foreground/15">
            <MessageCircleMore size={18} className="text-sidebar-primary" aria-hidden="true" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="font-serif text-sm font-semibold text-sidebar-foreground truncate">
            {t(locale, "chat_title")}
          </p>
          <p className="text-xs text-sidebar-foreground/60">{t(locale, "chat_subtitle")}</p>
        </div>
        <a
          href={`tel:${RESTAURANT.phoneRaw}`}
          aria-label={t(locale, "chat_call_us")}
          className="flex size-8 shrink-0 items-center justify-center rounded-full text-sidebar-foreground/70 hover:bg-sidebar-foreground/10 hover:text-sidebar-foreground transition-colors"
        >
          <Phone size={16} aria-hidden="true" />
        </a>
        <button
          type="button"
          onClick={onClose}
          aria-label={t(locale, "chat_close_assistant")}
          className="flex size-8 shrink-0 items-center justify-center rounded-full text-sidebar-foreground/70 hover:bg-sidebar-foreground/10 hover:text-sidebar-foreground transition-colors"
        >
          <X size={18} aria-hidden="true" />
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {state.screen === "menu" && <MenuScreen onSelect={chat.selectFlow} />}
        {state.screen === "hours" && <HoursScreen />}
        {state.screen === "call" && <CallScreen />}
        {(state.screen === "reservation" || state.screen === "order") && <FlowScreen chat={chat} />}
      </div>
    </div>
  )
}

function MenuScreen({ onSelect }: { onSelect: (screen: Screen) => void }) {
  const { locale } = useLocale()
  const chips: { screen: Screen; label: TranslationKey; icon: typeof CalendarDays }[] = [
    { screen: "reservation", label: "chat_chip_reservation", icon: CalendarDays },
    { screen: "order", label: "chat_chip_order", icon: ShoppingBag },
    { screen: "hours", label: "chat_chip_hours", icon: Clock },
    { screen: "call", label: "chat_chip_call", icon: Phone },
  ]

  return (
    <div className="space-y-4">
      <BotBubble>{t(locale, "chat_greeting")}</BotBubble>
      <div className="grid grid-cols-2 gap-2">
        {chips.map(({ screen, label, icon: Icon }) => (
          <button
            key={screen}
            type="button"
            onClick={() => onSelect(screen)}
            className="flex flex-col items-center gap-1.5 rounded-xl border border-border bg-background px-3 py-3 text-center text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-accent"
          >
            <Icon size={18} className="text-secondary" aria-hidden="true" />
            {t(locale, label)}
          </button>
        ))}
      </div>
    </div>
  )
}

function HoursScreen() {
  const { locale } = useLocale()
  return (
    <div className="space-y-4">
      <BotBubble>{t(locale, "chat_hours_title")}</BotBubble>
      <div className="rounded-xl border border-border bg-background p-3">
        <HoursTable />
      </div>
      <p className="text-xs text-muted-foreground">{t(locale, "chat_hours_closed_note")}</p>
    </div>
  )
}

function CallScreen() {
  const { locale } = useLocale()
  return (
    <div className="space-y-4">
      <BotBubble>{t(locale, "chat_chip_call")}</BotBubble>
      <div className="flex flex-col gap-2">
        <Button
          render={<a href={`tel:${RESTAURANT.phoneRaw}`} />}
          nativeButton={false}
          size="lg"
          className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Phone size={16} aria-hidden="true" />
          {t(locale, "chat_call_us")} · {RESTAURANT.phone}
        </Button>
        <Button
          render={<a href={RESTAURANT.whatsapp} target="_blank" rel="noreferrer" />}
          nativeButton={false}
          size="lg"
          variant="outline"
          className="w-full gap-2 border-primary/30 text-primary hover:bg-accent"
        >
          <MessageCircleMore size={16} aria-hidden="true" />
          {t(locale, "chat_whatsapp")}
        </Button>
      </div>
    </div>
  )
}

function FlowScreen({ chat }: { chat: ReturnType<typeof useChatFlow> }) {
  const { locale } = useLocale()
  const { state, flow, currentStep, isSummary, isLargeGroup } = chat

  if (!flow) return null

  if (state.submitted) {
    const successKey =
      state.screen === "reservation" ? "chat_success_reservation_title" : "chat_success_order_title"
    const formPath = state.screen === "reservation" ? "/reservation" : "/order"
    const prefillHref = `${formPath}?${buildPrefillParams(state.screen as FlowId, state.answers).toString()}`
    const whatsappHref = buildChatWhatsAppUrl(locale, state.screen as FlowId, state.displayAnswers)

    return (
      <div className="flex flex-col items-center gap-4 py-6 text-center">
        <div className="flex size-14 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle2 size={26} className="text-primary" aria-hidden="true" />
        </div>
        <div className="space-y-1.5">
          <p className="font-serif text-lg font-bold text-foreground">{t(locale, successKey)}</p>
          <p className="max-w-xs text-sm text-muted-foreground leading-relaxed">
            {t(locale, "chat_confirmation_note")}
          </p>
        </div>
        <div className="flex w-full flex-col gap-2">
          <Button
            render={<a href={whatsappHref} target="_blank" rel="noopener noreferrer" />}
            nativeButton={false}
            size="lg"
            className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <MessageCircleMore size={16} aria-hidden="true" />
            {t(locale, "chat_send_whatsapp")}
          </Button>
          <Button
            render={<a href={prefillHref} />}
            nativeButton={false}
            size="lg"
            variant="outline"
            className="w-full"
          >
            {t(locale, "chat_open_form")}
          </Button>
          <Button variant="outline" size="lg" className="w-full" onClick={chat.restartFlow}>
            {t(locale, "chat_new_request")}
          </Button>
        </div>
      </div>
    )
  }

  if (isLargeGroup) {
    return (
      <div className="space-y-4">
        {flow.steps.slice(0, state.stepIndex).map((step) => (
          <Exchange key={step.id} step={step} answer={state.displayAnswers[step.id]} />
        ))}
        <BotBubble>{t(locale, "chat_large_group_note")}</BotBubble>
        <div className="flex flex-col gap-2">
          <Button
            render={<a href={`tel:${RESTAURANT.phoneRaw}`} />}
            nativeButton={false}
            size="lg"
            className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Phone size={16} aria-hidden="true" />
            {t(locale, "chat_call_us")} · {RESTAURANT.phone}
          </Button>
          <Button variant="outline" size="sm" className="w-fit self-start" onClick={chat.back}>
            {t(locale, "chat_back")}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {flow.steps.slice(0, state.stepIndex).map((step) => (
        <Exchange key={step.id} step={step} answer={state.displayAnswers[step.id]} />
      ))}

      {isSummary ? (
        <SummaryCard flowId={state.screen as FlowId} chat={chat} />
      ) : (
        currentStep && (
          <div className="space-y-2.5">
            <BotBubble>{currentStep.question[locale]}</BotBubble>
            <StepInput step={currentStep} chat={chat} />
            {state.stepIndex > 0 && (
              <button
                type="button"
                onClick={chat.back}
                className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground underline-offset-2 hover:underline"
              >
                <ArrowLeft size={12} aria-hidden="true" />
                {t(locale, "chat_back")}
              </button>
            )}
          </div>
        )
      )}
    </div>
  )
}

function Exchange({ step, answer }: { step: FlowStep; answer?: string }) {
  const { locale } = useLocale()
  if (answer === undefined) return null
  return (
    <div className="space-y-2">
      <BotBubble>{step.question[locale]}</BotBubble>
      <UserBubble>{answer}</UserBubble>
    </div>
  )
}

function BotBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-muted px-3.5 py-2.5 text-sm text-foreground leading-relaxed">
      {children}
    </div>
  )
}

function UserBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-primary px-3.5 py-2.5 text-sm text-primary-foreground leading-relaxed">
      {children}
    </div>
  )
}

function StepInput({ step, chat }: { step: FlowStep; chat: ReturnType<typeof useChatFlow> }) {
  if (step.kind === "chips") return <ChipsStepInput step={step} chat={chat} />
  if (step.kind === "date") return <DateStepInput step={step} chat={chat} />
  return <TextStepInput step={step} chat={chat} />
}

function ChipsStepInput({ step, chat }: { step: FlowStep; chat: ReturnType<typeof useChatFlow> }) {
  const { locale } = useLocale()
  return (
    <div className="flex flex-wrap gap-1.5">
      {step.options?.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => chat.answer(step.id, option.value, option.label[locale])}
          className="rounded-full border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-accent"
        >
          {option.label[locale]}
        </button>
      ))}
      {step.optional && (
        <button
          type="button"
          onClick={() => chat.skip(step.id)}
          className="rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground underline-offset-2 hover:underline"
        >
          {t(locale, "chat_skip")}
        </button>
      )}
    </div>
  )
}

function DateStepInput({ step, chat }: { step: FlowStep; chat: ReturnType<typeof useChatFlow> }) {
  const { locale } = useLocale()
  const [open, setOpen] = useState(false)
  const dayPickerLocale = locale === "fr" ? fr : enUS

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        className={cn(
          "flex h-9 w-full max-w-[220px] items-center justify-between gap-1.5 rounded-lg border border-input bg-background px-3 text-sm transition-colors outline-none select-none hover:border-primary/40 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
        )}
      >
        <span>{t(locale, "chat_choose_date")}</span>
        <CalendarDays size={15} className="text-muted-foreground" aria-hidden="true" />
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-0" positionerClassName="z-70">
        <Calendar
          mode="single"
          locale={dayPickerLocale}
          onSelect={(value) => {
            if (!value) return
            const iso = format(value, "yyyy-MM-dd")
            const display = format(value, locale === "fr" ? "d MMMM yyyy" : "MMM d, yyyy", {
              locale: dayPickerLocale,
            })
            chat.answer(step.id, iso, display)
            setOpen(false)
          }}
          disabled={(day) => isPastDay(day) || isClosedDay(day)}
        />
      </PopoverContent>
    </Popover>
  )
}

function TextStepInput({ step, chat }: { step: FlowStep; chat: ReturnType<typeof useChatFlow> }) {
  const { locale } = useLocale()
  const [value, setValue] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = value.trim()
    if (!trimmed) return
    chat.answer(step.id, trimmed, trimmed)
    setValue("")
  }

  return (
    <div className="space-y-2">
      {step.suggestions && step.suggestions.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {step.suggestions.map((suggestion) => (
            <button
              key={suggestion.value}
              type="button"
              onClick={() =>
                setValue((prev) =>
                  prev ? `${prev}, ${suggestion.label[locale]}` : suggestion.label[locale],
                )
              }
              className="rounded-full border border-dashed border-border bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              + {suggestion.label[locale]}
            </button>
          ))}
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={step.placeholder?.[locale]}
          autoFocus
        />
        <Button type="submit" size="default" disabled={!value.trim()}>
          {t(locale, "chat_send")}
        </Button>
      </form>
      {step.optional && (
        <button
          type="button"
          onClick={() => chat.skip(step.id)}
          className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground underline-offset-2 hover:underline"
        >
          {t(locale, "chat_skip")}
          <ArrowRight size={12} aria-hidden="true" />
        </button>
      )}
    </div>
  )
}

function SummaryCard({ flowId, chat }: { flowId: FlowId; chat: ReturnType<typeof useChatFlow> }) {
  const { locale } = useLocale()
  const { state, flow } = chat
  if (!flow) return null
  const labelKeys = FIELD_LABEL_KEYS[flowId]

  return (
    <div className="space-y-3 rounded-xl border border-border bg-background p-3.5">
      <p className="text-sm font-semibold text-foreground">{t(locale, "chat_summary_title")}</p>
      <Separator />
      <dl className="space-y-2">
        {flow.steps.map((step) => {
          const value = state.displayAnswers[step.id]
          if (!value) return null
          const index = flow.steps.findIndex((s) => s.id === step.id)
          return (
            <div key={step.id} className="flex items-start justify-between gap-3 text-sm">
              <div>
                <dt className="text-xs text-muted-foreground">{t(locale, labelKeys[step.id])}</dt>
                <dd className="font-medium text-foreground">{value}</dd>
              </div>
              <button
                type="button"
                onClick={() => chat.editStep(index)}
                className="shrink-0 text-xs font-medium text-primary underline-offset-2 hover:underline"
              >
                {t(locale, "chat_edit")}
              </button>
            </div>
          )
        })}
      </dl>
      <Button
        size="lg"
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        onClick={() => {
          const url = buildChatWhatsAppUrl(locale, flowId, chat.state.displayAnswers)
          window.open(url, "_blank", "noopener,noreferrer")
          chat.submit()
        }}
      >
        {t(locale, "chat_confirm_send")}
      </Button>
    </div>
  )
}

function buildChatWhatsAppUrl(
  locale: Locale,
  flowId: FlowId,
  displayAnswers: Record<string, string>,
): string {
  const message =
    flowId === "reservation"
      ? buildReservationMessage(locale, {
          name: displayAnswers.name,
          phone: displayAnswers.phone,
          date: displayAnswers.date,
          time: displayAnswers.time,
          guests: displayAnswers.guests,
          notes: displayAnswers.notes,
        })
      : buildOrderMessage(locale, {
          name: displayAnswers.name,
          phone: displayAnswers.phone,
          pickup: displayAnswers.pickup,
          notes: displayAnswers.dishes,
          payment: displayAnswers.payment,
        })
  return buildWhatsAppUrl(message)
}

function buildPrefillParams(flowId: FlowId, answers: Record<string, string>): URLSearchParams {
  const params = new URLSearchParams()
  if (flowId === "reservation") {
    if (answers.name) params.set("name", answers.name)
    if (answers.phone) params.set("phone", answers.phone)
    if (answers.date) params.set("date", answers.date)
    if (answers.time) params.set("time", answers.time)
    if (answers.guests) params.set("guests", answers.guests)
    if (answers.notes) params.set("notes", answers.notes)
  } else {
    if (answers.name) params.set("name", answers.name)
    if (answers.phone) params.set("phone", answers.phone)
    if (answers.pickup) params.set("pickup", answers.pickup)
    if (answers.dishes) params.set("notes", answers.dishes)
    if (answers.payment) params.set("payment", answers.payment)
  }
  return params
}
