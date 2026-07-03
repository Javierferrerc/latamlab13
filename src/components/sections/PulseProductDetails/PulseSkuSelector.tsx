"use client"

import Link from "next/link"
import { useMemo } from "react"

import {
  getSkuColorByName,
  useSkuColorConfig,
} from "../SkuOptionColors/sku-color-store"
import styles from "./pulse-sku-selector.module.scss"

type VariationValue = string

type SkuVariants = {
  activeVariations?: Record<string, VariationValue>
  availableVariations?: Record<string, VariationValue[]>
  slugsMap?: Record<string, string>
}

interface PulseSkuSelectorProps {
  skuVariants?: SkuVariants
}

const normalizeSlug = (slug: string) => {
  if (!slug) return "#"
  const withSlash = slug.startsWith("/") ? slug : `/${slug}`
  return withSlash.endsWith("/p") ? withSlash : `${withSlash}/p`
}

const buildSlugKey = (dimension: string, value: string) =>
  `${dimension}-${value}`

// Resuelve el destino de una opción usando slugsMap. El formato de llave puede
// variar por proyecto: primero prueba la llave directa, luego la combinación
// completa de variaciones activas, y por último un match parcial.
const findSlugForOption = ({
  dimension,
  value,
  skuVariants,
}: {
  dimension: string
  value: string
  skuVariants: SkuVariants
}) => {
  const slugsMap = skuVariants.slugsMap ?? {}
  const activeVariations = skuVariants.activeVariations ?? {}

  const directKey = buildSlugKey(dimension, value)
  if (slugsMap[directKey]) return normalizeSlug(slugsMap[directKey])

  const nextSelection = { ...activeVariations, [dimension]: value }
  const joinedKey = Object.entries(nextSelection)
    .map(([key, selectedValue]) => buildSlugKey(key, selectedValue))
    .join("--")
  if (slugsMap[joinedKey]) return normalizeSlug(slugsMap[joinedKey])

  const fallback = Object.entries(slugsMap).find(([key]) =>
    key.includes(directKey)
  )
  return fallback ? normalizeSlug(fallback[1]) : "#"
}

const PulseSkuSelector = ({ skuVariants }: PulseSkuSelectorProps) => {
  useSkuColorConfig()

  const groups = useMemo(() => {
    const available = skuVariants?.availableVariations ?? {}
    return Object.entries(available).filter(([, values]) => values.length > 0)
  }, [skuVariants])

  if (!skuVariants || groups.length === 0) {
    return null
  }

  return (
    <div className={styles.wrapper} data-fs-pulse-sku-selector>
      {groups.map(([dimension, values]) => {
        const activeValue = skuVariants.activeVariations?.[dimension]
        return (
          <section key={dimension} className={styles.group}>
            <p className={styles.label}>
              <span>{dimension}</span>
              {activeValue && <strong>{activeValue}</strong>}
            </p>
            <div className={styles.options}>
              {values.map((value) => {
                const color = getSkuColorByName(value)
                const isSelected = activeValue === value
                const href = findSlugForOption({ dimension, value, skuVariants })
                const isDisabled = href === "#"

                const style = color
                  ? ({ "--sku-color": color.value } as React.CSSProperties)
                  : undefined

                const content = color ? (
                  <span
                    className={styles.swatch}
                    style={style}
                    aria-hidden="true"
                  />
                ) : (
                  <span className={styles.textOption}>{value}</span>
                )

                if (isDisabled) {
                  return (
                    <span
                      key={value}
                      className={styles.option}
                      data-selected={isSelected ? "true" : "false"}
                      data-disabled="true"
                      data-metallic={color?.isMetallic ? "true" : "false"}
                      aria-disabled="true"
                    >
                      {content}
                    </span>
                  )
                }

                return (
                  <Link
                    key={value}
                    href={href}
                    prefetch={false}
                    className={styles.option}
                    data-selected={isSelected ? "true" : "false"}
                    data-metallic={color?.isMetallic ? "true" : "false"}
                    aria-label={`Seleccionar ${dimension} ${value}`}
                    aria-current={isSelected ? "true" : undefined}
                  >
                    {content}
                  </Link>
                )
              })}
            </div>
          </section>
        )
      })}
    </div>
  )
}

export default PulseSkuSelector
