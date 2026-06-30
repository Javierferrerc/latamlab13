import type { PulseProduct } from "./PulseProductShelf.types"
import PulseProductCard from "./PulseProductCard"
import styles from "./pulse-product-shelf.module.scss"

interface PulseProductGridProps {
  products: PulseProduct[]
  showWishlist?: boolean
  imageRadius?: number
  accentColor?: string
}

const PulseProductGrid = ({
  products,
  showWishlist = true,
  imageRadius = 16,
  accentColor = "#6D28F5",
}: PulseProductGridProps) => (
  <div className={styles.grid}>
    {products.map((product, i) => (
      <PulseProductCard
        key={`${product.url ?? product.name ?? i}`}
        product={product}
        showWishlist={showWishlist}
        imageRadius={imageRadius}
        accentColor={accentColor}
      />
    ))}
  </div>
)

export default PulseProductGrid
