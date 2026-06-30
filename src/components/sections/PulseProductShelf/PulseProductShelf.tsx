import Head from "next/head"

import type { PulseProductShelfProps } from "./PulseProductShelf.types"
import { DEFAULTS, DEFAULT_PRODUCTS } from "./PulseProductShelf.constants"
import PulseProductCard from "./PulseProductCard"
import styles from "./pulse-product-shelf.module.scss"

const PulseProductShelf = ({
  showComponent = true,
  eyebrow = DEFAULTS.eyebrow,
  title = DEFAULTS.title,
  viewAllText = DEFAULTS.viewAllText,
  viewAllUrl,
  products,
  showWishlist = true,
  columns = DEFAULTS.columns,
  gap = DEFAULTS.gap,
  imageRadius = DEFAULTS.imageRadius,
  maxWidth = DEFAULTS.maxWidth,
  paddingY = DEFAULTS.paddingY,
  eyebrowColor = DEFAULTS.eyebrowColor,
  titleColor = DEFAULTS.titleColor,
  accentColor = DEFAULTS.accentColor,
  nameColor = DEFAULTS.nameColor,
  categoryColor = DEFAULTS.categoryColor,
  priceColor = DEFAULTS.priceColor,
  oldPriceColor = DEFAULTS.oldPriceColor,
  sectionBackground = DEFAULTS.sectionBackground,
  titleFontFamily = DEFAULTS.titleFontFamily,
  bodyFontFamily = DEFAULTS.bodyFontFamily,
}: PulseProductShelfProps) => {
  if (showComponent === false) return null

  const list = products?.length ? products : DEFAULT_PRODUCTS
  if (!list.length) return null

  const cssVars = {
    "--pulse-ps-cols": String(columns),
    "--pulse-ps-gap": `${gap}px`,
    "--pulse-ps-maxw": `${maxWidth}px`,
    "--pulse-ps-py": `${paddingY}px`,
    "--pulse-ps-eyebrow": eyebrowColor,
    "--pulse-ps-title": titleColor,
    "--pulse-ps-accent": accentColor,
    "--pulse-ps-name": nameColor,
    "--pulse-ps-category": categoryColor,
    "--pulse-ps-price": priceColor,
    "--pulse-ps-oldprice": oldPriceColor,
    "--pulse-ps-bg": sectionBackground,
    "--pulse-ps-title-font": titleFontFamily,
    "--pulse-ps-body-font": bodyFontFamily,
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
        <header className={styles.header}>
          <div>
            {eyebrow && <div className={styles.eyebrow}>{eyebrow}</div>}
            {title && <h2 className={styles.title}>{title}</h2>}
          </div>
          {viewAllText && viewAllUrl && (
            <a href={viewAllUrl} className={styles.viewAll}>
              {viewAllText}
            </a>
          )}
        </header>

        <div className={styles.grid}>
          {list.map((product, i) => (
            <PulseProductCard
              key={`${product.url ?? product.name ?? i}`}
              product={product}
              showWishlist={showWishlist}
              imageRadius={imageRadius}
              accentColor={accentColor}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default PulseProductShelf
