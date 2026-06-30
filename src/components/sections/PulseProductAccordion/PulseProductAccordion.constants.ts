import type { PulseAccordionItem } from "./PulseProductAccordion.types"

export const DEFAULT_ITEMS: PulseAccordionItem[] = [
  { title: "Descripción", useProductDescription: true },
  {
    title: "Composición y cuidado",
    content:
      "85% poliéster reciclado, 15% elastano. Lavar a máquina en frío. No usar secadora ni lejía.",
  },
  {
    title: "Envíos y devoluciones",
    content:
      "Envío gratis en 24-48h por compras superiores a 50€. Devoluciones gratuitas en 30 días.",
  },
]

export const DEFAULTS = {
  maxWidth: 480,

  titleColor: "#15131B",
  signColor: "#6D28F5",
  bodyColor: "#5b5667",
  borderColor: "#ECEAF1",
  titleFontFamily: "'Schibsted Grotesk', sans-serif",
  bodyFontFamily: "'Hanken Grotesk', sans-serif",
} as const
