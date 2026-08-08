"use client"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { useLocale } from "@/lib/locale-context"
import { t } from "@/lib/i18n"
import { cn } from "@/lib/utils"

interface MenuItem {
  name: { fr: string; en: string }
  description: { fr: string; en: string }
  price: string
  image?: string
  featured?: boolean
}

interface MenuCardProps {
  item: MenuItem
  compact?: boolean
}

export function MenuCard({ item, compact = false }: MenuCardProps) {
  const { locale } = useLocale()

  if (compact) {
    return (
      <div className="flex items-start justify-between gap-3 py-3 border-b border-border last:border-0">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <p className="font-medium text-foreground text-sm">{item.name[locale]}</p>
            {item.featured && (
              <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-secondary/20 text-secondary-foreground shrink-0">
                {t(locale, "menu_featured_label")}
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">{item.description[locale]}</p>
        </div>
        <p className="font-semibold text-primary shrink-0 text-sm">{item.price}€</p>
      </div>
    )
  }

  return (
    <article className={cn(
      "bg-card rounded-xl overflow-hidden border border-border transition-all hover:shadow-md hover:-translate-y-0.5",
      item.featured && "ring-1 ring-secondary/40"
    )}>
      {item.image && (
        <div className="aspect-[4/3] relative overflow-hidden group">
          <Image
            src={item.image}
            alt={item.name[locale]}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {item.featured && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-primary text-primary-foreground text-xs">
                {t(locale, "menu_featured_label")}
              </Badge>
            </div>
          )}
        </div>
      )}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="font-serif font-semibold text-base text-foreground leading-tight">
            {item.name[locale]}
          </h3>
          <p className="font-bold text-primary shrink-0">{item.price}€</p>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{item.description[locale]}</p>
        {!item.image && item.featured && (
          <Badge variant="secondary" className="mt-2 text-xs bg-secondary/20 text-secondary-foreground">
            {t(locale, "menu_featured_label")}
          </Badge>
        )}
      </div>
    </article>
  )
}
