import type { PulsePromoBanner } from "./PulsePromoBanners.types"

export const DEFAULT_BANNERS: PulsePromoBanner[] = [
  {
    eyebrow: "REBAJAS",
    title: "Hasta -40%\nen selección",
    ctaText: "Ver rebajas",
    ctaUrl: "/rebajas",
    gradientStart: "#15131B",
    gradientEnd: "#3a2870",
    gradientAngle: 120,
    eyebrowColor: "#D6FF3F",
    titleColor: "#ffffff",
    ctaBg: "#ffffff",
    ctaColor: "#15131B",
  },
  {
    eyebrow: "CLUB PULSO",
    title: "Únete y gana\nun 10% extra",
    ctaText: "Crear cuenta",
    ctaUrl: "/login",
    gradientStart: "#EFE9FF",
    gradientEnd: "#E0F5EF",
    gradientAngle: 120,
    eyebrowColor: "#6D28F5",
    titleColor: "#15131B",
    ctaBg: "#15131B",
    ctaColor: "#ffffff",
  },
]

export const DEFAULTS = {
  columns: 2,
  gap: 20,
  minHeight: 260,
  radius: 22,
  ctaRadius: 26,
  maxWidth: 1280,
  paddingY: 0,
  titleFontFamily: "'Schibsted Grotesk', sans-serif",
  bodyFontFamily: "'Hanken Grotesk', sans-serif",
} as const
