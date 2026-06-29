import type { PulseAnnouncement } from "./PulseAnnouncementBar.types"

export const DEFAULT_MESSAGES: PulseAnnouncement[] = [
  { text: "Envío gratis a partir de 50€" },
  { text: "Devoluciones en 30 días" },
]

export const DEFAULTS = {
  separator: " · ",
  rotateInterval: 4000,

  background: "#6D28F5",
  textColor: "#ffffff",
  fontFamily: "'Hanken Grotesk', sans-serif",
  fontSize: "12.5px",
  fontSizeMobile: "11.5px",
  fontWeight: "500",
  letterSpacing: "0.03em",
  paddingY: 9,
} as const
