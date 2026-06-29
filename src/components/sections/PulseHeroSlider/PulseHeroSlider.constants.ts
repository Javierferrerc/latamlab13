import type { PulseHeroSlide } from "./PulseHeroSlider.types"

export const DEFAULT_SLIDES: PulseHeroSlide[] = [
  {
    eyebrow: "NUEVA COLECCIÓN · SS26",
    title: "Muévete sin límites",
    subtitle:
      "Tejidos técnicos que respiran contigo. Diseñados para running, gym y yoga.",
    primaryCta: { text: "Comprar mujer", url: "/mujer" },
    secondaryCta: { text: "Comprar hombre", url: "/hombre" },
    backgroundType: "gradient",
    gradientStart: "#1c1430",
    gradientMid: "#3a2870",
    gradientEnd: "#6D28F5",
    gradientAngle: 120,
    showGlow: true,
  },
]

export const DEFAULTS = {
  autoplayDelay: 5000,
  heightDesktop: 580,
  heightMobile: 520,

  eyebrowColor: "#D6FF3F",
  titleColor: "#ffffff",
  subtitleColor: "#d8d2e8",
  primaryCtaBg: "#ffffff",
  primaryCtaText: "#15131B",
  secondaryCtaBorder: "rgba(255, 255, 255, 0.5)",
  secondaryCtaText: "#ffffff",
  ctaRadius: 30,
  titleFontFamily: "'Schibsted Grotesk', sans-serif",
  bodyFontFamily: "'Hanken Grotesk', sans-serif",
  gradientAngle: 120,
} as const
