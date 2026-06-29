export interface PulseAnnouncement {
  text?: string
  url?: string
}

export interface PulseAnnouncementBarProps {
  showComponent?: boolean

  // Content
  messages?: PulseAnnouncement[]
  separator?: string

  // Behavior
  rotate?: boolean
  rotateInterval?: number
  sticky?: boolean

  // Style
  background?: string
  textColor?: string
  fontFamily?: string
  fontSize?: string
  fontSizeMobile?: string
  fontWeight?: string
  letterSpacing?: string
  paddingY?: number
}
