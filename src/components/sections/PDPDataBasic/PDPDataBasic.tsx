"use client"

import { useEffect, useState } from "react"
// En FastStore 4.3 `usePDP` no se exporta desde "@faststore/core" (no está en el
// barrel). Vive en el PageProvider del core, accesible vía el alias `src/*`.
import { usePDP } from "src/sdk/overrides/PageProvider"

import styles from "./pdp-data-basic.module.scss"

type ExtraProductData = {
  rating?: number
  votes?: number
  label?: string
}

const PDPDataBasic = () => {
  const { data } = usePDP()
  const product = data?.product

  const productId = product?.isVariantOf?.productGroupID
  const productName = product?.name
  const brandName = product?.brand?.name

  const [extraData, setExtraData] = useState<ExtraProductData | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!productId) return

    setLoading(true)

    // Endpoint de ejemplo (patrón William). Reemplazar por el real de la cuenta,
    // p. ej. `/_v/wl/rating/${productId}` o `/_v/product-specifications/${productId}`.
    fetch(`/_v/product-extra/${productId}`)
      .then((res) => res.json())
      .then((response) => {
        setExtraData(response)
      })
      .catch(() => {
        setExtraData(null)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [productId])

  if (!product) return null

  return (
    <section className={styles.container}>
      {brandName && <p className={styles.brand}>{brandName}</p>}
      {productName && <h2 className={styles.title}>{productName}</h2>}

      {loading && (
        <p className={styles.muted}>Cargando información adicional...</p>
      )}

      {extraData && (
        <div className={styles.extraData}>
          {typeof extraData.rating === "number" && (
            <span>Rating: {extraData.rating}</span>
          )}
          {typeof extraData.votes === "number" && (
            <span>Votos: {extraData.votes}</span>
          )}
          {extraData.label && <span>{extraData.label}</span>}
        </div>
      )}
    </section>
  )
}

export default PDPDataBasic
