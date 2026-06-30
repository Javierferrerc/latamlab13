import Head from "next/head"

import type { PulseCategoryHeaderProps } from "./PulseCategoryHeader.types"
import { DEFAULTS } from "./PulseCategoryHeader.constants"
import styles from "./pulse-category-header.module.scss"

const PulseCategoryHeader = ({
  showComponent = true,
  breadcrumbHomeLabel = DEFAULTS.breadcrumbHomeLabel,
  breadcrumbHomeUrl = DEFAULTS.breadcrumbHomeUrl,
  category = DEFAULTS.category,
  title = DEFAULTS.title,
  description = DEFAULTS.description,
  height = DEFAULTS.height,
  heightMobile = DEFAULTS.heightMobile,
  gradientStart = DEFAULTS.gradientStart,
  gradientMid = DEFAULTS.gradientMid,
  gradientEnd = DEFAULTS.gradientEnd,
  gradientAngle = DEFAULTS.gradientAngle,
  showGlow = true,
  glowColor = DEFAULTS.glowColor,
  titleColor = DEFAULTS.titleColor,
  breadcrumbColor = DEFAULTS.breadcrumbColor,
  descriptionColor = DEFAULTS.descriptionColor,
  titleFontFamily = DEFAULTS.titleFontFamily,
  bodyFontFamily = DEFAULTS.bodyFontFamily,
}: PulseCategoryHeaderProps) => {
  if (showComponent === false) return null

  const stops = [gradientStart, gradientMid, gradientEnd].filter(Boolean)

  const cssVars = {
    "--pulse-ch-h": `${height}px`,
    "--pulse-ch-h-mobile": `${heightMobile}px`,
    "--pulse-ch-bg": `linear-gradient(${gradientAngle}deg, ${stops.join(", ")})`,
    "--pulse-ch-glow": glowColor,
    "--pulse-ch-title": titleColor,
    "--pulse-ch-breadcrumb": breadcrumbColor,
    "--pulse-ch-description": descriptionColor,
    "--pulse-ch-title-font": titleFontFamily,
    "--pulse-ch-body-font": bodyFontFamily,
  } as React.CSSProperties

  return (
    <section className={styles.header} style={cssVars}>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@400;500;600;700;800&family=Hanken+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      {showGlow && <span className={styles.glow} />}

      <div className={styles.content}>
        {(breadcrumbHomeLabel || category) && (
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            {breadcrumbHomeLabel && (
              <a href={breadcrumbHomeUrl ?? "/"} className={styles.crumbLink}>
                {breadcrumbHomeLabel}
              </a>
            )}
            {breadcrumbHomeLabel && (category || title) && (
              <span className={styles.sep}> / </span>
            )}
            {(category || title) && <span>{category || title}</span>}
          </nav>
        )}
        {title && <h1 className={styles.title}>{title}</h1>}
        {description && <p className={styles.description}>{description}</p>}
      </div>
    </section>
  )
}

export default PulseCategoryHeader
