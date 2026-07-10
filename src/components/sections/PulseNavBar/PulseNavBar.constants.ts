import type { PulseNavLink } from "./PulseNavBar.types"

const promo = (
  eyebrow: string,
  title: string,
  url: string,
  gradientStart: string,
  gradientEnd: string,
  accentColor = "#D6FF3F",
  inkColor = "#ffffff"
) => ({ eyebrow, title, url, gradientStart, gradientEnd, accentColor, inkColor })

const verTodo = (url: string) => ({ label: "Ver todo", url, bold: true })

export const DEFAULT_NAV_LINKS: PulseNavLink[] = [
  {
    label: "Hombre",
    url: "/hombre",
    subcategories: [
      { label: "Camisetas", url: "/hombre/camisetas" },
      { label: "Camisetas técnicas", url: "/hombre/camisetas-tecnicas" },
      { label: "Shorts", url: "/hombre/shorts" },
      { label: "Pantalones", url: "/hombre/pantalones" },
      { label: "Sudaderas", url: "/hombre/sudaderas" },
      verTodo("/hombre"),
    ],
    promos: [
      promo("NUEVO", "Colección técnica", "/hombre/nuevo", "#1c1430", "#6D28F5"),
      promo("BEST SELLER", "Shorts de entreno", "/hombre/shorts", "#15131B", "#3a2870"),
    ],
  },
  {
    label: "Running",
    url: "/running",
    subcategories: [
      { label: "Camisetas", url: "/running/camisetas" },
      { label: "Mallas", url: "/running/mallas" },
      { label: "Shorts", url: "/running/shorts" },
      { label: "Chaquetas", url: "/running/chaquetas" },
      { label: "Accesorios", url: "/running/accesorios" },
      verTodo("/running"),
    ],
    promos: [
      promo("CORRE MÁS LEJOS", "Equípate para el asfalto", "/running", "#0f2a3f", "#1c8b73"),
      promo("LIGERO", "Chaquetas rompevientos", "/running/chaquetas", "#15131B", "#3a2870"),
    ],
  },
  {
    label: "Gym & Training",
    url: "/gym",
    subcategories: [
      { label: "Camisetas", url: "/gym/camisetas" },
      { label: "Tops", url: "/gym/tops" },
      { label: "Mallas", url: "/gym/mallas" },
      { label: "Shorts", url: "/gym/shorts" },
      { label: "Sudaderas", url: "/gym/sudaderas" },
      verTodo("/gym"),
    ],
    promos: [
      promo("ENTRENA DURO", "Ropa de fuerza", "/gym", "#1c1430", "#6D28F5"),
      promo("COMODIDAD", "Sudaderas premium", "/gym/sudaderas", "#15131B", "#3a2870"),
    ],
  },
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
