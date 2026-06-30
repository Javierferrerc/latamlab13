"use client"

import type { PulseProduct, PulseProductCardProps } from "./PulseProductShelf.types"
import styles from "./pulse-product-card.module.scss"

const productImage = (product: PulseProduct): React.CSSProperties => {
  if (product.image?.src) {
    return {
      backgroundImage: `url(${product.image.src})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }
  }
  return {
    background: `linear-gradient(150deg, ${product.gradientStart ?? "#EAE6F1"}, ${product.gradientEnd ?? "#F4F2F9"})`,
  }
}

const HeartIcon = () => (
  <svg
    className={styles.wishlist}
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    aria-hidden
  >
    <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z" />
  </svg>
)

const PulseProductCard = ({
  product,
  showWishlist = true,
  imageRadius = 16,
  accentColor = "#6D28F5",
}: PulseProductCardProps) => {
  const cssVars = {
    "--pulse-pc-radius": `${imageRadius}px`,
    "--pulse-pc-accent": accentColor,
  } as React.CSSProperties

  return (
    <a
      href={product.url ?? "#"}
      className={styles.card}
      style={cssVars}
      aria-label={product.name}
    >
      <div className={styles.media} style={productImage(product)}>
        {product.badge && (
          <span
            className={styles.badge}
            style={{
              background: product.badgeBg ?? "#15131B",
              color: product.badgeColor ?? "#ffffff",
            }}
          >
            {product.badge}
          </span>
        )}
        {showWishlist && (
          <button
            type="button"
            className={styles.wishlistBtn}
            aria-label="Añadir a favoritos"
            onClick={(e) => e.preventDefault()}
          >
            <HeartIcon />
          </button>
        )}
      </div>

      {product.name && <div className={styles.name}>{product.name}</div>}
      {product.category && <div className={styles.category}>{product.category}</div>}
      {product.price && (
        <div className={styles.price}>
          {product.price}
          {product.oldPrice && (
            <span className={styles.oldPrice}>{product.oldPrice}</span>
          )}
        </div>
      )}
    </a>
  )
}

export default PulseProductCard
