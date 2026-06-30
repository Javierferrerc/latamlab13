export interface PulseImage {
  src?: string
  alt?: string
}

export interface PulseCategoryTile {
  eyebrow?: string
  name?: string
  url?: string
  accentColor?: string
  gradientStart?: string
  gradientEnd?: string
  gradientAngle?: number
  backgroundImage?: PulseImage
  showArrow?: boolean
}

export interface PulseCategoryTilesProps {
  showComponent?: boolean
  title?: string
  subtitle?: string
  tiles?: PulseCategoryTile[]

  // Layout
  columns?: number
  columnsMobile?: number
  gap?: number
  tileHeight?: number
  tileHeightMobile?: number
  tileRadius?: number
  maxWidth?: number

  // Style
  nameColor?: string
  titleColor?: string
  sectionBackground?: string
  titleFontFamily?: string
  bodyFontFamily?: string
}
