"use client"

import Head from "next/head"

import { usePage } from "src/sdk/overrides/PageProvider"

import type { PulseBreadcrumbProps } from "./PulseBreadcrumb.types"
import { DEFAULTS } from "./PulseBreadcrumb.constants"
import styles from "./pulse-breadcrumb.module.scss"

interface Crumb {
  name: string
  url?: string
}

const PulseBreadcrumb = ({
  showComponent = true,
  homeLabel = DEFAULTS.homeLabel,
  homeUrl = DEFAULTS.homeUrl,
  maxWidth = DEFAULTS.maxWidth,
  paddingY = DEFAULTS.paddingY,
  linkColor = DEFAULTS.linkColor,
  currentColor = DEFAULTS.currentColor,
  separatorColor = DEFAULTS.separatorColor,
  bodyFontFamily = DEFAULTS.bodyFontFamily,
}: PulseBreadcrumbProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const context = usePage<any>()
  const data = context?.data
  const list =
    data?.product?.breadcrumbList?.itemListElement ??
    data?.collection?.breadcrumbList?.itemListElement ??
    []

  const crumbs: Crumb[] = Array.isArray(list)
    ? [...list]
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .sort((a: any, b: any) => (a.position ?? 0) - (b.position ?? 0))
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((it: any) => ({ name: it.name, url: it.item }))
    : []

  if (showComponent === false) return null
  if (!crumbs.length) return null

  const cssVars = {
    "--pulse-bc-maxw": `${maxWidth}px`,
    "--pulse-bc-py": `${paddingY}px`,
    "--pulse-bc-link": linkColor,
    "--pulse-bc-current": currentColor,
    "--pulse-bc-sep": separatorColor,
    "--pulse-bc-font": bodyFontFamily,
  } as React.CSSProperties

  return (
    <nav className={styles.breadcrumb} style={cssVars} aria-label="Breadcrumb">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className={styles.inner}>
        <a href={homeUrl} className={styles.link}>
          {homeLabel}
        </a>
        {crumbs.map((c, i) => {
          const isLast = i === crumbs.length - 1
          return (
            <span key={`${c.name}-${i}`}>
              <span className={styles.sep}> / </span>
              {isLast || !c.url ? (
                <span className={styles.current}>{c.name}</span>
              ) : (
                <a href={c.url} className={styles.link}>
                  {c.name}
                </a>
              )}
            </span>
          )
        })}
      </div>
    </nav>
  )
}

export default PulseBreadcrumb
