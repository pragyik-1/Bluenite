export type Theme = 'light' | 'dark'

const isBrowser = typeof window !== 'undefined'
const THEME_STORAGE_KEY = 'bluenite-theme'
const TRANSITION_BLOCKER_ATTRIBUTE = 'data-bluenite-theme-transition'

let transitionBlocker: HTMLStyleElement | null = null
let transitionBlockerTimer: ReturnType<typeof setTimeout> | undefined

function getInitialTheme(): Theme {
  if (!isBrowser) return 'dark'
  try {
    const stored = localStorage?.getItem(THEME_STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') return stored
    if (typeof window.matchMedia === 'function') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
  } catch {
    // Storage and matchMedia can be unavailable in restricted browsing contexts.
  }
  return 'dark'
}

export const theme = $state({
  value: getInitialTheme(),
})

// Chromium can render intermediate colors when theme classes swap while color
// transitions are running. Disable transitions until the new theme is committed.
function startTransitionBlock(): boolean {
  if (!document.head) return false
  if (transitionBlocker && !transitionBlocker.isConnected) {
    transitionBlocker = null
  }
  if (!transitionBlocker) {
    transitionBlocker = document.createElement('style')
    transitionBlocker.setAttribute(TRANSITION_BLOCKER_ATTRIBUTE, '')
    transitionBlocker.textContent = '*, *::before, *::after { transition: none !important; }'
    document.head.appendChild(transitionBlocker)
  }
  if (transitionBlockerTimer !== undefined) {
    clearTimeout(transitionBlockerTimer)
    transitionBlockerTimer = undefined
  }
  return true
}

function endTransitionBlock(): void {
  // Commit the new theme colors before transitions are restored.
  void document.documentElement.offsetHeight
  transitionBlockerTimer = setTimeout(() => {
    transitionBlocker?.remove()
    transitionBlocker = null
    transitionBlockerTimer = undefined
  }, 0)
}

export function applyTheme(value: Theme): void {
  if (!isBrowser) return
  const blocked = startTransitionBlock()
  try {
    if (value === 'light') {
      document.documentElement.classList.add('light')
      document.documentElement.classList.remove('dark')
    } else {
      document.documentElement.classList.remove('light')
      document.documentElement.classList.add('dark')
    }
    theme.value = value
    try {
      localStorage?.setItem(THEME_STORAGE_KEY, value)
    } catch {
      // Persisting the preference is best-effort in restricted contexts.
    }
  } finally {
    if (blocked) endTransitionBlock()
  }
}

export const setTheme = (value: Theme): void => {
  applyTheme(value)
}

export const toggleTheme = (): void => {
  applyTheme(theme.value === 'light' ? 'dark' : 'light')
}

export const initTheme = (): void => {
  applyTheme(theme.value)
}
