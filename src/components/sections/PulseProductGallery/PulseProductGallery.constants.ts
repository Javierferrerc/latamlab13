export const SORT_OPTIONS: { value: string; label: string }[] = [
  { value: "score_desc", label: "Relevancia" },
  { value: "price_asc", label: "Precio: menor a mayor" },
  { value: "price_desc", label: "Precio: mayor a menor" },
  { value: "release_desc", label: "Novedades" },
  { value: "orders_desc", label: "Más vendidos" },
  { value: "discount_desc", label: "Mayor descuento" },
]

export const DEFAULTS = {
  filterTitle: "Filtros",
  clearLabel: "Limpiar",
  sortLabel: "Ordenar",
  resultsLabel: "productos",
  mobileFilterLabel: "Filtros",

  columns: 3,
  maxWidth: 1280,
} as const
