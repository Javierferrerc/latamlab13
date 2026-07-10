export interface PulseImage {
  src?: string
  alt?: string
}

export interface PulseNavSubLink {
  label?: string
  url?: string
  /** Destaca el ítem (ej. "Ver todo") en negrita y color tinta. */
  bold?: boolean
}

export interface PulseNavPromo {
  eyebrow?: string
  title?: string
  url?: string
  /** Imagen de fondo (opcional, reemplaza el degradado). */
  image?: PulseImage
  gradientStart?: string
  gradientEnd?: string
  gradientAngle?: number
  /** Color del eyebrow. */
  accentColor?: string
  /** Color del título. */
  inkColor?: string
}

export interface PulseNavLink {
  label?: string
  url?: string
  /** Subcategorías del mega-menú (ej. Hombre → Camisetas, Shorts…). */
  subcategories?: PulseNavSubLink[]
  /** Hasta 2 banners promocionales en el panel del mega-menú. */
  promos?: PulseNavPromo[]
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
