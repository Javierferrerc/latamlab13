import type { PulseCategoryTile } from "./PulseCategoryTiles.types"

export const DEFAULT_TILES: PulseCategoryTile[] = [
  {
    eyebrow: "CORRE MÁS LEJOS",
    name: "Running",
    url: "/running",
    accentColor: "#6D28F5",
    gradientStart: "#ECE7FA",
    gradientEnd: "#DCD3F6",
    showArrow: true,
  },
  {
    eyebrow: "ENTRENA DURO",
    name: "Gym & Training",
    url: "/gym",
    accentColor: "#1C8B73",
    gradientStart: "#E4F7F2",
    gradientEnd: "#CFEEE6",
    showArrow: true,
  },
  {
    eyebrow: "RESPIRA MEJOR",
    name: "Yoga",
    url: "/yoga",
    accentColor: "#C2622E",
    gradientStart: "#FBEEE6",
    gradientEnd: "#F6E0D2",
    showArrow: true,
  },
]

export const DEFAULTS = {
  columns: 3,
  columnsMobile: 1,
  gap: 16,
  tileHeight: 240,
  tileHeightMobile: 150,
  tileRadius: 18,
  maxWidth: 1280,
  gradientAngle: 150,

  nameColor: "#15131B",
  titleColor: "#15131B",
  sectionBackground: "#ffffff",
  titleFontFamily: "'Schibsted Grotesk', sans-serif",
  bodyFontFamily: "'Hanken Grotesk', sans-serif",
} as const
