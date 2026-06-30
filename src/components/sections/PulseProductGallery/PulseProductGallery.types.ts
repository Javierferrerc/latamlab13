// Facet shapes (subset of FastStore's Filter_Facets fragment we consume)
export interface PulseFacetValueBoolean {
  label: string
  value: string
  selected: boolean
  quantity: number | null
}

export interface PulseFacetBoolean {
  __typename: "StoreFacetBoolean"
  key: string
  label: string
  values: PulseFacetValueBoolean[]
}

export interface PulseFacetRange {
  __typename: "StoreFacetRange"
  key: string
  label: string
  min: { selected: number; absolute: number }
  max: { selected: number; absolute: number }
}

export type PulseFacet = PulseFacetBoolean | PulseFacetRange

export interface PulseSelectedFacet {
  key: string
  value: string
}

export interface PulseProductGalleryProps {
  // Coming from the native ProductGallery CMS schema (optional, with defaults)
  title?: string
  filterTitle?: string
  clearLabel?: string
  sortLabel?: string
  resultsLabel?: string
  mobileFilterLabel?: string

  // Layout
  columns?: number
  maxWidth?: number
}
