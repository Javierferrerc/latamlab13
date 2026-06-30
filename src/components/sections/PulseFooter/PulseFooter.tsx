import Head from "next/head"

import type { PulseFooterProps } from "./PulseFooter.types"
import {
  DEFAULTS,
  DEFAULT_COLUMNS,
  DEFAULT_LEGAL_LINKS,
  DEFAULT_PAYMENT_METHODS,
} from "./PulseFooter.constants"
import styles from "./pulse-footer.module.scss"

const PulseFooter = ({
  showComponent = true,
  brandName = DEFAULTS.brandName,
  description = DEFAULTS.description,
  columns,
  copyright = DEFAULTS.copyright,
  legalLinks,
  paymentMethods,
  maxWidth = DEFAULTS.maxWidth,
  paddingTop = DEFAULTS.paddingTop,
  paddingBottom = DEFAULTS.paddingBottom,
  background = DEFAULTS.background,
  logoColor = DEFAULTS.logoColor,
  descriptionColor = DEFAULTS.descriptionColor,
  columnTitleColor = DEFAULTS.columnTitleColor,
  linkColor = DEFAULTS.linkColor,
  linkHoverColor = DEFAULTS.linkHoverColor,
  legalColor = DEFAULTS.legalColor,
  borderColor = DEFAULTS.borderColor,
  titleFontFamily = DEFAULTS.titleFontFamily,
  bodyFontFamily = DEFAULTS.bodyFontFamily,
}: PulseFooterProps) => {
  if (showComponent === false) return null

  const cols = columns?.length ? columns : DEFAULT_COLUMNS
  const legal = legalLinks?.length ? legalLinks : DEFAULT_LEGAL_LINKS
  const payments = paymentMethods?.length
    ? paymentMethods
    : DEFAULT_PAYMENT_METHODS

  const cssVars = {
    "--pulse-ft-maxw": `${maxWidth}px`,
    "--pulse-ft-pt": `${paddingTop}px`,
    "--pulse-ft-pb": `${paddingBottom}px`,
    "--pulse-ft-cols": String(cols.length),
    "--pulse-ft-bg": background,
    "--pulse-ft-logo": logoColor,
    "--pulse-ft-description": descriptionColor,
    "--pulse-ft-col-title": columnTitleColor,
    "--pulse-ft-link": linkColor,
    "--pulse-ft-link-hover": linkHoverColor,
    "--pulse-ft-legal": legalColor,
    "--pulse-ft-border": borderColor,
    "--pulse-ft-title-font": titleFontFamily,
    "--pulse-ft-body-font": bodyFontFamily,
  } as React.CSSProperties

  return (
    <footer className={styles.footer} style={cssVars}>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@400;500;600;700;800&family=Hanken+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            {brandName && <div className={styles.logo}>{brandName}</div>}
            {description && <p className={styles.description}>{description}</p>}
          </div>

          {cols.map((col, i) => (
            <div key={i} className={styles.column}>
              {col.title && <div className={styles.colTitle}>{col.title}</div>}
              {col.links?.length ? (
                <nav className={styles.links}>
                  {col.links.map((link, j) => (
                    <a key={j} href={link.url ?? "#"} className={styles.link}>
                      {link.label}
                    </a>
                  ))}
                </nav>
              ) : null}
            </div>
          ))}
        </div>

        <div className={styles.bottom}>
          <div className={styles.legal}>
            {copyright && <span>{copyright}</span>}
            {legal.map((link, i) => (
              <a key={i} href={link.url ?? "#"} className={styles.legalLink}>
                {link.label}
              </a>
            ))}
          </div>
          {payments.length > 0 && (
            <div className={styles.payments}>
              {payments.map((p, i) => (
                <span key={i}>{p}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  )
}

export default PulseFooter
