"use client"

import Link from "next/link"
import { useMemo } from "react"

import {
  getSkuColorByName,
  useSkuColorConfig,
} from "../SkuOptionColors/sku-color-store"
import styles from "./pulse-sku-selector.module.scss"

// En FastStore cada opción de availableVariations es un objeto
// { alt, label, value, src? } (no un string). Aceptamos ambos por robustez.
type RawOption =
  | string
  | { value?: string; label?: string; src?: string; alt?: string }

type SkuVariants = {
  activeVariations?: Record<string, string>
  availableVariations?: Record<string, RawOption[]>
  slugsMap?: Record<string, string>
}

interface PulseSkuSelectorProps {
  skuVariants?: SkuVariants
}

const optValue = (o: RawOption) =>
  typeof o === "string" ? o : o?.value ?? o?.label ?? ""
const optLabel = (o: RawOption) =>
  typeof o === "string" ? o : o?.label ?? o?.value ?? ""
const optSrc = (o: RawOption) => (typeof o === "string" ? undefined : o?.src)

const normalizeSlug = (slug: string) => {
  if (!slug) return "#"
  const withSlash = slug.startsWith("/") ? slug : `/${slug}`
  return withSlash.endsWith("/p") ? withSlash : `${withSlash}/p`
}

// Resuelve el slug destino tolerando distintos formatos de llave de slugsMap:
// llave directa, combinación completa unida por '--' o '-', y por último un
// match por tokens (cada par dimensión-valor presente en la llave).
const findSlugForOption = (
  dimension: string,
  value: string,
  skuVariants: SkuVariants
) => {
  const slugsMap = skuVariants.slugsMap ?? {}
  const active = skuVariants.activeVariations ?? {}
  const target: Record<string, string> = { ...active, [dimension]: value }
  const pairs = Object.entries(target).map(([d, v]) => `${d}-${v}`)

  const candidates = [
    `${dimension}-${value}`,
    pairs.join("--"),
    pairs.join("-"),
  ]
  for (const key of candidates) {
    if (slugsMap[key]) return normalizeSlug(slugsMap[key])
  }

  const byTokens = Object.entries(slugsMap).find(([key]) =>
    pairs.every((p) => key.includes(p))
  )
  if (byTokens) return normalizeSlug(byTokens[1])

  const byDirect = Object.entries(slugsMap).find(([key]) =>
    key.includes(`${dimension}-${value}`)
  )
  return byDirect ? normalizeSlug(byDirect[1]) : "#"
}

const PulseSkuSelector = ({ skuVariants }: PulseSkuSelectorProps) => {
  useSkuColorConfig()

  const groups = useMemo(() => {
    const available = skuVariants?.availableVariations ?? {}
    return Object.entries(available).filter(
      ([, values]) => Array.isArray(values) && values.length > 0
    )
  }, [skuVariants])

  if (!skuVariants || groups.length === 0) {
    return null
  }

  return (
    <div className={styles.wrapper} data-fs-pulse-sku-selector>
      {groups.map(([dimension, options]) => {
        const activeValue = skuVariants.activeVariations?.[dimension]
        return (
          <section key={dimension} className={styles.group}>
            <p className={styles.label}>
              <span>{dimension}</span>
              {activeValue && <strong>{activeValue}</strong>}
            </p>
            <div className={styles.options}>
              {options.map((option, i) => {
                const value = optValue(option)
                const label = optLabel(option)
                const src = optSrc(option)
                const color =
                  getSkuColorByName(label) || getSkuColorByName(value)
                const isSelected = activeValue === value
                const href = findSlugForOption(dimension, value, skuVariants)
                const isDisabled = href === "#"

                const style = color
                  ? ({ "--sku-color": color.value } as React.CSSProperties)
                  : undefined

                const content = src ? (
                  <img
                    className={styles.imgSwatch}
                    src={src}
                    alt={label}
                    loading="lazy"
                  />
                ) : color ? (
                  <span
                    className={styles.swatch}
                    style={style}
                    aria-hidden="true"
                  />
                ) : (
                  <span className={styles.textOption}>{label}</span>
                )

                if (isDisabled) {
                  return (
                    <span
                      key={`${value}-${i}`}
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
                    key={`${value}-${i}`}
                    href={href}
                    prefetch={false}
                    className={styles.option}
                    data-selected={isSelected ? "true" : "false"}
                    data-metallic={color?.isMetallic ? "true" : "false"}
                    aria-label={`Seleccionar ${dimension} ${label}`}
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
