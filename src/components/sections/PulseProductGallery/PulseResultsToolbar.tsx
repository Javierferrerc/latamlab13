"use client"

import { useState } from "react"

import { SORT_OPTIONS } from "./PulseProductGallery.constants"
import type { PulseSelectedFacet } from "./PulseProductGallery.types"
import styles from "./pulse-product-gallery.module.scss"

interface ActiveChip extends PulseSelectedFacet {
  label: string
}

interface PulseResultsToolbarProps {
  chips: ActiveChip[]
  onRemove: (chip: PulseSelectedFacet) => void
  totalCount: number
  resultsLabel: string
  sortValue: string
  onSort: (value: string) => void
  sortLabel: string
}

const ChevronIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="m6 9 6 6 6-6" />
  </svg>
)

const CloseIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>
)

const PulseResultsToolbar = ({
  chips,
  onRemove,
  totalCount,
  resultsLabel,
  sortValue,
  onSort,
  sortLabel,
}: PulseResultsToolbarProps) => {
  const [open, setOpen] = useState(false)
  const current =
    SORT_OPTIONS.find((o) => o.value === sortValue)?.label ?? SORT_OPTIONS[0].label

  return (
    <div className={styles.toolbar}>
      <div className={styles.toolbarLeft}>
        {chips.map((chip) => (
          <button
            key={`${chip.key}:${chip.value}`}
            type="button"
            className={styles.chip}
            onClick={() => onRemove(chip)}
            aria-label={`Quitar filtro ${chip.label}`}
          >
            {chip.label}
            <CloseIcon />
          </button>
        ))}
        <span className={styles.count}>
          {totalCount} {resultsLabel}
        </span>
      </div>

      <div className={styles.sortWrap}>
        <button
          type="button"
          className={styles.sortButton}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          {sortLabel}: {current}
          <ChevronIcon />
        </button>
        {open && (
          <>
            <span className={styles.sortBackdrop} onClick={() => setOpen(false)} />
            <ul className={styles.sortMenu} role="listbox">
              {SORT_OPTIONS.map((o) => (
                <li key={o.value}>
                  <button
                    type="button"
                    className={styles.sortOption}
                    data-active={o.value === sortValue}
                    onClick={() => {
                      onSort(o.value)
                      setOpen(false)
                    }}
                  >
                    {o.label}
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  )
}

export default PulseResultsToolbar
