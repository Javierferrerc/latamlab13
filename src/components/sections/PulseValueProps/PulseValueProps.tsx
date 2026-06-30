import Head from "next/head"

import type {
  PulseValueIcon,
  PulseValueItem,
  PulseValuePropsProps,
} from "./PulseValueProps.types"
import { DEFAULTS, DEFAULT_ITEMS } from "./PulseValueProps.constants"
import styles from "./pulse-value-props.module.scss"

const ICON_PATHS: Record<PulseValueIcon, React.ReactNode> = {
  shipping: (
    <>
      <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z" />
      <circle cx="7" cy="18" r="2" />
      <circle cx="17" cy="18" r="2" />
    </>
  ),
  returns: <path d="M21 12a9 9 0 1 1-3-6.7M21 4v4h-4" />,
  secure: (
    <>
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </>
  ),
  support: (
    <>
      <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
      <rect x="2" y="14" width="4" height="6" rx="1.5" />
      <rect x="18" y="14" width="4" height="6" rx="1.5" />
    </>
  ),
  quality: (
    <>
      <circle cx="12" cy="9" r="6" />
      <path d="M9 14l-1 7 3-1.6L14 20l-1-6" />
    </>
  ),
  payment: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
    </>
  ),
}

const ValueIcon = ({ icon }: { icon: PulseValueIcon }) => (
  <svg
    className={styles.icon}
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden
  >
    {ICON_PATHS[icon]}
  </svg>
)

const PulseValueProps = ({
  showComponent = true,
  items,
  columns = DEFAULTS.columns,
  gap = DEFAULTS.gap,
  paddingY = DEFAULTS.paddingY,
  maxWidth = DEFAULTS.maxWidth,
  showBorder = true,
  iconColor = DEFAULTS.iconColor,
  titleColor = DEFAULTS.titleColor,
  subtitleColor = DEFAULTS.subtitleColor,
  borderColor = DEFAULTS.borderColor,
  sectionBackground = DEFAULTS.sectionBackground,
  titleFontFamily = DEFAULTS.titleFontFamily,
  bodyFontFamily = DEFAULTS.bodyFontFamily,
}: PulseValuePropsProps) => {
  if (showComponent === false) return null

  const list = items?.length ? items : DEFAULT_ITEMS
  if (!list.length) return null

  const cssVars = {
    "--pulse-vp-cols": String(columns),
    "--pulse-vp-gap": `${gap}px`,
    "--pulse-vp-py": `${paddingY}px`,
    "--pulse-vp-maxw": `${maxWidth}px`,
    "--pulse-vp-icon": iconColor,
    "--pulse-vp-title": titleColor,
    "--pulse-vp-subtitle": subtitleColor,
    "--pulse-vp-border": showBorder ? borderColor : "transparent",
    "--pulse-vp-bg": sectionBackground,
    "--pulse-vp-title-font": titleFontFamily,
    "--pulse-vp-body-font": bodyFontFamily,
  } as React.CSSProperties

  const renderItem = (item: PulseValueItem) => (
    <>
      <ValueIcon icon={item.icon ?? "shipping"} />
      <div className={styles.text}>
        {item.title && <div className={styles.title}>{item.title}</div>}
        {item.subtitle && <div className={styles.subtitle}>{item.subtitle}</div>}
      </div>
    </>
  )

  return (
    <section className={styles.section} style={cssVars}>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@400;500;600;700;800&family=Hanken+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className={styles.inner}>
        {list.map((item, i) =>
          item.url ? (
            <a key={i} href={item.url} className={styles.item}>
              {renderItem(item)}
            </a>
          ) : (
            <div key={i} className={styles.item}>
              {renderItem(item)}
            </div>
          )
        )}
      </div>
    </section>
  )
}

export default PulseValueProps
