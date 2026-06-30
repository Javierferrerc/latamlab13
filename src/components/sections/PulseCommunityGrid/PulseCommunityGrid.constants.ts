import type { PulseCommunityTile } from "./PulseCommunityGrid.types"

export const DEFAULT_TILES: PulseCommunityTile[] = [
  { gradientStart: "#dcd3f6", gradientEnd: "#ece7fa" },
  { gradientStart: "#cfeee6", gradientEnd: "#e4f7f2" },
  { gradientStart: "#f6e0d2", gradientEnd: "#fbeee6" },
  { gradientStart: "#e7e3ef", gradientEnd: "#f2f0f7" },
  { gradientStart: "#d6cef0", gradientEnd: "#e9e3fb" },
  { gradientStart: "#e0f0ea", gradientEnd: "#eef7f3" },
]

export const DEFAULTS = {
  eyebrow: "COMUNIDAD",
  title: "#MueveteConPulso",
  description:
    "Etiquétanos y aparece aquí. Más de 24.000 personas ya se mueven con PULSO.",

  columns: 6,
  columnsTablet: 4,
  columnsMobile: 3,
  gap: 12,
  tileRadius: 14,
  maxWidth: 1280,
  paddingY: 56,

  sectionBackground: "#F4F3F6",
  eyebrowColor: "#6D28F5",
  titleColor: "#15131B",
  descriptionColor: "#6e6a78",
  overlayColor: "rgba(20, 15, 30, 0.32)",
  titleFontFamily: "'Schibsted Grotesk', sans-serif",
  bodyFontFamily: "'Hanken Grotesk', sans-serif",
} as const
