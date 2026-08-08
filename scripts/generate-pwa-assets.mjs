// One-off / re-runnable generator for PWA icons and iOS splash screens.
// Run with: node scripts/generate-pwa-assets.mjs
//
// - App icons (home screen icon, favicon, apple-touch-icon) are derived from
//   public/favicon-96x96.png, composited onto an opaque white background and
//   upscaled with Lanczos3 so home-screen icons and taskbar tiles are crisp.
// - iOS splash screens (public/splash/*.png) are rendered from the
//   public/logo.svg wordmark, centered on the manifest background_color, for
//   the most common iPhone/iPad viewport + DPR combinations.
import sharp from "sharp"
import { mkdir } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = path.dirname(fileURLToPath(import.meta.url)) + "/.."
const PUBLIC = path.join(ROOT, "public")
const BACKGROUND = "#FBF6EE"

const ICON_SOURCE = path.join(PUBLIC, "favicon-96x96.png")
const LOGO_SOURCE = path.join(PUBLIC, "logo.svg")

const ICON_TARGETS = [
  { file: "web-app-manifest-192x192.png", size: 192 },
  { file: "web-app-manifest-512x512.png", size: 512 },
  { file: "apple-touch-icon.png", size: 180 },
]

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

async function generateIcons() {
  const source = await sharp(ICON_SOURCE).ensureAlpha().toBuffer()

  for (const { file, size } of ICON_TARGETS) {
    const resized = await sharp(source)
      .resize(size, size, { kernel: "lanczos3", fit: "contain", background: "#FFFFFF" })
      .flatten({ background: "#FFFFFF" })
      .png()
      .toBuffer()
    await sharp(resized).toFile(path.join(PUBLIC, file))
    console.log(`icon  ${file} (${size}x${size})`)
  }
}

async function generateSplashScreens() {
  const splashDir = path.join(PUBLIC, "splash")
  await mkdir(splashDir, { recursive: true })

  for (const { file, width, height, dpr } of SPLASH_TARGETS) {
    const pxWidth = width * dpr
    const pxHeight = height * dpr
    const logoWidth = Math.round(Math.min(pxWidth, pxHeight) * 0.42)

    const logo = await sharp(LOGO_SOURCE, { density: 300 })
      .resize({ width: logoWidth })
      .png()
      .toBuffer()
    const logoMeta = await sharp(logo).metadata()

    await sharp({
      create: {
        width: pxWidth,
        height: pxHeight,
        channels: 4,
        background: BACKGROUND,
      },
    })
      .composite([
        {
          input: logo,
          left: Math.round((pxWidth - (logoMeta.width ?? logoWidth)) / 2),
          top: Math.round((pxHeight - (logoMeta.height ?? logoWidth)) / 2),
        },
      ])
      .png()
      .toFile(path.join(splashDir, file))
    console.log(`splash ${file} (${pxWidth}x${pxHeight}, viewport ${width}x${height} @${dpr}x)`)
  }
}

await generateIcons()
await generateSplashScreens()
console.log("Done.")
