"use client"

import { useMemo, useState } from "react"

import { useBuyButton } from "src/sdk/cart/useBuyButton"
import { usePriceFormatter } from "src/sdk/product/useFormattedPrice"
import Selectors from "src/components/ui/SkuSelector"

import styles from "./pulse-product-details.module.scss"

interface PulseBuyBoxProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  product: any
  buyButtonTitle?: string
  buyNowTitle?: string
  sizeGuideLabel?: string
  sizeGuideUrl?: string
  shippingLines?: string[]
}

const ShipIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
    <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z" />
    <circle cx="7" cy="18" r="2" />
    <circle cx="17" cy="18" r="2" />
  </svg>
)

const ReturnIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
    <path d="M21 12a9 9 0 1 1-3-6.7M21 4v4h-4" />
  </svg>
)

const DEFAULT_SHIPPING = [
  "Envío gratis en 24-48h por compras +50€",
  "Devoluciones gratuitas en 30 días",
]

const PulseBuyBox = ({
  product,
  buyButtonTitle = "Añadir a la cesta",
  buyNowTitle = "Comprar ahora",
  sizeGuideLabel = "Guía de tallas",
  sizeGuideUrl,
  shippingLines,
}: PulseBuyBoxProps) => {
  const formatPrice = usePriceFormatter()
  const [quantity, setQuantity] = useState(1)
  const [openAcc, setOpenAcc] = useState(0)

  const {
    id,
    sku,
    gtin,
    unitMultiplier,
    name: variantName,
    brand,
    isVariantOf,
    image: productImages,
    additionalProperty,
    breadcrumbList,
    description,
    offers: {
      offers: [{ availability, price, priceWithTaxes, listPrice, seller, listPriceWithTaxes }],
      lowPrice,
    },
  } = product

  const skuVariants = isVariantOf?.skuVariants

  const cartItem = {
    id,
    price,
    priceWithTaxes,
    listPrice,
    listPriceWithTaxes,
    seller,
    quantity,
    itemOffered: {
      sku,
      name: variantName,
      gtin,
      image: productImages,
      brand,
      isVariantOf,
      additionalProperty,
      unitMultiplier,
    },
  }

  const buyProps = useBuyButton(cartItem)
  const buyNowProps = useBuyButton(cartItem, false)

  const outOfStock = availability === "https://schema.org/OutOfStock"
  const spot = lowPrice ?? price
  const hasDiscount = listPrice > spot
  const savings = hasDiscount ? listPrice - spot : 0

  const eyebrow = useMemo(() => {
    const items = breadcrumbList?.itemListElement ?? []
    const cats = [...items]
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .sort((a: any, b: any) => (a.position ?? 0) - (b.position ?? 0))
      .slice(0, -1)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((c: any) => c.name)
    return (cats.join(" · ") || brand?.name || "").toUpperCase()
  }, [breadcrumbList, brand])

  const onBuyNow = (e: React.MouseEvent<HTMLButtonElement>) => {
    buyNowProps.onClick(e)
    if (typeof window !== "undefined") window.location.assign("/checkout")
  }

  const shipping = shippingLines?.length ? shippingLines : DEFAULT_SHIPPING

  const accordionItems = [
    { title: "Descripción", content: description },
    {
      title: "Composición y cuidado",
      content:
        "85% poliéster reciclado, 15% elastano. Lavar a máquina en frío. No usar secadora ni lejía.",
    },
    {
      title: "Envíos y devoluciones",
      content:
        "Envío gratis en 24-48h por compras superiores a 50€. Devoluciones gratuitas en 30 días.",
    },
  ].filter((it) => it.content)

  return (
    <div className={styles.buybox}>
      {eyebrow && <div className={styles.eyebrow}>{eyebrow}</div>}
      {isVariantOf?.name && <h1 className={styles.title}>{isVariantOf.name}</h1>}

      <div className={styles.price}>
        <span className={styles.spot}>{formatPrice(spot)}</span>
        {hasDiscount && (
          <>
            <span className={styles.list}>{formatPrice(listPrice)}</span>
            <span className={styles.savings}>Ahorras {formatPrice(savings)}</span>
          </>
        )}
      </div>

      {skuVariants && (
        <div className={styles.selectors}>
          <div className={styles.selectorsHeader}>
            <span />
            {sizeGuideUrl && (
              <a href={sizeGuideUrl} className={styles.sizeGuide}>
                {sizeGuideLabel}
              </a>
            )}
          </div>
          <Selectors
            slugsMap={skuVariants.slugsMap}
            availableVariations={skuVariants.availableVariations}
            activeVariations={skuVariants.activeVariations}
          />
        </div>
      )}

      <div className={styles.actions}>
        <div className={styles.qty}>
          <button
            type="button"
            className={styles.qtyBtn}
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label="Quitar uno"
          >
            −
          </button>
          <span className={styles.qtyValue}>{quantity}</span>
          <button
            type="button"
            className={styles.qtyBtn}
            onClick={() => setQuantity((q) => Math.min(10, q + 1))}
            aria-label="Agregar uno"
          >
            +
          </button>
        </div>
        <button
          type="button"
          className={styles.addToCart}
          disabled={outOfStock}
          {...buyProps}
        >
          {outOfStock ? "Agotado" : buyButtonTitle}
        </button>
      </div>

      {!outOfStock && (
        <button type="button" className={styles.buyNow} onClick={onBuyNow}>
          {buyNowTitle}
        </button>
      )}

      <div className={styles.shipping}>
        {shipping.map((line, i) => (
          <div key={i} className={styles.shippingLine}>
            {i === 0 ? <ShipIcon /> : <ReturnIcon />}
            {line}
          </div>
        ))}
      </div>

      {accordionItems.length > 0 && (
        <div className={styles.accordion}>
          {accordionItems.map((it, i) => {
            const isOpen = i === openAcc
            return (
              <div key={i} className={styles.accRow}>
                <button
                  type="button"
                  className={styles.accHeader}
                  aria-expanded={isOpen}
                  onClick={() => setOpenAcc(isOpen ? -1 : i)}
                >
                  {it.title}
                  <span className={styles.accSign}>{isOpen ? "−" : "+"}</span>
                </button>
                {isOpen && <p className={styles.accBody}>{it.content}</p>}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default PulseBuyBox
