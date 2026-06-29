"use client"

import { useEffect, useRef, useState } from "react"
import Head from "next/head"

import type {
  PulseHeroSlide,
  PulseHeroSliderProps,
} from "./PulseHeroSlider.types"
import { DEFAULTS, DEFAULT_SLIDES } from "./PulseHeroSlider.constants"
import styles from "./pulse-hero-slider.module.scss"

const slideBackground = (slide: PulseHeroSlide): React.CSSProperties => {
  if (slide.backgroundType === "image" && slide.backgroundImage?.src) {
    return {
      backgroundImage: `url(${slide.backgroundImage.src})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }
  }
  if (slide.backgroundType === "color") {
    return { background: slide.backgroundColor }
  }
  const angle = slide.gradientAngle ?? DEFAULTS.gradientAngle
  const stops = [slide.gradientStart, slide.gradientMid, slide.gradientEnd].filter(
    Boolean
  )
  return { background: `linear-gradient(${angle}deg, ${stops.join(", ")})` }
}

const PulseHeroSlider = ({
  showComponent = true,
  slides,
  autoplay = true,
  autoplayDelay = DEFAULTS.autoplayDelay,
  pauseOnHover = true,
  showDots = true,
  heightDesktop = DEFAULTS.heightDesktop,
  heightMobile = DEFAULTS.heightMobile,
  eyebrowColor = DEFAULTS.eyebrowColor,
  titleColor = DEFAULTS.titleColor,
  subtitleColor = DEFAULTS.subtitleColor,
  primaryCtaBg = DEFAULTS.primaryCtaBg,
  primaryCtaText = DEFAULTS.primaryCtaText,
  secondaryCtaBorder = DEFAULTS.secondaryCtaBorder,
  secondaryCtaText = DEFAULTS.secondaryCtaText,
  ctaRadius = DEFAULTS.ctaRadius,
  titleFontFamily = DEFAULTS.titleFontFamily,
  bodyFontFamily = DEFAULTS.bodyFontFamily,
}: PulseHeroSliderProps) => {
  const list = slides?.length ? slides : DEFAULT_SLIDES
  const count = list.length
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const touchX = useRef<number | null>(null)

  const goTo = (i: number) => setCurrent(((i % count) + count) % count)

  useEffect(() => {
    if (!autoplay || paused || count < 2) return
    const id = setInterval(() => setCurrent((c) => (c + 1) % count), autoplayDelay)
    return () => clearInterval(id)
  }, [autoplay, paused, autoplayDelay, count])

  if (showComponent === false) return null
  if (!count) return null

  const cssVars = {
    "--pulse-hero-h": `${heightDesktop}px`,
    "--pulse-hero-h-mobile": `${heightMobile}px`,
    "--pulse-hero-eyebrow": eyebrowColor,
    "--pulse-hero-title": titleColor,
    "--pulse-hero-subtitle": subtitleColor,
    "--pulse-hero-cta-bg": primaryCtaBg,
    "--pulse-hero-cta-text": primaryCtaText,
    "--pulse-hero-cta2-border": secondaryCtaBorder,
    "--pulse-hero-cta2-text": secondaryCtaText,
    "--pulse-hero-cta-radius": `${ctaRadius}px`,
    "--pulse-hero-title-font": titleFontFamily,
    "--pulse-hero-body-font": bodyFontFamily,
  } as React.CSSProperties

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    if (Math.abs(dx) > 40) goTo(current + (dx < 0 ? 1 : -1))
    touchX.current = null
  }

  return (
    <section
      className={styles.hero}
      style={cssVars}
      aria-roledescription="carousel"
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@400;500;600;700;800&family=Hanken+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div
        className={styles.track}
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {list.map((slide, i) => (
          <div
            key={i}
            className={styles.slide}
            style={slideBackground(slide)}
            aria-hidden={i !== current}
          >
            {slide.showGlow !== false && <span className={styles.glow} />}
            <div className={styles.content}>
              {slide.eyebrow && <p className={styles.eyebrow}>{slide.eyebrow}</p>}
              {slide.title && <h2 className={styles.title}>{slide.title}</h2>}
              {slide.subtitle && (
                <p className={styles.subtitle}>{slide.subtitle}</p>
              )}
              {(slide.primaryCta?.text || slide.secondaryCta?.text) && (
                <div className={styles.ctas}>
                  {slide.primaryCta?.text && (
                    <a
                      href={slide.primaryCta.url ?? "#"}
                      className={`${styles.cta} ${styles.ctaPrimary}`}
                    >
                      {slide.primaryCta.text}
                    </a>
                  )}
                  {slide.secondaryCta?.text && (
                    <a
                      href={slide.secondaryCta.url ?? "#"}
                      className={`${styles.cta} ${styles.ctaSecondary}`}
                    >
                      {slide.secondaryCta.text}
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {showDots && count > 1 && (
        <div className={styles.dots} role="tablist" aria-label="Slides">
          {list.map((_, i) => (
            <button
              key={i}
              type="button"
              className={styles.dot}
              data-active={i === current ? "true" : "false"}
              aria-label={`Ir al slide ${i + 1}`}
              aria-selected={i === current}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default PulseHeroSlider
