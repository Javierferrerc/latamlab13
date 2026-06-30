"use client"

import { useState } from "react"
import Head from "next/head"

import type { PulseNewsletterBandProps } from "./PulseNewsletterBand.types"
import { DEFAULTS } from "./PulseNewsletterBand.constants"
import styles from "./pulse-newsletter-band.module.scss"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const CheckIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden
  >
    <path d="m5 12 5 5 9-11" />
  </svg>
)

const PulseNewsletterBand = ({
  showComponent = true,
  title = DEFAULTS.title,
  subtitle = DEFAULTS.subtitle,
  placeholder = DEFAULTS.placeholder,
  buttonText = DEFAULTS.buttonText,
  successMessage = DEFAULTS.successMessage,
  paddingY = DEFAULTS.paddingY,
  maxWidth = DEFAULTS.maxWidth,
  inputMaxWidth = DEFAULTS.inputMaxWidth,
  gradientStart = DEFAULTS.gradientStart,
  gradientEnd = DEFAULTS.gradientEnd,
  gradientAngle = DEFAULTS.gradientAngle,
  titleColor = DEFAULTS.titleColor,
  subtitleColor = DEFAULTS.subtitleColor,
  placeholderColor = DEFAULTS.placeholderColor,
  inputBg = DEFAULTS.inputBg,
  buttonBg = DEFAULTS.buttonBg,
  buttonColor = DEFAULTS.buttonColor,
  accentColor = DEFAULTS.accentColor,
  inputRadius = DEFAULTS.inputRadius,
  buttonRadius = DEFAULTS.buttonRadius,
  titleFontFamily = DEFAULTS.titleFontFamily,
  bodyFontFamily = DEFAULTS.bodyFontFamily,
}: PulseNewsletterBandProps) => {
  const [email, setEmail] = useState("")
  const [done, setDone] = useState(false)

  if (showComponent === false) return null

  const cssVars = {
    "--pulse-nl-py": `${paddingY}px`,
    "--pulse-nl-maxw": `${maxWidth}px`,
    "--pulse-nl-input-maxw": `${inputMaxWidth}px`,
    "--pulse-nl-bg": `linear-gradient(${gradientAngle}deg, ${gradientStart}, ${gradientEnd})`,
    "--pulse-nl-title": titleColor,
    "--pulse-nl-subtitle": subtitleColor,
    "--pulse-nl-placeholder": placeholderColor,
    "--pulse-nl-input-bg": inputBg,
    "--pulse-nl-btn-bg": buttonBg,
    "--pulse-nl-btn-color": buttonColor,
    "--pulse-nl-accent": accentColor,
    "--pulse-nl-input-radius": `${inputRadius}px`,
    "--pulse-nl-btn-radius": `${buttonRadius}px`,
    "--pulse-nl-title-font": titleFontFamily,
    "--pulse-nl-body-font": bodyFontFamily,
  } as React.CSSProperties

  const hasInput = email.trim().length > 0

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!EMAIL_RE.test(email.trim())) return
    // Integration point: send `email` to your newsletter provider here.
    setDone(true)
  }

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
        {title && <h2 className={styles.title}>{title}</h2>}
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}

        {done ? (
          <p className={styles.success}>
            <CheckIcon />
            {successMessage}
          </p>
        ) : (
          <form className={styles.form} onSubmit={onSubmit} data-filled={hasInput}>
            <input
              type="email"
              className={styles.input}
              placeholder={placeholder}
              aria-label={placeholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className={styles.button}>
              {buttonText}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

export default PulseNewsletterBand
