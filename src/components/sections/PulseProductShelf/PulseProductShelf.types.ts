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

export type PulseShelfSort =
  | "orders_desc"
  | "release_desc"
  | "discount_desc"
  | "price_asc"
  | "price_desc"
  | "score_desc"

export interface PulseProductShelfProps {
  showComponent?: boolean

  // Header
  eyebrow?: string
  title?: string
  viewAllText?: string
  viewAllUrl?: string

  // Content — dynamic (VTEX collection) takes precedence over the manual list
  collection?: string // VTEX collection / cluster id (productClusterIds facet)
  sort?: PulseShelfSort
  numberOfItems?: number
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
