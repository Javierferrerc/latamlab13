import type {
  PulseFooterColumn,
  PulseFooterLink,
} from "./PulseFooter.types"

export const DEFAULT_COLUMNS: PulseFooterColumn[] = [
  {
    title: "TIENDA",
    links: [
      { label: "Mujer", url: "/mujer" },
      { label: "Hombre", url: "/hombre" },
      { label: "Novedades", url: "/novedades" },
      { label: "Rebajas", url: "/rebajas" },
    ],
  },
  {
    title: "AYUDA",
    links: [
      { label: "Envíos", url: "/envios" },
      { label: "Devoluciones", url: "/devoluciones" },
      { label: "Guía de tallas", url: "/guia-de-tallas" },
      { label: "Contacto", url: "/contacto" },
    ],
  },
  {
    title: "SÍGUENOS",
    links: [
      { label: "Instagram", url: "https://instagram.com" },
      { label: "TikTok", url: "https://tiktok.com" },
      { label: "Strava", url: "https://strava.com" },
    ],
  },
]

export const DEFAULT_LEGAL_LINKS: PulseFooterLink[] = [
  { label: "Términos", url: "/terminos" },
  { label: "Privacidad", url: "/privacidad" },
]

export const DEFAULT_PAYMENT_METHODS: string[] = [
  "Visa",
  "Mastercard",
  "PayPal",
  "Apple Pay",
]

export const DEFAULTS = {
  brandName: "PULSO",
  description: "Ropa deportiva técnica diseñada para moverse mejor.",
  copyright: "© 2026 PULSO",

  maxWidth: 1280,
  paddingTop: 56,
  paddingBottom: 30,

  background: "#15131B",
  logoColor: "#ffffff",
  descriptionColor: "#a8a3b3",
  columnTitleColor: "#cfc9da",
  linkColor: "#a8a3b3",
  linkHoverColor: "#ffffff",
  legalColor: "#8a8595",
  borderColor: "rgba(255, 255, 255, 0.12)",
  titleFontFamily: "'Schibsted Grotesk', sans-serif",
  bodyFontFamily: "'Hanken Grotesk', sans-serif",
} as const
