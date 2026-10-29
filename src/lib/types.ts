import type { Placement } from "@floating-ui/dom"

export type BlueniteProps = {
  overrideClasses?: boolean
}

export type FloatingOptions = {
  offsetDistance?: number
  shiftPadding?: number
  shiftCrossAxis?: boolean
  flipPadding?: number
  flipFallbackPlacements?: Placement[]
  sizePadding?: number
  strategy?: 'absolute' | 'fixed'
}