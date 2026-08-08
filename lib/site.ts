// Falls back to a placeholder domain until the real one is set in production.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://lebellagio-ales.fr").replace(
  /\/$/,
  "",
)
