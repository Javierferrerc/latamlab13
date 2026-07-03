"use client"

import { useSyncExternalStore } from "react"

export type ColorConfig = {
  colorName: string
  value: string
  isMetallic?: boolean
}

type Listener = () => void

let colors: ColorConfig[] = []
const listeners = new Set<Listener>()

const normalize = (value: string) => value.trim().toLowerCase()

export const setSkuColorConfig = (nextColors: ColorConfig[] = []) => {
  colors = nextColors.filter(
    (color) => color.colorName?.trim() && color.value?.trim()
  )
  listeners.forEach((listener) => listener())
}

export const getSkuColorByName = (name: string) => {
  const target = normalize(name)
  return colors.find((color) => normalize(color.colorName) === target)
}

const subscribe = (listener: Listener) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

const getSnapshot = () => colors
const getServerSnapshot = () => [] as ColorConfig[]

export const useSkuColorConfig = () =>
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
