export interface PulseCategoryHeaderProps {
  showComponent?: boolean

  // Content
  breadcrumbHomeLabel?: string
  breadcrumbHomeUrl?: string
  category?: string
  title?: string
  description?: string

  // Layout
  height?: number
  heightMobile?: number

  // Background
  gradientStart?: string
  gradientMid?: string
  gradientEnd?: string
  gradientAngle?: number
  showGlow?: boolean
  glowColor?: string

  // Style
  titleColor?: string
  breadcrumbColor?: string
  descriptionColor?: string
  titleFontFamily?: string
  bodyFontFamily?: string
}
