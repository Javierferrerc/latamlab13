import Head from "next/head"

import type { PulseEditorialBannerProps } from "./PulseEditorialBanner.types"
import { DEFAULTS } from "./PulseEditorialBanner.constants"
import styles from "./pulse-editorial-banner.module.scss"

const PulseEditorialBanner = ({
  showComponent = true,
  eyebrow = DEFAULTS.eyebrow,
  title = DEFAULTS.title,
  paragraph = DEFAULTS.paragraph,
  ctaText = DEFAULTS.ctaText,
  ctaUrl,
  imagePosition = DEFAULTS.imagePosition,
  maxWidth = DEFAULTS.maxWidth,
  minHeight = DEFAULTS.minHeight,
  cardRadius = DEFAULTS.cardRadius,
  backgroundType = "gradient",
  gradientStart = DEFAULTS.gradientStart,
  gradientEnd = DEFAULTS.gradientEnd,
  gradientAngle = DEFAULTS.gradientAngle,
  backgroundImage,
  showGlow = true,
  glowColor = DEFAULTS.glowColor,
  panelBackground = DEFAULTS.panelBackground,
  eyebrowColor = DEFAULTS.eyebrowColor,
  titleColor = DEFAULTS.titleColor,
  paragraphColor = DEFAULTS.paragraphColor,
  ctaBg = DEFAULTS.ctaBg,
  ctaColor = DEFAULTS.ctaColor,
  ctaRadius = DEFAULTS.ctaRadius,
  titleFontFamily = DEFAULTS.titleFontFamily,
  bodyFontFamily = DEFAULTS.bodyFontFamily,
}: PulseEditorialBannerProps) => {
  if (showComponent === false) return null

  const mediaStyle: React.CSSProperties =
    backgroundType === "image" && backgroundImage?.src
      ? {
          backgroundImage: `url(${backgroundImage.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }
      : {
          background: `linear-gradient(${gradientAngle}deg, ${gradientStart}, ${gradientEnd})`,
        }

  const cssVars = {
    "--pulse-eb-maxw": `${maxWidth}px`,
    "--pulse-eb-minh": `${minHeight}px`,
    "--pulse-eb-radius": `${cardRadius}px`,
    "--pulse-eb-panel": panelBackground,
    "--pulse-eb-eyebrow": eyebrowColor,
    "--pulse-eb-title": titleColor,
    "--pulse-eb-paragraph": paragraphColor,
    "--pulse-eb-cta-bg": ctaBg,
    "--pulse-eb-cta-color": ctaColor,
    "--pulse-eb-cta-radius": `${ctaRadius}px`,
    "--pulse-eb-glow": glowColor,
    "--pulse-eb-title-font": titleFontFamily,
    "--pulse-eb-body-font": bodyFontFamily,
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
        <div
          className={styles.card}
          data-image-position={imagePosition}
        >
          <div className={styles.media} style={mediaStyle}>
            {showGlow && <span className={styles.glow} />}
            {backgroundType === "image" && backgroundImage?.alt && (
              <span className={styles.srOnly}>{backgroundImage.alt}</span>
            )}
          </div>

          <div className={styles.copy}>
            {eyebrow && <div className={styles.eyebrow}>{eyebrow}</div>}
            {title && <h2 className={styles.title}>{title}</h2>}
            {paragraph && <p className={styles.paragraph}>{paragraph}</p>}
            {ctaText && (
              <a href={ctaUrl ?? "#"} className={styles.cta}>
                {ctaText}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default PulseEditorialBanner
