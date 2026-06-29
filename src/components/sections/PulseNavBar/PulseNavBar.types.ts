export interface PulseImage {
  src?: string
  alt?: string
}

export interface PulseNavLink {
  label?: string
  url?: string
}

export interface PulseNavBarProps {
  showComponent?: boolean

  // Content
  logoText?: string
  logoImage?: PulseImage
  logoUrl?: string
  navLinks?: PulseNavLink[]
  showSearch?: boolean
  searchUrl?: string
  showAccount?: boolean
  accountUrl?: string
  showCart?: boolean
  /** Resaltar el link de la categoría actual según la ruta. Off por default. */
  highlightActiveLink?: boolean

  // Style
  background?: string
  enableBlur?: boolean
  blurAmount?: number
  linkColor?: string
  brandColor?: string
  logoColor?: string
  iconColor?: string
  borderColor?: string
  badgeTextColor?: string
  sticky?: boolean

  // Typography
  logoFontFamily?: string
  linkFontFamily?: string
  logoFontSize?: string
  logoLetterSpacing?: string
  linkFontSize?: string
}
