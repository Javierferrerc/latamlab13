"use client"

import { useState } from "react"
import Head from "next/head"

import { useNewsletter } from "src/sdk/newsletter/useNewsletter"

import type { PulseNewsletterBandProps } from "./PulseNewsletterBand.types"
import { DEFAULTS } from "./PulseNewsletterBand.constants"
import styles from "./pulse-newsletter-band.module.scss"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type NewsletterStatus = "idle" | "loading" | "success" | "error"

type SubscribeResult = {
  subscribeToNewsletter?: {
    id?: string | null
  } | null
}

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
  loadingText = DEFAULTS.loadingText,
  successMessage = DEFAULTS.successMessage,
  errorMessage = DEFAULTS.errorMessage,
  showConsent = DEFAULTS.showConsent,
  consentText = DEFAULTS.consentText,
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
  const { subscribeUser, loading } = useNewsletter()
  const [email, setEmail] = useState("")
  const [accepted, setAccepted] = useState(false)
  const [emailError, setEmailError] = useState("")
  const [status, setStatus] = useState<NewsletterStatus>("idle")

  if (showComponent === false) return null

  const isSubmitting = loading || status === "loading"
  const canSubmit = (!showConsent || accepted) && !isSubmitting

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

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setEmailError("")
    setStatus("idle")

    const normalizedEmail = email.trim()

    if (!EMAIL_RE.test(normalizedEmail)) {
      setEmailError("Ingresá un email válido.")
      return
    }

    if (showConsent && !accepted) {
      setStatus("error")
      return
    }

    setStatus("loading")

    try {
      const result = (await subscribeUser({
        data: { name: "", email: normalizedEmail },
      })) as SubscribeResult | undefined

      if (result?.subscribeToNewsletter?.id) {
        setEmail("")
        setAccepted(false)
        setStatus("success")
        return
      }

      setStatus("error")
    } catch {
      setStatus("error")
    }
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

        {status === "success" ? (
          <p className={styles.success} role="status" aria-live="polite">
            <CheckIcon />
            {successMessage}
          </p>
        ) : (
          <>
            <form className={styles.form} onSubmit={onSubmit} data-filled={hasInput} noValidate>
              <input
                type="email"
                className={styles.input}
                placeholder={placeholder}
                aria-label={placeholder}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setEmailError("")
                  if (status === "error") setStatus("idle")
                }}
                aria-invalid={emailError ? "true" : "false"}
                required
              />
              <button
                type="submit"
                className={styles.button}
                disabled={!canSubmit}
                aria-busy={isSubmitting}
              >
                {isSubmitting ? loadingText : buttonText}
              </button>
            </form>

            {showConsent && (
              <label className={styles.consent}>
                <input
                  type="checkbox"
                  checked={accepted}
                  onChange={(e) => {
                    setAccepted(e.target.checked)
                    if (status === "error") setStatus("idle")
                  }}
                />
                <span>{consentText}</span>
              </label>
            )}

            {emailError && (
              <p className={styles.error} role="alert">
                {emailError}
              </p>
            )}

            {status === "error" && !emailError && (
              <p className={styles.error} role="alert">
                {showConsent && !accepted
                  ? "Debés aceptar para continuar."
                  : errorMessage}
              </p>
            )}
          </>
        )}
      </div>
    </section>
  )
}

export default PulseNewsletterBand
