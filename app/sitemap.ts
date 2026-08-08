import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/site"

const ROUTES: Array<{ path: string; priority: number; changeFrequency: "weekly" | "monthly" }> = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/menu", priority: 0.9, changeFrequency: "monthly" },
  { path: "/reservation", priority: 0.9, changeFrequency: "monthly" },
  { path: "/order", priority: 0.8, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.6, changeFrequency: "monthly" },
  { path: "/legal", priority: 0.2, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "monthly" },
  { path: "/cookies", priority: 0.2, changeFrequency: "monthly" },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }))
}
