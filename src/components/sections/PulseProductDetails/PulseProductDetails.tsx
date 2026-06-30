"use client"

import Head from "next/head"

import { usePDP } from "src/sdk/overrides/PageProvider"

import PulseProductImages from "./PulseProductImages"
import PulseBuyBox from "./PulseBuyBox"
import styles from "./pulse-product-details.module.scss"

interface PulseProductDetailsProps {
  buyButtonTitle?: string
  buyNowTitle?: string
  sizeGuideLabel?: string
  sizeGuideUrl?: string
  shippingLines?: string[]
  maxWidth?: number
}

const PulseProductDetails = ({
  buyButtonTitle,
  buyNowTitle,
  sizeGuideLabel,
  sizeGuideUrl,
  shippingLines,
  maxWidth = 1120,
}: PulseProductDetailsProps) => {
  const context = usePDP()
  const product = context?.data?.product

  if (!product) return null

  const offer = product.offers?.offers?.[0]
  const spot = product.offers?.lowPrice ?? offer?.price ?? 0
  const list = offer?.listPrice ?? spot
  const discountPercent =
    list > spot && spot > 0 ? Math.round((1 - spot / list) * 100) : undefined

  const cssVars = {
    "--pulse-pd-maxw": `${maxWidth}px`,
  } as React.CSSProperties

  return (
    <section className={styles.section} style={cssVars} data-fs-product-details>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@400;500;600;700;800&family=Hanken+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className={styles.layout}>
        <PulseProductImages
          images={product.image ?? []}
          discountPercent={discountPercent}
        />
        <PulseBuyBox
          product={product}
          buyButtonTitle={buyButtonTitle}
          buyNowTitle={buyNowTitle}
          sizeGuideLabel={sizeGuideLabel}
          sizeGuideUrl={sizeGuideUrl}
          shippingLines={shippingLines}
        />
      </div>
    </section>
  )
}

export default PulseProductDetails
