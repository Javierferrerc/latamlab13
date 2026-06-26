"use client"

import { useState, useEffect } from "react"

import styles from "./countdown-bar.module.scss"

interface CountdownBarProps {
  endDate?: string
  label?: string
  ctaLabel?: string
  ctaUrl?: string
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function getTimeLeft(endDate: string): TimeLeft {
  const diff = new Date(endDate).getTime() - Date.now()

  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

function pad(n: number): string {
  return String(n).padStart(2, "0")
}

function CountdownBar({
  endDate = "2026-12-01T00:00:00",
  label = "🔥 Cyber — termina en:",
  ctaLabel = "Ver ofertas",
  ctaUrl = "#",
}: CountdownBarProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getTimeLeft(endDate))
  const isExpired =
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(endDate))
    }, 1000)

    return () => clearInterval(interval)
  }, [endDate])

  if (isExpired) {
    return (
      <div className={styles.bar}>
        <span className={styles.expired}>¡La promoción ha terminado!</span>
      </div>
    )
  }

  return (
    <div className={styles.bar}>
      <span className={styles.label}>{label}</span>

      <div className={styles.timer}>
        <span className={styles.unit}>
          <span className={styles.number}>{pad(timeLeft.days)}</span>
          <span className={styles.unitLabel}>d</span>
        </span>
        <span className={styles.separator}>:</span>
        <span className={styles.unit}>
          <span className={styles.number}>{pad(timeLeft.hours)}</span>
          <span className={styles.unitLabel}>h</span>
        </span>
        <span className={styles.separator}>:</span>
        <span className={styles.unit}>
          <span className={styles.number}>{pad(timeLeft.minutes)}</span>
          <span className={styles.unitLabel}>m</span>
        </span>
        <span className={styles.separator}>:</span>
        <span className={styles.unit}>
          <span className={styles.number}>{pad(timeLeft.seconds)}</span>
          <span className={styles.unitLabel}>s</span>
        </span>
      </div>

      {ctaUrl && ctaLabel && (
        <a href={ctaUrl} className={styles.cta}>
          {ctaLabel} →
        </a>
      )}
    </div>
  )
}

export default CountdownBar
