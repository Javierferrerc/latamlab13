"use client"

import { useEffect, useState } from "react"

import styles from "./pulse-scroll-to-top.module.scss"

interface PulseScrollToTopProps {
  // Native ScrollToTopButton CMS props (optional override)
  text?: string
  // Pulse extras (defaults are sensible; not required from the CMS)
  threshold?: number
  position?: "right" | "left"
}

const ChevronUp = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    aria-hidden
  >
    <path d="m6 15 6-6 6 6" />
  </svg>
)

const PulseScrollToTop = ({
  text,
  threshold = 400,
  position = "right",
}: PulseScrollToTopProps) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > threshold)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [threshold])

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" })

  return (
    <button
      type="button"
      className={styles.button}
      data-visible={visible}
      data-position={position}
      data-has-label={Boolean(text)}
      onClick={scrollToTop}
      aria-label={text || "Volver arriba"}
    >
      <ChevronUp />
      {text && <span className={styles.label}>{text}</span>}
    </button>
  )
}

export default PulseScrollToTop
