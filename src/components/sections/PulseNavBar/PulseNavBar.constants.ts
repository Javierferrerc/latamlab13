import type { PulseNavLink } from "./PulseNavBar.types"

export const DEFAULT_NAV_LINKS: PulseNavLink[] = [
  { label: "Mujer", url: "/mujer" },
  { label: "Hombre", url: "/hombre" },
  { label: "Running", url: "/running" },
  { label: "Gym", url: "/gym" },
  { label: "Yoga", url: "/yoga" },
  { label: "Rebajas", url: "/rebajas" },
]

export const DEFAULTS = {
  logoText: "PULSO",
  logoUrl: "/",
  searchUrl: "/s",
  accountUrl: "/login",

  background: "rgba(255, 255, 255, 0.92)",
  blurAmount: 10,
  linkColor: "#3a3645",
  brandColor: "#6D28F5",
  logoColor: "#15131B",
  iconColor: "#15131B",
  borderColor: "#ECEAF1",
  badgeTextColor: "#ffffff",

  logoFontFamily: "'Schibsted Grotesk', sans-serif",
  linkFontFamily: "'Hanken Grotesk', sans-serif",
  logoFontSize: "23px",
  logoLetterSpacing: "0.14em",
  linkFontSize: "14.5px",
} as const
