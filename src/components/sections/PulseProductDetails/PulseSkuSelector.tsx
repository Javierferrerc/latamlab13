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
  sizeGuideLabel?: string
  sizeGuideUrl?: string
}

const optValue = (o: RawOption) =>
  typeof o === "string" ? o : o?.value ?? o?.label ?? ""
const optLabel = (o: RawOption) =>
  typeof o === "string" ? o : o?.label ?? o?.value ?? ""
const optSrc = (o: RawOption) => (typeof o === "string" ? undefined : o?.src)

// El label del catálogo suele venir como "Dimensión: valor" (ej "Tamaño: S").
// Para el chip queremos solo el valor.
const cleanLabel = (label: string, dimension: string) => {
  const prefix = `${dimension}:`
  return label.startsWith(prefix) ? label.slice(prefix.length).trim() : label
}

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

const PulseSkuSelector = ({
  skuVariants,
  sizeGuideLabel = "Guía de tallas",
  sizeGuideUrl,
}: PulseSkuSelectorProps) => {
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

        // Un grupo es "swatch" SOLO si tiene color mapeado en el CMS
        // (SkuOptionColors). No usamos `src` para detectarlo: VTEX le pone
        // una imagen de fallback a toda opción (la foto del SKU), así que
        // basarse en `src` haría que la talla se renderice como imágenes.
        // Sin color mapeado => chips de texto (talla).
        const isSwatchGroup = options.some(
          (o) => getSkuColorByName(optLabel(o)) || getSkuColorByName(optValue(o))
        )

        return (
          <section key={dimension} className={styles.group}>
            <div className={styles.labelRow}>
              <p className={styles.label}>
                {dimension}
                {isSwatchGroup && activeValue && (
                  <span className={styles.labelValue}>
                    : {cleanLabel(activeValue, dimension)}
                  </span>
                )}
              </p>
              {!isSwatchGroup && sizeGuideUrl && (
                <a href={sizeGuideUrl} className={styles.sizeGuide}>
                  {sizeGuideLabel}
                </a>
              )}
            </div>

            <div className={isSwatchGroup ? styles.swatchOptions : styles.options}>
              {options.map((option, i) => {
                const value = optValue(option)
                const label = cleanLabel(optLabel(option), dimension)
                const src = optSrc(option)
                const color =
                  getSkuColorByName(optLabel(option)) || getSkuColorByName(value)
                const isSelected = activeValue === value
                const href = findSlugForOption(dimension, value, skuVariants)
                const isDisabled = href === "#"
                const key = `${value}-${i}`

                if (isSwatchGroup) {
                  const swatchClass = `${styles.swatchOption} ${
                    color?.isMetallic ? styles.metallic : ""
                  }`
                  // Preferimos el color del CMS sobre la imagen: el grupo es
                  // swatch porque hubo match de color, así que mostramos el
                  // punto de color; la imagen solo si no hay color mapeado.
                  const inner = color ? (
                    <span
                      className={styles.dot}
                      style={
                        { "--sku-color": color.value } as React.CSSProperties
                      }
                    />
                  ) : src ? (
                    <img
                      className={styles.imgDot}
                      src={src}
                      alt={label}
                      loading="lazy"
                    />
                  ) : (
                    <span className={styles.dot} />
                  )

                  if (isDisabled) {
                    return (
                      <span
                        key={key}
                        className={swatchClass}
                        data-selected={isSelected ? "true" : "false"}
                        data-disabled="true"
                        title={label}
                        aria-disabled="true"
                      >
                        {inner}
                      </span>
                    )
                  }
                  return (
                    <Link
                      key={key}
                      href={href}
                      prefetch={false}
                      className={swatchClass}
                      data-selected={isSelected ? "true" : "false"}
                      title={label}
                      aria-label={`Seleccionar ${dimension} ${label}`}
                      aria-current={isSelected ? "true" : undefined}
                    >
                      {inner}
                    </Link>
                  )
                }

                // Chip de texto (talla)
                if (isDisabled) {
                  return (
                    <span
                      key={key}
                      className={styles.chip}
                      data-selected={isSelected ? "true" : "false"}
                      data-disabled="true"
                      aria-disabled="true"
                    >
                      {label}
                    </span>
                  )
                }
                return (
                  <Link
                    key={key}
                    href={href}
                    prefetch={false}
                    className={styles.chip}
                    data-selected={isSelected ? "true" : "false"}
                    aria-label={`Seleccionar ${dimension} ${label}`}
                    aria-current={isSelected ? "true" : undefined}
                  >
                    {label}
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
