export interface PulseFooterLink {
  label?: string
  url?: string
}

export interface PulseFooterColumn {
  title?: string
  links?: PulseFooterLink[]
}

export interface PulseFooterProps {
  showComponent?: boolean

  // Brand
  brandName?: string
  description?: string

  // Link columns
  columns?: PulseFooterColumn[]

  // Bottom row
  copyright?: string
  legalLinks?: PulseFooterLink[]
  paymentMethods?: string[]

  // Layout
  maxWidth?: number
  paddingTop?: number
  paddingBottom?: number

  // Style
  background?: string
  logoColor?: string
  descriptionColor?: string
  columnTitleColor?: string
  linkColor?: string
  linkHoverColor?: string
  legalColor?: string
  borderColor?: string
  titleFontFamily?: string
  bodyFontFamily?: string
}
