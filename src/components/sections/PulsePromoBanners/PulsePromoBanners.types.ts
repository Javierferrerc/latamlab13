export interface PulseImage {
  src?: string
  alt?: string
}

export interface PulsePromoBanner {
  eyebrow?: string
  title?: string
  ctaText?: string
  ctaUrl?: string

  // Background
  gradientStart?: string
  gradientEnd?: string
  gradientAngle?: number
  backgroundImage?: PulseImage

  // Colors
  eyebrowColor?: string
  titleColor?: string
  ctaBg?: string
  ctaColor?: string
}

export interface PulsePromoBannersProps {
  showComponent?: boolean
  banners?: PulsePromoBanner[]

  // Layout
  columns?: number
  gap?: number
  minHeight?: number
  radius?: number
  ctaRadius?: number
  maxWidth?: number
  paddingY?: number

  // Style
  titleFontFamily?: string
  bodyFontFamily?: string
}
