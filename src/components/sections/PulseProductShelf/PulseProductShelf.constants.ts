import type { PulseProduct } from "./PulseProductShelf.types"

export const DEFAULT_PRODUCTS: PulseProduct[] = [
  {
    name: "Camiseta Aero Run",
    category: "Running",
    price: "39,90 €",
    badge: "Nuevo",
    badgeBg: "#15131B",
    badgeColor: "#ffffff",
    gradientStart: "#ECE8F2",
    gradientEnd: "#F6F4FA",
    url: "/camiseta-aero-run/p",
  },
  {
    name: "Mallas Pulse 7/8",
    category: "Gym & Yoga",
    price: "47,90 €",
    oldPrice: "59,90 €",
    badge: "-20%",
    badgeBg: "#6D28F5",
    badgeColor: "#ffffff",
    gradientStart: "#E7E3EF",
    gradientEnd: "#F2F0F7",
    url: "/mallas-pulse-78/p",
  },
  {
    name: "Sudadera Cloud Crew",
    category: "Athleisure",
    price: "64,90 €",
    gradientStart: "#EAE6F1",
    gradientEnd: "#F4F2F9",
    url: "/sudadera-cloud-crew/p",
  },
  {
    name: "Top Flow Yoga",
    category: "Yoga",
    price: "32,90 €",
    badge: "Top ventas",
    badgeBg: "#D6FF3F",
    badgeColor: "#15131B",
    gradientStart: "#E5E1ED",
    gradientEnd: "#F1EFF6",
    url: "/top-flow-yoga/p",
  },
]

export const DEFAULTS = {
  eyebrow: "FAVORITOS",
  title: "Lo más vendido",
  viewAllText: "Ver todo →",

  columns: 4,
  gap: 22,
  imageRadius: 16,
  maxWidth: 1280,
  paddingY: 0,

  eyebrowColor: "#6D28F5",
  titleColor: "#15131B",
  accentColor: "#6D28F5",
  nameColor: "#15131B",
  categoryColor: "#8A8595",
  priceColor: "#15131B",
  oldPriceColor: "#B5B0BF",
  sectionBackground: "#FFFFFF",
  titleFontFamily: "'Schibsted Grotesk', sans-serif",
  bodyFontFamily: "'Hanken Grotesk', sans-serif",
} as const
