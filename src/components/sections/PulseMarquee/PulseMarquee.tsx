import Head from "next/head"

import type { PulseMarqueeProps } from "./PulseMarquee.types"
import { DEFAULTS, DEFAULT_ITEMS } from "./PulseMarquee.constants"
import styles from "./pulse-marquee.module.scss"

const PulseMarquee = ({
  showComponent = true,
  items,
  speed = DEFAULTS.speed,
  pauseOnHover = true,
  reverse = false,
  gap = DEFAULTS.gap,
  paddingY = DEFAULTS.paddingY,
  separator = DEFAULTS.separator,
  uppercase = true,
  fontSize = DEFAULTS.fontSize,
  textColor = DEFAULTS.textColor,
  separatorColor = DEFAULTS.separatorColor,
  background = DEFAULTS.background,
  borderColor = DEFAULTS.borderColor,
  titleFontFamily = DEFAULTS.titleFontFamily,
}: PulseMarqueeProps) => {
  if (showComponent === false) return null

  const list = items?.length ? items : DEFAULT_ITEMS
  if (!list.length) return null

  const cssVars = {
    "--pulse-mq-speed": `${speed}s`,
    "--pulse-mq-gap": `${gap}px`,
    "--pulse-mq-py": `${paddingY}px`,
    "--pulse-mq-size": `${fontSize}px`,
    "--pulse-mq-text": textColor,
    "--pulse-mq-sep": separatorColor,
    "--pulse-mq-bg": background,
    "--pulse-mq-border": borderColor,
    "--pulse-mq-font": titleFontFamily,
    "--pulse-mq-direction": reverse ? "reverse" : "normal",
    "--pulse-mq-transform": uppercase ? "uppercase" : "none",
  } as React.CSSProperties

  // Render the sequence twice so the -50% loop is seamless.
  const sequence = (
    <span className={styles.group} style={{ gap: `${gap}px`, paddingRight: `${gap}px` }}>
      {list.map((item, i) => (
        <span key={i} className={styles.item}>
          <span>{item}</span>
          <span className={styles.separator} aria-hidden>
            {separator}
          </span>
        </span>
      ))}
    </span>
  )

  return (
    <section
      className={styles.marquee}
      style={cssVars}
      data-pause-on-hover={pauseOnHover ? "true" : "false"}
      aria-label={list.join(` ${separator} `)}
    >
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@400;500;600;700;800&family=Hanken+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className={styles.track} aria-hidden>
        {sequence}
        {sequence}
      </div>
    </section>
  )
}

export default PulseMarquee
