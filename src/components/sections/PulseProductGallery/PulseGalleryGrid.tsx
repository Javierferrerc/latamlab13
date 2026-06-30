"use client"

import { usePriceFormatter } from "src/sdk/product/useFormattedPrice"
import { useGalleryPage } from "src/sdk/product/usePageProductsQuery"

import PulseProductCard from "../PulseProductShelf/PulseProductCard"
import type { PulseProduct } from "../PulseProductShelf/PulseProductShelf.types"
import styles from "./pulse-product-gallery.module.scss"

// Maps a VTEX product (ProductSummary fragment) to the Pulse card shape.
const toPulseProduct = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  node: any,
  formatPrice: (price: number) => string,
  accentColor: string
): PulseProduct => {
  const spotPrice = node?.offers?.lowPrice ?? 0
  const listPrice = node?.offers?.offers?.[0]?.listPrice ?? spotPrice
  const hasDiscount = listPrice > spotPrice && spotPrice > 0
  const img = node?.image?.[0]

  return {
    name: node?.isVariantOf?.name ?? node?.name,
    category: node?.brand?.name,
    price: formatPrice(spotPrice),
    oldPrice: hasDiscount ? formatPrice(listPrice) : undefined,
    url: node?.slug ? `/${node.slug}/p` : undefined,
    image: img?.url ? { src: img.url, alt: img.alternateName } : undefined,
    badge: hasDiscount
      ? `-${Math.round((1 - spotPrice / listPrice) * 100)}%`
      : undefined,
    badgeBg: hasDiscount ? accentColor : undefined,
    badgeColor: "#ffffff",
  }
}

interface PulseGalleryGridProps {
  page: number
  accentColor?: string
}

const PulseGalleryGrid = ({ page, accentColor = "#6D28F5" }: PulseGalleryGridProps) => {
  const formatPrice = usePriceFormatter()
  const { data } = useGalleryPage(page)
  const edges = data?.search?.products?.edges ?? []

  if (!edges.length) {
    return (
      <p className={styles.empty}>No encontramos productos con esos filtros.</p>
    )
  }

  return (
    <div className={styles.grid}>
      {edges.map(({ node }, i) => (
        <PulseProductCard
          key={node?.id ?? i}
          product={toPulseProduct(node, formatPrice, accentColor)}
          imageRadius={16}
          accentColor={accentColor}
        />
      ))}
    </div>
  )
}

export default PulseGalleryGrid
