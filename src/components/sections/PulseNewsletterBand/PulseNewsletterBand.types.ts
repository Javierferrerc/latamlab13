export interface PulseNewsletterBandProps {
  showComponent?: boolean

  // Content
  title?: string
  subtitle?: string
  placeholder?: string
  buttonText?: string
  loadingText?: string
  successMessage?: string
  errorMessage?: string

  // Consentimiento (bloquea el submit hasta aceptar)
  showConsent?: boolean
  consentText?: string

  // Layout
  paddingY?: number
  maxWidth?: number
  inputMaxWidth?: number

  // Background
  gradientStart?: string
  gradientEnd?: string
  gradientAngle?: number

  // Style
  titleColor?: string
  subtitleColor?: string
  placeholderColor?: string
  inputBg?: string
  buttonBg?: string
  buttonColor?: string
  accentColor?: string
  inputRadius?: number
  buttonRadius?: number
  titleFontFamily?: string
  bodyFontFamily?: string
}
