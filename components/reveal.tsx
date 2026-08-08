"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

type RevealAnimation = "fade-up" | "fade" | "fade-left" | "fade-right" | "zoom"

const ANIMATION_CLASSES: Record<RevealAnimation, string> = {
  "fade-up": "fade-in slide-in-from-bottom-6",
  fade: "fade-in",
  "fade-left": "fade-in slide-in-from-right-8",
  "fade-right": "fade-in slide-in-from-left-8",
  zoom: "fade-in zoom-in-95",
}

interface RevealProps {
  children: React.ReactNode
  className?: string
  animation?: RevealAnimation
  delay?: number
  duration?: number
  as?: keyof React.JSX.IntrinsicElements
}

export function Reveal({
  children,
  className,
  animation = "fade-up",
  delay = 0,
  duration = 700,
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [skipAnimation, setSkipAnimation] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setSkipAnimation(true)
      setIsVisible(true)
      return
    }

    const node = ref.current
    if (!node || typeof IntersectionObserver === "undefined") {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const Comp = as as React.ElementType

  return (
    <Comp
      ref={ref}
      className={cn(
        !skipAnimation && !isVisible && "opacity-0",
        isVisible && !skipAnimation && `animate-in ${ANIMATION_CLASSES[animation]}`,
        className,
      )}
      style={
        !skipAnimation
          ? {
              animationDuration: `${duration}ms`,
              animationDelay: `${delay}ms`,
              animationFillMode: "both",
            }
          : undefined
      }
    >
      {children}
    </Comp>
  )
}
