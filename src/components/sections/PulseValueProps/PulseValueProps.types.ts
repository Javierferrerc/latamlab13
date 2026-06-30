export type PulseValueIcon =
  | "shipping"
  | "returns"
  | "secure"
  | "support"
  | "quality"
  | "payment"

export interface PulseValueItem {
  icon?: PulseValueIcon
  title?: string
  subtitle?: string
  url?: string
}

export interface PulseValuePropsProps {
  showComponent?: boolean
  items?: PulseValueItem[]

  // Layout
  columns?: number
  gap?: number
  paddingY?: number
  maxWidth?: number
  showBorder?: boolean

  // Style
  iconColor?: string
  titleColor?: string
  subtitleColor?: string
  borderColor?: string
  sectionBackground?: string
  titleFontFamily?: string
  bodyFontFamily?: string
}
