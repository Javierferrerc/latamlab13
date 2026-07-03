"use client"

import { useEffect } from "react"

import { type ColorConfig, setSkuColorConfig } from "./sku-color-store"

export interface SkuOptionColorsProps {
  colors?: ColorConfig[]
}

// Sección invisible: recibe el mapa de colores desde el CMS y lo publica en el
// store cliente para que PulseSkuSelector pueda pintar los swatches.
export default function SkuOptionColors({ colors = [] }: SkuOptionColorsProps) {
  useEffect(() => {
    setSkuColorConfig(colors)
    return () => setSkuColorConfig([])
  }, [colors])

  return null
}
