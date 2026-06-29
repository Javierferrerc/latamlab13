export interface PulseCta {
  text?: string
  url?: string
}

export interface PulseImage {
  src?: string
  alt?: string
}

export interface PulseHeroSlide {
  eyebrow?: string
  title?: string
  subtitle?: string
  primaryCta?: PulseCta
  secondaryCta?: PulseCta

  backgroundType?: "gradient" | "image" | "color"
  gradientStart?: string
  gradientMid?: string
  gradientEnd?: string
  gradientAngle?: number
  backgroundImage?: PulseImage
  backgroundColor?: string
  showGlow?: boolean
}

export interface PulseHeroSliderProps {
  showComponent?: boolean
  slides?: PulseHeroSlide[]

  // Behavior
  autoplay?: boolean
  autoplayDelay?: number
  pauseOnHover?: boolean
  showDots?: boolean

  // Layout
  heightDesktop?: number
  heightMobile?: number

  // Style
  eyebrowColor?: string
  titleColor?: string
  subtitleColor?: string
  primaryCtaBg?: string
  primaryCtaText?: string
  secondaryCtaBorder?: string
  secondaryCtaText?: string
  ctaRadius?: number
  titleFontFamily?: string
  bodyFontFamily?: string
}
