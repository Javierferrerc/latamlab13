"use client"

import Head from "next/head"

import { usePage } from "src/sdk/overrides/PageProvider"

import type { PulseCategoryHeaderProps } from "./PulseCategoryHeader.types"
import { DEFAULTS } from "./PulseCategoryHeader.constants"
import styles from "./pulse-category-header.module.scss"

interface Crumb {
  name: string
  url?: string
}

const PulseCategoryHeader = ({
  showComponent = true,
  breadcrumbHomeLabel = DEFAULTS.breadcrumbHomeLabel,
  breadcrumbHomeUrl = DEFAULTS.breadcrumbHomeUrl,
  // CMS values are OPTIONAL overrides — by default everything comes from the
  // category / search context.
  category,
  title,
  description,
  height = DEFAULTS.height,
  heightMobile = DEFAULTS.heightMobile,
  gradientStart = DEFAULTS.gradientStart,
  gradientMid = DEFAULTS.gradientMid,
  gradientEnd = DEFAULTS.gradientEnd,
  gradientAngle = DEFAULTS.gradientAngle,
  showGlow = true,
  glowColor = DEFAULTS.glowColor,
  titleColor = DEFAULTS.titleColor,
  breadcrumbColor = DEFAULTS.breadcrumbColor,
  descriptionColor = DEFAULTS.descriptionColor,
  titleFontFamily = DEFAULTS.titleFontFamily,
  bodyFontFamily = DEFAULTS.bodyFontFamily,
}: PulseCategoryHeaderProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const context = usePage<any>()
  const data = context?.data
  const collection = data?.collection
  const searchTerm: string | undefined = data?.searchTerm ?? undefined

  // Breadcrumb items from the collection (PLP); fall back to the search term.
  const collectionCrumbs: Crumb[] = Array.isArray(
    collection?.breadcrumbList?.itemListElement
  )
    ? [...collection.breadcrumbList.itemListElement]
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .sort((a: any, b: any) => (a.position ?? 0) - (b.position ?? 0))
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((it: any) => ({ name: it.name, url: it.item }))
    : []

  // Dynamic values (category page → collection; search → term).
  const lastCrumbName = collectionCrumbs[collectionCrumbs.length - 1]?.name
  const dynamicTitle = collection
    ? (lastCrumbName ?? collection?.seo?.title)
    : searchTerm
  const dynamicDescription: string | undefined = collection?.seo?.description

  // Priority: explicit CMS override → dynamic context → default fallback.
  const finalTitle = title || dynamicTitle || ""
  const finalDescription =
    description || dynamicDescription || DEFAULTS.description

  // Build the breadcrumb trail.
  let crumbs: Crumb[] = []
  if (category) {
    crumbs = [{ name: category }]
  } else if (collectionCrumbs.length) {
    crumbs = collectionCrumbs
  } else if (searchTerm) {
    crumbs = [{ name: searchTerm }]
  } else if (finalTitle) {
    crumbs = [{ name: finalTitle }]
  }

  if (showComponent === false) return null

  const stops = [gradientStart, gradientMid, gradientEnd].filter(Boolean)

  const cssVars = {
    "--pulse-ch-h": `${height}px`,
    "--pulse-ch-h-mobile": `${heightMobile}px`,
    "--pulse-ch-bg": `linear-gradient(${gradientAngle}deg, ${stops.join(", ")})`,
    "--pulse-ch-glow": glowColor,
    "--pulse-ch-title": titleColor,
    "--pulse-ch-breadcrumb": breadcrumbColor,
    "--pulse-ch-description": descriptionColor,
    "--pulse-ch-title-font": titleFontFamily,
    "--pulse-ch-body-font": bodyFontFamily,
  } as React.CSSProperties

  return (
    <section className={styles.header} style={cssVars}>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@400;500;600;700;800&family=Hanken+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      {showGlow && <span className={styles.glow} />}

      <div className={styles.content}>
        {(breadcrumbHomeLabel || crumbs.length > 0) && (
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            {breadcrumbHomeLabel && (
              <a href={breadcrumbHomeUrl ?? "/"} className={styles.crumbLink}>
                {breadcrumbHomeLabel}
              </a>
            )}
            {crumbs.map((c, i) => {
              const isLast = i === crumbs.length - 1
              return (
                <span key={`${c.name}-${i}`}>
                  <span className={styles.sep}> / </span>
                  {isLast || !c.url ? (
                    <span>{c.name}</span>
                  ) : (
                    <a href={c.url} className={styles.crumbLink}>
                      {c.name}
                    </a>
                  )}
                </span>
              )
            })}
          </nav>
        )}
        {finalTitle && <h1 className={styles.title}>{finalTitle}</h1>}
        {finalDescription && (
          <p className={styles.description}>{finalDescription}</p>
        )}
      </div>
    </section>
  )
}

export default PulseCategoryHeader
