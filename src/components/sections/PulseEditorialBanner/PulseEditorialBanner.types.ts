export interface PulseImage {
  src?: string
  alt?: string
}

export interface PulseEditorialBannerProps {
  showComponent?: boolean

  // Content
  eyebrow?: string
  title?: string
  paragraph?: string
  ctaText?: string
  ctaUrl?: string

  // Layout
  imagePosition?: "left" | "right"
  maxWidth?: number
  minHeight?: number
  cardRadius?: number

  // Image / media
  backgroundType?: "gradient" | "image"
  gradientStart?: string
  gradientEnd?: string
  gradientAngle?: number
  backgroundImage?: PulseImage
  showGlow?: boolean
  glowColor?: string

  // Style
  panelBackground?: string
  eyebrowColor?: string
  titleColor?: string
  paragraphColor?: string
  ctaBg?: string
  ctaColor?: string
  ctaRadius?: number
  titleFontFamily?: string
  bodyFontFamily?: string
}
