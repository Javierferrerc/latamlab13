import type { PulseEspaciadorProps } from "./PulseEspaciador.types"
import { DEFAULTS } from "./PulseEspaciador.constants"
import styles from "./pulse-espaciador.module.scss"

const PulseEspaciador = ({
  showComponent = true,
  heightDesktop = DEFAULTS.heightDesktop,
  heightMobile = DEFAULTS.heightMobile,
  background = DEFAULTS.background,
  showDivider = DEFAULTS.showDivider,
  dividerColor = DEFAULTS.dividerColor,
  dividerWidth = DEFAULTS.dividerWidth,
  maxWidth = DEFAULTS.maxWidth,
}: PulseEspaciadorProps) => {
  if (showComponent === false) return null

  const cssVars = {
    "--pulse-sp-h": `${heightDesktop}px`,
    "--pulse-sp-h-mobile": `${heightMobile}px`,
    "--pulse-sp-bg": background,
    "--pulse-sp-divider": dividerColor,
    "--pulse-sp-divider-w": `${dividerWidth}px`,
    "--pulse-sp-maxw": `${maxWidth}px`,
  } as React.CSSProperties

  return (
    <div className={styles.spacer} style={cssVars} aria-hidden>
      {showDivider && (
        <div className={styles.dividerWrap}>
          <hr className={styles.divider} />
        </div>
      )}
    </div>
  )
}

export default PulseEspaciador
