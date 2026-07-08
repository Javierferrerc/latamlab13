"use client"

import Link from "next/link"

import {
  getSkuColorByName,
  useSkuColorConfig,
} from "../SkuOptionColors/sku-color-store"
import siblingsData from "./color-siblings.generated.json"
import styles from "./pulse-sku-selector.module.scss"

// En este catálogo cada color es un PRODUCTO separado (no un SKU). El mapa
// generado (color-siblings.generated.json) agrupa los productos del mismo
// item base por color, para poder pintar swatches que navegan a la PDP de
// cada color. Se regenera si cambia el catálogo (ver scripts de scratchpad).
type ColorOption = {
  color: string
  hex: string
  href: string
  productId: string
}

const siblings = siblingsData as Record<string, ColorOption[]>

interface PulseColorSwatchesProps {
  productId?: string
}

const PulseColorSwatches = ({ productId }: PulseColorSwatchesProps) => {
  useSkuColorConfig()

  if (!productId) return null
  const options = siblings[productId]
  if (!options || options.length < 2) return null

  const active = options.find((o) => o.productId === productId)

  return (
    <section className={styles.group} data-fs-pulse-color-swatches>
      <div className={styles.labelRow}>
        <p className={styles.label}>
          Color
          {active && <span className={styles.labelValue}>: {active.color}</span>}
        </p>
      </div>
      <div className={styles.swatchOptions}>
        {options.map((o) => {
          const isActive = o.productId === productId
          // El hex del CMS (SkuOptionColors) tiene prioridad; si no está
          // mapeado, usamos el hex por defecto del mapa generado.
          const cms = getSkuColorByName(o.color)
          const value = cms?.value ?? o.hex
          const cls = `${styles.swatchOption} ${
            cms?.isMetallic ? styles.metallic : ""
          }`
          const dot = (
            <span
              className={styles.dot}
              style={{ "--sku-color": value } as React.CSSProperties}
            />
          )

          if (isActive) {
            return (
              <span
                key={o.productId}
                className={cls}
                data-selected="true"
                title={o.color}
                aria-current="true"
              >
                {dot}
              </span>
            )
          }
          return (
            <Link
              key={o.productId}
              href={o.href}
              prefetch={false}
              className={cls}
              title={o.color}
              aria-label={`Ver color ${o.color}`}
            >
              {dot}
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export default PulseColorSwatches
