export interface PulseImage {
  src?: string
  alt?: string
}

export interface PulseCommunityTile {
  image?: PulseImage
  url?: string
  gradientStart?: string
  gradientEnd?: string
}

export interface PulseCommunityGridProps {
  showComponent?: boolean

  // Header
  eyebrow?: string
  title?: string
  description?: string

  // Content
  tiles?: PulseCommunityTile[]

  // Layout
  columns?: number
  columnsTablet?: number
  columnsMobile?: number
  gap?: number
  tileRadius?: number
  maxWidth?: number
  paddingY?: number

  // Style
  sectionBackground?: string
  eyebrowColor?: string
  titleColor?: string
  descriptionColor?: string
  overlayColor?: string
  titleFontFamily?: string
  bodyFontFamily?: string
}
