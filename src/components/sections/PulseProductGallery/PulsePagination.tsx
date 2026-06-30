import styles from "./pulse-product-gallery.module.scss"

interface PulsePaginationProps {
  currentPage: number // 0-indexed
  totalPages: number
  onPage: (page: number) => void
}

const ChevronRight = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="m9 6 6 6-6 6" />
  </svg>
)

const ChevronLeft = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="m15 6-6 6 6 6" />
  </svg>
)

// Returns 1-indexed page numbers and ellipsis markers (-1).
const buildPages = (current: number, total: number): number[] => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const pages = new Set<number>([1, total, current, current - 1, current + 1])
  const sorted = Array.from(pages)
    .filter((p) => p >= 1 && p <= total)
    .sort((a, b) => a - b)
  const out: number[] = []
  let prev = 0
  for (const p of sorted) {
    if (p - prev > 1) out.push(-1)
    out.push(p)
    prev = p
  }
  return out
}

const PulsePagination = ({ currentPage, totalPages, onPage }: PulsePaginationProps) => {
  if (totalPages <= 1) return null

  const current = currentPage + 1 // 1-indexed
  const pages = buildPages(current, totalPages)

  return (
    <nav className={styles.pagination} aria-label="Paginación">
      {current > 1 && (
        <button
          type="button"
          className={styles.pageBtn}
          onClick={() => onPage(currentPage - 1)}
          aria-label="Página anterior"
        >
          <ChevronLeft />
        </button>
      )}

      {pages.map((p, i) =>
        p === -1 ? (
          <span key={`gap-${i}`} className={styles.ellipsis}>
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            className={styles.pageBtn}
            data-active={p === current}
            aria-current={p === current ? "page" : undefined}
            onClick={() => onPage(p - 1)}
          >
            {p}
          </button>
        )
      )}

      {current < totalPages && (
        <button
          type="button"
          className={styles.pageBtn}
          onClick={() => onPage(currentPage + 1)}
          aria-label="Página siguiente"
        >
          <ChevronRight />
        </button>
      )}
    </nav>
  )
}

export default PulsePagination
