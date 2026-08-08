"use client"

import { useState } from "react"
import { MessageCircleMore, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLocale } from "@/lib/locale-context"
import { t } from "@/lib/i18n"
import { cn } from "@/lib/utils"
import { ChatPanel } from "./chat-panel"

export function ChatBubble() {
  const [open, setOpen] = useState(false)
  const { locale } = useLocale()

  return (
    <>
      {open && (
        <div className="fixed inset-x-4 bottom-36 z-60 sm:inset-x-auto sm:right-6 sm:bottom-24 sm:w-95 md:bottom-24 md:right-6">
          <ChatPanel onClose={() => setOpen(false)} />
        </div>
      )}
      <Button
        onClick={() => setOpen((v) => !v)}
        aria-label={t(locale, open ? "chat_close_assistant" : "chat_open_assistant")}
        aria-expanded={open}
        className="fixed bottom-20 right-4 z-50 size-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 md:bottom-6 md:right-6"
      >
        <span className="relative flex size-6 items-center justify-center">
          <MessageCircleMore
            className={cn(
              "absolute size-6 transition-all duration-300 ease-in-out",
              open ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100",
            )}
            aria-hidden="true"
          />
          <X
            className={cn(
              "absolute size-6 transition-all duration-300 ease-in-out",
              open ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0",
            )}
            aria-hidden="true"
          />
        </span>
      </Button>
    </>
  )
}
