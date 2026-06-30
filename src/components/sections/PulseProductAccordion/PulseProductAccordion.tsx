"use client"

import { useState } from "react"
import Head from "next/head"

import { usePage } from "src/sdk/overrides/PageProvider"

import type { PulseProductAccordionProps } from "./PulseProductAccordion.types"
import { DEFAULTS, DEFAULT_ITEMS } from "./PulseProductAccordion.constants"
import styles from "./pulse-product-accordion.module.scss"

const PulseProductAccordion = ({
  showComponent = true,
  items,
  maxWidth = DEFAULTS.maxWidth,
  titleColor = DEFAULTS.titleColor,
  signColor = DEFAULTS.signColor,
  bodyColor = DEFAULTS.bodyColor,
  borderColor = DEFAULTS.borderColor,
  titleFontFamily = DEFAULTS.titleFontFamily,
  bodyFontFamily = DEFAULTS.bodyFontFamily,
}: PulseProductAccordionProps) => {
  const [open, setOpen] = useState(0)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const context = usePage<any>()
  const productDescription: string | undefined =
    context?.data?.product?.description

  if (showComponent === false) return null

  const list = (items?.length ? items : DEFAULT_ITEMS).map((it) => ({
    title: it.title,
    content: it.useProductDescription
      ? productDescription || it.content
      : it.content,
  }))
  const visible = list.filter((it) => it.title && it.content)
  if (!visible.length) return null

  const cssVars = {
    "--pulse-ac-maxw": `${maxWidth}px`,
    "--pulse-ac-title": titleColor,
    "--pulse-ac-sign": signColor,
    "--pulse-ac-body": bodyColor,
    "--pulse-ac-border": borderColor,
    "--pulse-ac-title-font": titleFontFamily,
    "--pulse-ac-body-font": bodyFontFamily,
  } as React.CSSProperties

  return (
    <section className={styles.accordion} style={cssVars}>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@400;500;600;700;800&family=Hanken+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className={styles.inner}>
        {visible.map((it, i) => {
          const isOpen = i === open
          return (
            <div key={i} className={styles.row}>
              <button
                type="button"
                className={styles.header}
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                {it.title}
                <span className={styles.sign}>{isOpen ? "−" : "+"}</span>
              </button>
              {isOpen && <p className={styles.body}>{it.content}</p>}
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default PulseProductAccordion
