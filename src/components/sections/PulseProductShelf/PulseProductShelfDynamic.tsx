"use client"

import { useProductsQuery } from "src/sdk/product/useProductsQuery"
import { usePriceFormatter } from "src/sdk/product/useFormattedPrice"

import type {
  PulseProduct,
  PulseShelfSort,
} from "./PulseProductShelf.types"
import PulseProductGrid from "./PulseProductGrid"

interface PulseProductShelfDynamicProps {
  collection: string
  sort: PulseShelfSort
  numberOfItems: number
  showWishlist?: boolean
  imageRadius?: number
  accentColor?: string
  fallback?: PulseProduct[]
}

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

const PulseProductShelfDynamic = ({
  collection,
  sort,
  numberOfItems,
  showWishlist = true,
  imageRadius = 16,
  accentColor = "#6D28F5",
  fallback = [],
}: PulseProductShelfDynamicProps) => {
  const formatPrice = usePriceFormatter()

  const data = useProductsQuery({
    first: numberOfItems,
    sort,
    term: "",
    selectedFacets: [{ key: "productClusterIds", value: collection }],
  })

  const edges = data?.search?.products?.edges
  // While loading (undefined) keep the manual fallback so the shelf never flashes empty.
  const products =
    edges === undefined
      ? fallback
      : edges.map(({ node }) => toPulseProduct(node, formatPrice, accentColor))

  if (!products.length) return null

  return (
    <PulseProductGrid
      products={products}
      showWishlist={showWishlist}
      imageRadius={imageRadius}
      accentColor={accentColor}
    />
  )
}

export default PulseProductShelfDynamic
