import Head from "next/head"

import type {
  PulseCommunityTile,
  PulseCommunityGridProps,
} from "./PulseCommunityGrid.types"
import { DEFAULTS, DEFAULT_TILES } from "./PulseCommunityGrid.constants"
import styles from "./pulse-community-grid.module.scss"

const InstagramIcon = () => (
  <svg
    className={styles.icon}
    width="30"
    height="30"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    aria-hidden
  >
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
  </svg>
)

const tileBackground = (tile: PulseCommunityTile): React.CSSProperties => {
  if (tile.image?.src) {
    return {
      backgroundImage: `url(${tile.image.src})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }
  }
  return {
    background: `linear-gradient(150deg, ${tile.gradientStart ?? "#dcd3f6"}, ${tile.gradientEnd ?? "#ece7fa"})`,
  }
}

const PulseCommunityGrid = ({
  showComponent = true,
  eyebrow = DEFAULTS.eyebrow,
  title = DEFAULTS.title,
  description = DEFAULTS.description,
  tiles,
  columns = DEFAULTS.columns,
  columnsTablet = DEFAULTS.columnsTablet,
  columnsMobile = DEFAULTS.columnsMobile,
  gap = DEFAULTS.gap,
  tileRadius = DEFAULTS.tileRadius,
  maxWidth = DEFAULTS.maxWidth,
  paddingY = DEFAULTS.paddingY,
  sectionBackground = DEFAULTS.sectionBackground,
  eyebrowColor = DEFAULTS.eyebrowColor,
  titleColor = DEFAULTS.titleColor,
  descriptionColor = DEFAULTS.descriptionColor,
  overlayColor = DEFAULTS.overlayColor,
  titleFontFamily = DEFAULTS.titleFontFamily,
  bodyFontFamily = DEFAULTS.bodyFontFamily,
}: PulseCommunityGridProps) => {
  if (showComponent === false) return null

  const list = tiles?.length ? tiles : DEFAULT_TILES
  if (!list.length) return null

  const cssVars = {
    "--pulse-cg-cols": String(columns),
    "--pulse-cg-cols-tablet": String(columnsTablet),
    "--pulse-cg-cols-mobile": String(columnsMobile),
    "--pulse-cg-gap": `${gap}px`,
    "--pulse-cg-radius": `${tileRadius}px`,
    "--pulse-cg-maxw": `${maxWidth}px`,
    "--pulse-cg-py": `${paddingY}px`,
    "--pulse-cg-bg": sectionBackground,
    "--pulse-cg-eyebrow": eyebrowColor,
    "--pulse-cg-title": titleColor,
    "--pulse-cg-description": descriptionColor,
    "--pulse-cg-overlay": overlayColor,
    "--pulse-cg-title-font": titleFontFamily,
    "--pulse-cg-body-font": bodyFontFamily,
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
        {(eyebrow || title || description) && (
          <header className={styles.header}>
            {eyebrow && <div className={styles.eyebrow}>{eyebrow}</div>}
            {title && <h2 className={styles.title}>{title}</h2>}
            {description && <p className={styles.description}>{description}</p>}
          </header>
        )}

        <div className={styles.grid}>
          {list.map((tile, i) => {
            const inner = (
              <div className={styles.tileMedia} style={tileBackground(tile)}>
                <span className={styles.overlay}>
                  <InstagramIcon />
                </span>
              </div>
            )

            return tile.url ? (
              <a
                key={i}
                href={tile.url}
                className={styles.tile}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={tile.image?.alt ?? "Ver publicación"}
              >
                {inner}
              </a>
            ) : (
              <div key={i} className={styles.tile}>
                {inner}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default PulseCommunityGrid
