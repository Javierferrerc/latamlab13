"use client"

import { cartStore } from "src/sdk/cart"
import { useRemoveButton } from "src/sdk/cart/useRemoveButton"
import { usePriceFormatter } from "src/sdk/product/useFormattedPrice"

import styles from "./pulse-cart-sidebar.module.scss"

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>
)

interface PulseCartItemProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: any
}

const PulseCartItem = ({ item }: PulseCartItemProps) => {
  const formatPrice = usePriceFormatter()
  const removeProps = useRemoveButton(item)

  const io = item?.itemOffered ?? {}
  const img = io?.image?.[0]?.url
  const name = io?.isVariantOf?.name ?? io?.name
  const variant = Object.values(
    io?.isVariantOf?.skuVariants?.activeVariations ?? {}
  ).join(" · ")

  const setQty = (q: number) =>
    cartStore.updateItemQuantity(item.id, Math.max(1, q))

  return (
    <div className={styles.item}>
      <div className={styles.itemImg}>
        {img && <img src={img} alt={name ?? ""} loading="lazy" />}
      </div>
      <div className={styles.itemBody}>
        <div className={styles.itemTop}>
          <span className={styles.itemName}>{name}</span>
          <button
            type="button"
            className={styles.itemRemove}
            aria-label="Quitar del carrito"
            {...removeProps}
          >
            <CloseIcon />
          </button>
        </div>
        {variant && <div className={styles.itemVariant}>{variant}</div>}
        <div className={styles.itemBottom}>
          <div className={styles.qty}>
            <button
              type="button"
              className={styles.qtyBtn}
              onClick={() => setQty(item.quantity - 1)}
              aria-label="Quitar uno"
            >
              −
            </button>
            <span className={styles.qtyValue}>{item.quantity}</span>
            <button
              type="button"
              className={styles.qtyBtn}
              onClick={() => setQty(item.quantity + 1)}
              aria-label="Agregar uno"
            >
              +
            </button>
          </div>
          <span className={styles.itemPrice}>
            {formatPrice(item.price * item.quantity)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default PulseCartItem
