// One-off / re-runnable generator for PWA icons and splash screens.
// Run with: node scripts/generate-pwa-assets.mjs
//
// - The home-screen/launcher icon (192x192, apple-touch-icon) is derived from
//   public/favicon-96x96.png, composited onto an opaque white background and
//   upscaled with Lanczos3 so it stays crisp.
// - The 512x512 manifest icon is instead rendered from the public/logo.svg
//   wordmark on the manifest background_color. Chrome/Android's automatic
//   splash screen picks whichever manifest icon best matches its "large icon"
//   layout (roughly 128dp, closer to 512 than 192 — see
//   https://web.dev/articles/add-manifest#splash-screen), so this is what
//   actually shows up as the Android install splash. Without this split, the
//   splash would just be a larger copy of the small "B" launcher icon.
// - iOS ignores the manifest for its launch screen entirely, so
//   public/splash/*.png (also rendered from logo.svg) are wired up as
//   `apple-touch-startup-image` links in app/layout.tsx for the most common
//   iPhone/iPad viewport + DPR combinations.
import sharp from "sharp"
import { mkdir } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = path.dirname(fileURLToPath(import.meta.url)) + "/.."
const PUBLIC = path.join(ROOT, "public")
const BACKGROUND = "#FBF6EE"

const ICON_SOURCE = path.join(PUBLIC, "favicon-96x96.png")
const LOGO_SOURCE = path.join(PUBLIC, "logo.svg")

// Favicon-derived: the actual home-screen/launcher icon.
const ICON_TARGETS = [
  { file: "web-app-manifest-192x192.png", size: 192 },
  { file: "apple-touch-icon.png", size: 180 },
]

// Logo-derived: used for Chrome/Android's auto-generated splash screen (see
// note above) and as the large fallback icon everywhere else a 512px icon is
// requested (share sheets, app switchers, desktop install prompts, etc.)
const LOGO_ICON_TARGETS = [{ file: "web-app-manifest-512x512.png", size: 512 }]

// Common iPhone/iPad portrait viewport (CSS px) x DPR combinations, used to
// build the `apple-touch-startup-image` <link> media queries in app/layout.tsx.
const SPLASH_TARGETS = [
  { file: "splash-750x1334.png", width: 375, height: 667, dpr: 2 },
  { file: "splash-1242x2208.png", width: 414, height: 736, dpr: 3 },
  { file: "splash-1125x2436.png", width: 375, height: 812, dpr: 3 },
  { file: "splash-828x1792.png", width: 414, height: 896, dpr: 2 },
  { file: "splash-1242x2688.png", width: 414, height: 896, dpr: 3 },
  { file: "splash-1170x2532.png", width: 390, height: 844, dpr: 3 },
  { file: "splash-1284x2778.png", width: 428, height: 926, dpr: 3 },
  { file: "splash-1179x2556.png", width: 393, height: 852, dpr: 3 },
  { file: "splash-1290x2796.png", width: 430, height: 932, dpr: 3 },
  { file: "splash-1536x2048.png", width: 768, height: 1024, dpr: 2 },
  { file: "splash-1668x2388.png", width: 834, height: 1194, dpr: 2 },
  { file: "splash-2048x2732.png", width: 1024, height: 1366, dpr: 2 },
]

async function generateFaviconIcons() {
  const source = await sharp(ICON_SOURCE).ensureAlpha().toBuffer()

  for (const { file, size } of ICON_TARGETS) {
    const resized = await sharp(source)
      .resize(size, size, { kernel: "lanczos3", fit: "contain", background: "#FFFFFF" })
      .flatten({ background: "#FFFFFF" })
      .png()
      .toBuffer()
    await sharp(resized).toFile(path.join(PUBLIC, file))
    console.log(`icon   ${file} (${size}x${size})`)
  }
}

// Renders public/logo.svg centered on a `background` canvas of the given
// pixel dimensions, with the logo scaled to `coverage` * the shorter side.
async function renderLogoOnBackground({ width, height, background, coverage }) {
  const logoWidth = Math.round(Math.min(width, height) * coverage)
  const logo = await sharp(LOGO_SOURCE, { density: 300 }).resize({ width: logoWidth }).png().toBuffer()
  const logoMeta = await sharp(logo).metadata()

  return sharp({
    create: { width, height, channels: 4, background },
  })
    .composite([
      {
        input: logo,
        left: Math.round((width - (logoMeta.width ?? logoWidth)) / 2),
        top: Math.round((height - (logoMeta.height ?? logoWidth)) / 2),
      },
    ])
    .png()
    .toBuffer()
}

async function generateLogoIcons() {
  for (const { file, size } of LOGO_ICON_TARGETS) {
    const png = await renderLogoOnBackground({ width: size, height: size, background: BACKGROUND, coverage: 0.62 })
    await sharp(png).toFile(path.join(PUBLIC, file))
    console.log(`icon   ${file} (${size}x${size}, from logo.svg)`)
  }
}

async function generateSplashScreens() {
  const splashDir = path.join(PUBLIC, "splash")
  await mkdir(splashDir, { recursive: true })

  for (const { file, width, height, dpr } of SPLASH_TARGETS) {
    const pxWidth = width * dpr
    const pxHeight = height * dpr
    const png = await renderLogoOnBackground({
      width: pxWidth,
      height: pxHeight,
      background: BACKGROUND,
      coverage: 0.42,
    })
    await sharp(png).toFile(path.join(splashDir, file))
    console.log(`splash ${file} (${pxWidth}x${pxHeight}, viewport ${width}x${height} @${dpr}x)`)
  }
}

await generateFaviconIcons()
await generateLogoIcons()
await generateSplashScreens()
console.log("Done.")
