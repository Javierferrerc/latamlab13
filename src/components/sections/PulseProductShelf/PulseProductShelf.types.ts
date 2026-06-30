export interface PulseImage {
  src?: string
  alt?: string
}

export interface PulseProduct {
  name?: string
  category?: string
  price?: string
  oldPrice?: string
  url?: string

  badge?: string
  badgeBg?: string
  badgeColor?: string

  // Background of the image area (gradient by default, or an image)
  gradientStart?: string
  gradientEnd?: string
  image?: PulseImage
}

export interface PulseProductCardProps {
  product: PulseProduct
  showWishlist?: boolean
  imageRadius?: number
  accentColor?: string
}

export interface PulseProductShelfProps {
  showComponent?: boolean

  // Header
  eyebrow?: string
  title?: string
  viewAllText?: string
  viewAllUrl?: string

  // Content
  products?: PulseProduct[]

  // Behavior / layout
  showWishlist?: boolean
  columns?: number
  gap?: number
  imageRadius?: number
  maxWidth?: number
  paddingY?: number

  // Style
  eyebrowColor?: string
  titleColor?: string
  accentColor?: string
  nameColor?: string
  categoryColor?: string
  priceColor?: string
  oldPriceColor?: string
  sectionBackground?: string
  titleFontFamily?: string
  bodyFontFamily?: string
}
