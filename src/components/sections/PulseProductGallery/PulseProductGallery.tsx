"use client"

import { Suspense } from "react"
import {
  useSearch,
  toggleFacet,
  removeFacet,
  setFacet,
} from "@faststore/sdk"

import { usePage } from "src/sdk/overrides/PageProvider"
import { useDelayedFacets } from "src/sdk/search/useDelayedFacets"
import { usePriceFormatter } from "src/sdk/product/useFormattedPrice"

import type {
  PulseFacet,
  PulseProductGalleryProps,
  PulseSelectedFacet,
} from "./PulseProductGallery.types"
import { DEFAULTS } from "./PulseProductGallery.constants"
import PulseFilterSidebar from "./PulseFilterSidebar"
import PulseResultsToolbar from "./PulseResultsToolbar"
import PulseGalleryGrid from "./PulseGalleryGrid"
import PulsePagination from "./PulsePagination"
import styles from "./pulse-product-gallery.module.scss"

const ACCENT = "#6D28F5"

/*
 * Decisión técnica - filtros PLP
 * Fecha de revisión: 2026-07-03
 *
 * Decisión tomada:
 * Se reemplaza el filtro desktop nativo de ProductGallery por un sidebar propio
 * (PulseFilterSidebar) dentro de esta sección override, que ya está registrada
 * como `ProductGallery` en src/components/index.tsx. El estado de facetas se
 * maneja con la API de FastStore v4: `useSearch()` + `toggleFacet` / `removeFacet`
 * / `setFacet` desde @faststore/sdk. No se recrea la lógica de búsqueda.
 *
 * Motivo:
 * El diseño Pulse necesita controlar estructura, markup, chips activos, rangos de
 * precio y agrupación visual de las facetas, que el reskin por SCSS del filtro
 * nativo no permite sin ocultamientos frágiles.
 *
 * Alternativa descartada:
 * Mantener el filtro nativo y aplicar solo SCSS sobre selectores data-fs-*.
 *
 * Razón del descarte:
 * El override ya existía en la tienda (PulseProductGallery) y resuelve la selección,
 * limpieza y conteo de facetas mediante el SDK, por lo que el reskin no aplica.
 */
const PulseProductGallery = ({
  filterTitle = DEFAULTS.filterTitle,
  clearLabel = DEFAULTS.clearLabel,
  sortLabel = DEFAULTS.sortLabel,
  resultsLabel = DEFAULTS.resultsLabel,
  columns = DEFAULTS.columns,
  maxWidth = DEFAULTS.maxWidth,
}: PulseProductGalleryProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const context = usePage<any>()
  const data = context?.data
  const facets = (useDelayedFacets(data) ?? []) as unknown as PulseFacet[]
  const formatPrice = usePriceFormatter()

  const { state, setState, itemsPerPage } = useSearch()
  const perPage = itemsPerPage || 12
  const currentPage = state.page ?? 0
  const totalCount = data?.search?.products?.pageInfo?.totalCount ?? 0
  const totalPages = Math.ceil(totalCount / perPage)

  // Active filter chips derived from the facets' selected state.
  const chips: (PulseSelectedFacet & { label: string })[] = []
  for (const f of facets) {
    if (f.__typename === "StoreFacetBoolean") {
      for (const v of f.values) {
        if (v.selected) chips.push({ key: f.key, value: v.value, label: v.label })
      }
    } else if (f.__typename === "StoreFacetRange") {
      const touched =
        f.min.selected !== f.min.absolute || f.max.selected !== f.max.absolute
      if (touched) {
        chips.push({
          key: f.key,
          value: `${f.min.selected}-to-${f.max.selected}`,
          label: `${formatPrice(f.min.selected)} — ${formatPrice(f.max.selected)}`,
        })
      }
    }
  }

  const apply = (selectedFacets: PulseSelectedFacet[]) =>
    setState({ ...state, selectedFacets, page: 0 })

  const onToggle = (facet: PulseSelectedFacet) =>
    apply(toggleFacet(state.selectedFacets, facet))
  const onRemove = (chip: PulseSelectedFacet) =>
    apply(removeFacet(state.selectedFacets, { key: chip.key, value: chip.value }))
  const onClear = () => apply([])
  const onRange = (key: string, min: number, max: number) =>
    apply(setFacet(state.selectedFacets, { key, value: `${min}-to-${max}` }, true))
  const onSort = (sort: string) =>
    setState({ ...state, sort: sort as typeof state.sort, page: 0 })
  const onPage = (p: number) => {
    setState({ ...state, page: p })
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const cssVars = {
    "--pulse-pg-cols": String(columns),
    "--pulse-pg-maxw": `${maxWidth}px`,
  } as React.CSSProperties

  const skeleton = (
    <div className={styles.grid}>
      {Array.from({ length: columns * 2 }).map((_, i) => (
        <div key={i} className={styles.skeletonCard} />
      ))}
    </div>
  )

  const hasSidebar = facets.length > 0

  return (
    <section className={styles.gallery} style={cssVars} data-fs-product-listing>
      <div
        className={`${styles.layout} ${hasSidebar ? "" : styles.layoutFull}`}
      >
        {hasSidebar && (
          <PulseFilterSidebar
            facets={facets}
            title={filterTitle}
            clearLabel={clearLabel}
            hasActive={chips.length > 0}
            onToggle={onToggle}
            onRange={onRange}
            onClear={onClear}
          />
        )}

        <div className={styles.main}>
          <PulseResultsToolbar
            chips={chips}
            onRemove={onRemove}
            totalCount={totalCount}
            resultsLabel={resultsLabel}
            sortValue={state.sort}
            onSort={onSort}
            sortLabel={sortLabel}
          />

          <Suspense fallback={skeleton}>
            <PulseGalleryGrid page={currentPage} accentColor={ACCENT} />
          </Suspense>

          <PulsePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPage={onPage}
          />
        </div>
      </div>
    </section>
  )
}

export default PulseProductGallery
