"use client"

import { createContext, useContext, useState, ReactNode } from "react"
import type { Locale } from "./i18n"

interface LocaleContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: "fr",
  setLocale: () => {},
})

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("fr")
  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  return useContext(LocaleContext)
}
