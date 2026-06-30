export interface PulseMarqueeProps {
  showComponent?: boolean
  items?: string[]

  // Behavior
  speed?: number // seconds for a full loop
  pauseOnHover?: boolean
  reverse?: boolean

  // Layout
  gap?: number
  paddingY?: number
  separator?: string
  uppercase?: boolean

  // Style
  fontSize?: number
  textColor?: string
  separatorColor?: string
  background?: string
  borderColor?: string
  titleFontFamily?: string
}
