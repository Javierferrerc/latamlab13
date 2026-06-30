import type { PulseValueItem } from "./PulseValueProps.types"

export const DEFAULT_ITEMS: PulseValueItem[] = [
  { icon: "shipping", title: "Envío gratis +50€", subtitle: "Entrega en 24-48h" },
  { icon: "returns", title: "30 días de devolución", subtitle: "Sin preguntas" },
  { icon: "secure", title: "Pago 100% seguro", subtitle: "Cifrado SSL" },
]

export const DEFAULTS = {
  columns: 3,
  gap: 30,
  paddingY: 44,
  maxWidth: 1280,

  iconColor: "#6D28F5",
  titleColor: "#15131B",
  subtitleColor: "#8A8595",
  borderColor: "#ECEAF1",
  sectionBackground: "#FFFFFF",
  titleFontFamily: "'Schibsted Grotesk', sans-serif",
  bodyFontFamily: "'Hanken Grotesk', sans-serif",
} as const
