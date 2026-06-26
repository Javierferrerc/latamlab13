import { BannerTextSection, getOverriddenSection } from "@faststore/core"
import { BannerTextContent } from "@faststore/ui"
import type { ComponentProps } from "react"

import styles from "./custom-banner-text.module.scss"

/**
 * Override del slot `BannerTextContent`.
 *
 * En FastStore 4.3 este slot recibe el contenido nativo (title, caption, link,
 * linkText) por PROPS, no por `children` — el slot se invoca self-closing en
 * BannerText.tsx. Para conservar el título/subtítulo/CTA originales se renderiza
 * el badge propio encima del `BannerTextContent` nativo, pasándole las props.
 */
const CustomBannerTextContent = (
  props: ComponentProps<typeof BannerTextContent>
) => (
  <>
    <div className={styles.badgeWrapper}>
      <div className={styles.badge}>
        <span className={styles.badgeIcon}>🔥</span>
        <span className={styles.badgeText}>Oferta especial · Solo por hoy</span>
      </div>
    </div>

    <BannerTextContent {...props} />
  </>
)

const CustomBannerText = getOverriddenSection({
  Section: BannerTextSection,
  components: {
    BannerTextContent: { Component: CustomBannerTextContent },
  },
})

export default CustomBannerText
