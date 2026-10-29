import type { ActionReturn } from 'svelte/action'
import { computePosition, flip, shift, offset, autoUpdate, size, type Placement } from '@floating-ui/dom'
import type { FloatingOptions } from './types'

export function clickOutside(node: HTMLElement, handler: (e?: Event) => void): ActionReturn {
  const handleClick = (event: MouseEvent): void => {
    if (node && !node.contains(event.target as Node)) {
      handler()
    }
  }

  document.addEventListener('click', handleClick, true)

  return {
    destroy() {
      document.removeEventListener('click', handleClick, true)
    },
  }
}

export type AnchorOptions = FloatingOptions & {
  anchorElement: HTMLElement | null
  placement?: Placement
  matchAnchorWidth?: boolean
}

export function floatingAnchor(
  node: HTMLElement,
  options: AnchorOptions,
): ActionReturn<AnchorOptions> {
  let cleanup: (() => void) | null = null

  function buildMiddleware() {
    const middleware = [
      offset(options.offsetDistance ?? 8),
      flip({
        padding: options.flipPadding ?? 0,
        fallbackPlacements: options.flipFallbackPlacements,
      }),
      shift({
        padding: options.shiftPadding ?? 8,
        crossAxis: options.shiftCrossAxis ?? true,
      }),
    ]

    if (options.matchAnchorWidth !== false) {
      middleware.push(
        size({
          padding: options.sizePadding ?? 0,
          apply({ rects, availableWidth }) {
            Object.assign(node.style, {
              width: `${Math.min(rects.reference.width, availableWidth)}px`,
              boxSizing: 'border-box',
            })
          },
        }),
      )
    }

    return middleware
  }

  function updatePosition() {
    if (!options.anchorElement || !node) return

    computePosition(options.anchorElement, node, {
      placement: options.placement ?? 'bottom-start',
      strategy: options.strategy ?? 'absolute',
      middleware: buildMiddleware(),
    }).then(({ x, y, strategy }) => {
      Object.assign(node.style, {
        left: `${x}px`,
        top: `${y}px`,
        position: strategy,
      })
    })
  }

  function setup() {
    if (cleanup) cleanup()
    if (options.anchorElement) {
      cleanup = autoUpdate(options.anchorElement, node, updatePosition)
    }
  }

  setup()

  return {
    update(newOptions) {
      options = newOptions
      setup()
    },
    destroy() {
      if (cleanup) cleanup()
    },
  }
}