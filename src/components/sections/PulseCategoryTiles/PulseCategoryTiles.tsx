import Head from "next/head"

import type {
  PulseCategoryTile,
  PulseCategoryTilesProps,
} from "./PulseCategoryTiles.types"
import { DEFAULTS, DEFAULT_TILES } from "./PulseCategoryTiles.constants"
import styles from "./pulse-category-tiles.module.scss"

const ArrowIcon = () => (
  <svg
    className={styles.arrow}
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

const tileBackground = (tile: PulseCategoryTile): React.CSSProperties => {
  if (tile.backgroundImage?.src) {
    return {
      backgroundImage: `url(${tile.backgroundImage.src})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }
  }
  const angle = tile.gradientAngle ?? DEFAULTS.gradientAngle
  return {
    background: `linear-gradient(${angle}deg, ${tile.gradientStart ?? "#ECE7FA"}, ${tile.gradientEnd ?? "#DCD3F6"})`,
  }
}

const PulseCategoryTiles = ({
  showComponent = true,
  title,
  subtitle,
  tiles,
  columns = DEFAULTS.columns,
  columnsMobile = DEFAULTS.columnsMobile,
  gap = DEFAULTS.gap,
  tileHeight = DEFAULTS.tileHeight,
  tileHeightMobile = DEFAULTS.tileHeightMobile,
  tileRadius = DEFAULTS.tileRadius,
  maxWidth = DEFAULTS.maxWidth,
  nameColor = DEFAULTS.nameColor,
  titleColor = DEFAULTS.titleColor,
  sectionBackground = DEFAULTS.sectionBackground,
  titleFontFamily = DEFAULTS.titleFontFamily,
  bodyFontFamily = DEFAULTS.bodyFontFamily,
}: PulseCategoryTilesProps) => {
  if (showComponent === false) return null

  const list = tiles?.length ? tiles : DEFAULT_TILES
  if (!list.length) return null

  const cssVars = {
    "--pulse-ct-cols": String(columns),
    "--pulse-ct-cols-mobile": String(columnsMobile),
    "--pulse-ct-gap": `${gap}px`,
    "--pulse-ct-h": `${tileHeight}px`,
    "--pulse-ct-h-mobile": `${tileHeightMobile}px`,
    "--pulse-ct-radius": `${tileRadius}px`,
    "--pulse-ct-maxw": `${maxWidth}px`,
    "--pulse-ct-name": nameColor,
    "--pulse-ct-title": titleColor,
    "--pulse-ct-bg": sectionBackground,
    "--pulse-ct-title-font": titleFontFamily,
    "--pulse-ct-body-font": bodyFontFamily,
  } as React.CSSProperties

  return (
    <section className={styles.section} style={cssVars}>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@400;500;600;700;800&family=Hanken+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className={styles.inner}>
        {(title || subtitle) && (
          <header className={styles.header}>
            {title && <h2 className={styles.title}>{title}</h2>}
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </header>
        )}

        <div className={styles.grid}>
          {list.map((tile, i) => (
            <a
              key={`${tile.url ?? tile.name ?? i}`}
              href={tile.url ?? "#"}
              className={styles.tile}
              style={{ ...tileBackground(tile), "--pulse-ct-accent": tile.accentColor } as React.CSSProperties}
            >
              {tile.showArrow !== false && <ArrowIcon />}
              <div className={styles.tileContent}>
                {tile.eyebrow && <span className={styles.eyebrow}>{tile.eyebrow}</span>}
                {tile.name && <span className={styles.name}>{tile.name}</span>}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PulseCategoryTiles
