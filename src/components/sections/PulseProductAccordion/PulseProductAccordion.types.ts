export interface PulseAccordionItem {
  title?: string
  content?: string
  // When true, the body uses the product's own description (PDP context).
  useProductDescription?: boolean
}

export interface PulseProductAccordionProps {
  showComponent?: boolean
  items?: PulseAccordionItem[]

  // Layout
  maxWidth?: number

  // Style
  titleColor?: string
  signColor?: string
  bodyColor?: string
  borderColor?: string
  titleFontFamily?: string
  bodyFontFamily?: string
}
