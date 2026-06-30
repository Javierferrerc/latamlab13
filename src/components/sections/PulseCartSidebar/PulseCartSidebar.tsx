"use client"

import { useUI } from "@faststore/ui"

import { useCart } from "src/sdk/cart"
import { useCheckoutButton } from "src/sdk/cart/useCheckoutButton"
import { usePriceFormatter } from "src/sdk/product/useFormattedPrice"

import PulseCartItem from "./PulseCartItem"
import styles from "./pulse-cart-sidebar.module.scss"

const FREE_SHIPPING = 50
const SHIPPING_COST = 3.95

const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>
)

const EmptyCartIcon = () => (
  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#cfc9da" strokeWidth="1.4" aria-hidden>
    <path d="M6 8h12l-1 12H7L6 8Z" />
    <path d="M9 8a3 3 0 0 1 6 0" />
  </svg>
)

const PulseCartSidebar = () => {
  const { cart: displayCart, closeCart } = useUI()
  const { items, totalItems, subTotal } = useCart()
  const checkoutProps = useCheckoutButton()
  const formatPrice = usePriceFormatter()

  if (!displayCart) return null

  const isEmpty = items.length === 0
  const remaining = Math.max(0, FREE_SHIPPING - subTotal)
  const pct = subTotal > 0 ? Math.min(100, (subTotal / FREE_SHIPPING) * 100) : 0
  const ship = subTotal >= FREE_SHIPPING || subTotal === 0 ? 0 : SHIPPING_COST
  const total = subTotal + ship

  return (
    <div className={styles.root}>
      <div className={styles.backdrop} onClick={closeCart} />
      <aside className={styles.drawer} role="dialog" aria-label="Carrito">
        <div className={styles.header}>
          <div className={styles.title}>Tu carrito ({totalItems})</div>
          <button
            type="button"
            className={styles.close}
            onClick={closeCart}
            aria-label="Cerrar carrito"
          >
            <CloseIcon />
          </button>
        </div>

        {!isEmpty && (
          <div className={styles.freeBar}>
            <div className={styles.freeMsg}>
              {remaining > 0
                ? `Te faltan ${formatPrice(remaining)} para el envío gratis`
                : "Has conseguido el envío gratis"}
            </div>
            <div className={styles.freeTrack}>
              <div className={styles.freeFill} style={{ width: `${pct}%` }} />
            </div>
          </div>
        )}

        {isEmpty ? (
          <div className={styles.empty}>
            <EmptyCartIcon />
            <div className={styles.emptyTitle}>Tu carrito está vacío</div>
            <button type="button" className={styles.emptyBtn} onClick={closeCart}>
              Empezar a comprar
            </button>
          </div>
        ) : (
          <>
            <div className={styles.list}>
              {items.map((item) => (
                <PulseCartItem key={item.id} item={item} />
              ))}
            </div>

            <div className={styles.footer}>
              <div className={styles.row}>
                <span>Subtotal</span>
                <span>{formatPrice(subTotal)}</span>
              </div>
              <div className={styles.row}>
                <span>Envío</span>
                <span>{ship === 0 ? "Gratis" : formatPrice(ship)}</span>
              </div>
              <div className={styles.totalRow}>
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
              <button type="button" className={styles.checkout} {...checkoutProps}>
                Tramitar pedido
              </button>
              <button type="button" className={styles.continue} onClick={closeCart}>
                Seguir comprando
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}

export default PulseCartSidebar
