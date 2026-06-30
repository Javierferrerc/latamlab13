import Head from "next/head"

import type {
  PulsePromoBanner,
  PulsePromoBannersProps,
} from "./PulsePromoBanners.types"
import { DEFAULTS, DEFAULT_BANNERS } from "./PulsePromoBanners.constants"
import styles from "./pulse-promo-banners.module.scss"

const bannerBackground = (banner: PulsePromoBanner): React.CSSProperties => {
  if (banner.backgroundImage?.src) {
    return {
      backgroundImage: `url(${banner.backgroundImage.src})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }
  }
  const angle = banner.gradientAngle ?? 120
  return {
    background: `linear-gradient(${angle}deg, ${banner.gradientStart ?? "#15131B"}, ${banner.gradientEnd ?? "#3a2870"})`,
  }
}

const PulsePromoBanners = ({
  showComponent = true,
  banners,
  columns = DEFAULTS.columns,
  gap = DEFAULTS.gap,
  minHeight = DEFAULTS.minHeight,
  radius = DEFAULTS.radius,
  ctaRadius = DEFAULTS.ctaRadius,
  maxWidth = DEFAULTS.maxWidth,
  paddingY = DEFAULTS.paddingY,
  titleFontFamily = DEFAULTS.titleFontFamily,
  bodyFontFamily = DEFAULTS.bodyFontFamily,
}: PulsePromoBannersProps) => {
  if (showComponent === false) return null

  const list = banners?.length ? banners : DEFAULT_BANNERS
  if (!list.length) return null

  const cssVars = {
    "--pulse-pb-cols": String(columns),
    "--pulse-pb-gap": `${gap}px`,
    "--pulse-pb-minh": `${minHeight}px`,
    "--pulse-pb-radius": `${radius}px`,
    "--pulse-pb-cta-radius": `${ctaRadius}px`,
    "--pulse-pb-maxw": `${maxWidth}px`,
    "--pulse-pb-py": `${paddingY}px`,
    "--pulse-pb-title-font": titleFontFamily,
    "--pulse-pb-body-font": bodyFontFamily,
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
        <div className={styles.grid}>
          {list.map((banner, i) => {
            const content = (
              <>
                {banner.eyebrow && (
                  <span
                    className={styles.eyebrow}
                    style={{ color: banner.eyebrowColor }}
                  >
                    {banner.eyebrow}
                  </span>
                )}
                {banner.title && (
                  <h2
                    className={styles.title}
                    style={{ color: banner.titleColor }}
                  >
                    {banner.title}
                  </h2>
                )}
                {banner.ctaText && (
                  <span
                    className={styles.cta}
                    style={{
                      background: banner.ctaBg,
                      color: banner.ctaColor,
                    }}
                  >
                    {banner.ctaText}
                  </span>
                )}
              </>
            )

            return banner.ctaUrl ? (
              <a
                key={i}
                href={banner.ctaUrl}
                className={styles.banner}
                style={bannerBackground(banner)}
              >
                <div className={styles.content}>{content}</div>
              </a>
            ) : (
              <div
                key={i}
                className={styles.banner}
                style={bannerBackground(banner)}
              >
                <div className={styles.content}>{content}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default PulsePromoBanners
