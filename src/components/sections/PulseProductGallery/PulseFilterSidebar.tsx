"use client"

import { useState } from "react"
import { usePriceFormatter } from "src/sdk/product/useFormattedPrice"

import type { PulseFacet } from "./PulseProductGallery.types"
import styles from "./pulse-product-gallery.module.scss"

interface PulseFilterSidebarProps {
  facets: PulseFacet[]
  title: string
  clearLabel: string
  hasActive: boolean
  onToggle: (facet: { key: string; value: string }) => void
  onRange: (key: string, min: number, max: number) => void
  onClear: () => void
}

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" aria-hidden>
    <path d="m5 12 5 5 9-11" />
  </svg>
)

const PulseFilterSidebar = ({
  facets,
  title,
  clearLabel,
  hasActive,
  onToggle,
  onRange,
  onClear,
}: PulseFilterSidebarProps) => {
  const formatPrice = usePriceFormatter()
  const [ranges, setRanges] = useState<Record<string, { min: number; max: number }>>({})

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <div className={styles.sidebarTitle}>{title}</div>
        {hasActive && (
          <button type="button" className={styles.clear} onClick={onClear}>
            {clearLabel}
          </button>
        )}
      </div>

      {facets.map((facet) => {
        if (facet.__typename === "StoreFacetRange") {
          const local = ranges[facet.key] ?? {
            min: facet.min.selected || facet.min.absolute,
            max: facet.max.selected || facet.max.absolute,
          }
          const setLocal = (next: { min: number; max: number }) =>
            setRanges((r) => ({ ...r, [facet.key]: next }))

          return (
            <div key={facet.key} className={styles.block}>
              <div className={styles.blockTitle}>{facet.label}</div>
              <div className={styles.rangeInputs}>
                <input
                  type="number"
                  className={styles.rangeInput}
                  value={local.min}
                  min={facet.min.absolute}
                  max={facet.max.absolute}
                  onChange={(e) =>
                    setLocal({ ...local, min: Number(e.target.value) })
                  }
                  onBlur={() => onRange(facet.key, local.min, local.max)}
                  aria-label={`${facet.label} mínimo`}
                />
                <span className={styles.rangeSep}>—</span>
                <input
                  type="number"
                  className={styles.rangeInput}
                  value={local.max}
                  min={facet.min.absolute}
                  max={facet.max.absolute}
                  onChange={(e) =>
                    setLocal({ ...local, max: Number(e.target.value) })
                  }
                  onBlur={() => onRange(facet.key, local.min, local.max)}
                  aria-label={`${facet.label} máximo`}
                />
              </div>
              <div className={styles.rangeLabels}>
                <span>{formatPrice(facet.min.absolute)}</span>
                <span>{formatPrice(facet.max.absolute)}</span>
              </div>
            </div>
          )
        }

        return (
          <div key={facet.key} className={styles.block}>
            <div className={styles.blockTitle}>{facet.label}</div>
            <div className={styles.options}>
              {facet.values.map((value) => (
                <label key={value.value} className={styles.option}>
                  <input
                    type="checkbox"
                    className={styles.checkboxInput}
                    checked={value.selected}
                    onChange={() => onToggle({ key: facet.key, value: value.value })}
                  />
                  <span
                    className={styles.checkbox}
                    data-on={value.selected}
                    aria-hidden
                  >
                    {value.selected && <CheckIcon />}
                  </span>
                  {value.label}
                  {value.quantity != null && (
                    <span className={styles.optionCount}>{value.quantity}</span>
                  )}
                </label>
              ))}
            </div>
          </div>
        )
      })}
    </aside>
  )
}

export default PulseFilterSidebar
