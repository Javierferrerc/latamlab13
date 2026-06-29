"use client"

import { Fragment, useEffect, useState } from "react"
import Head from "next/head"

import type {
  PulseAnnouncement,
  PulseAnnouncementBarProps,
} from "./PulseAnnouncementBar.types"
import { DEFAULTS, DEFAULT_MESSAGES } from "./PulseAnnouncementBar.constants"
import styles from "./pulse-announcement-bar.module.scss"

const Message = ({ msg }: { msg: PulseAnnouncement }) =>
  msg.url ? (
    <a href={msg.url} className={styles.link}>
      {msg.text}
    </a>
  ) : (
    <span>{msg.text}</span>
  )

const PulseAnnouncementBar = ({
  showComponent = true,
  messages,
  separator = DEFAULTS.separator,
  rotate = false,
  rotateInterval = DEFAULTS.rotateInterval,
  sticky = false,
  background = DEFAULTS.background,
  textColor = DEFAULTS.textColor,
  fontFamily = DEFAULTS.fontFamily,
  fontSize = DEFAULTS.fontSize,
  fontSizeMobile = DEFAULTS.fontSizeMobile,
  fontWeight = DEFAULTS.fontWeight,
  letterSpacing = DEFAULTS.letterSpacing,
  paddingY = DEFAULTS.paddingY,
}: PulseAnnouncementBarProps) => {
  const list = messages?.length ? messages : DEFAULT_MESSAGES
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!rotate || list.length < 2) return
    const id = setInterval(
      () => setIndex((i) => (i + 1) % list.length),
      rotateInterval
    )
    return () => clearInterval(id)
  }, [rotate, rotateInterval, list.length])

  if (showComponent === false) return null
  if (!list.length) return null

  const cssVars = {
    "--pulse-ann-bg": background,
    "--pulse-ann-color": textColor,
    "--pulse-ann-font": fontFamily,
    "--pulse-ann-size": fontSize,
    "--pulse-ann-size-mobile": fontSizeMobile,
    "--pulse-ann-weight": fontWeight,
    "--pulse-ann-spacing": letterSpacing,
    "--pulse-ann-pad-y": `${paddingY}px`,
  } as React.CSSProperties

  return (
    <div className={styles.bar} style={cssVars} data-sticky={sticky ? "true" : "false"}>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className={styles.inner}>
        {rotate ? (
          <Message msg={list[index % list.length]} />
        ) : (
          list.map((msg, i) => (
            <Fragment key={i}>
              {i > 0 && <span className={styles.sep}>{separator}</span>}
              <Message msg={msg} />
            </Fragment>
          ))
        )}
      </div>
    </div>
  )
}

export default PulseAnnouncementBar
