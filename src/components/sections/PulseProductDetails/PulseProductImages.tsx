"use client"

import { useState } from "react"

import styles from "./pulse-product-details.module.scss"

interface PulseImage {
  url: string
  alternateName?: string
}

interface PulseProductImagesProps {
  images: PulseImage[]
  discountPercent?: number
  accentColor?: string
}

const HeartIcon = ({ filled }: { filled: boolean }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="1.6"
    aria-hidden
  >
    <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z" />
  </svg>
)

const PulseProductImages = ({
  images,
  discountPercent,
  accentColor = "#6D28F5",
}: PulseProductImagesProps) => {
  const [active, setActive] = useState(0)
  const [wished, setWished] = useState(false)

  const list = images?.length ? images : []
  if (!list.length) return null

  const main = list[Math.min(active, list.length - 1)]

  return (
    <div className={styles.gallery} style={{ "--pulse-pd-accent": accentColor } as React.CSSProperties}>
      {list.length > 1 && (
        <div className={styles.thumbs}>
          {list.map((img, i) => (
            <button
              key={i}
              type="button"
              className={styles.thumb}
              data-active={i === active}
              onClick={() => setActive(i)}
              aria-label={`Ver imagen ${i + 1}`}
            >
              <img src={img.url} alt={img.alternateName ?? ""} loading="lazy" />
            </button>
          ))}
        </div>
      )}

      <div className={styles.main}>
        {typeof discountPercent === "number" && discountPercent > 0 && (
          <span className={styles.discountBadge}>-{discountPercent}%</span>
        )}
        <button
          type="button"
          className={styles.wishlist}
          data-on={wished}
          onClick={() => setWished((v) => !v)}
          aria-label="Añadir a favoritos"
        >
          <HeartIcon filled={wished} />
        </button>
        <img src={main.url} alt={main.alternateName ?? ""} />
      </div>
    </div>
  )
}

export default PulseProductImages
