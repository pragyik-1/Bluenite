import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const TRANSITION_BLOCKER = 'style[data-bluenite-theme-transition]'

async function loadThemeModule() {
  vi.resetModules()
  return import('../lib/theme.svelte')
}

beforeEach(() => {
  vi.useFakeTimers()
  localStorage.clear()
  document.documentElement.className = ''
  document.head.querySelectorAll(TRANSITION_BLOCKER).forEach((element) => element.remove())
})

afterEach(() => {
  vi.clearAllTimers()
  vi.useRealTimers()
  document.head.querySelectorAll(TRANSITION_BLOCKER).forEach((element) => element.remove())
})

describe('theme', () => {
  it('applies a theme class and suppresses transitions until the next tick', async () => {
    const { applyTheme, theme } = await loadThemeModule()

    applyTheme('light')

    expect(theme.value).toBe('light')
    expect(document.documentElement.classList.contains('light')).toBe(true)
    expect(document.documentElement.classList.contains('dark')).toBe(false)

    const blocker = document.head.querySelector<HTMLStyleElement>(TRANSITION_BLOCKER)
    expect(blocker).not.toBeNull()
    expect(blocker?.textContent).toContain('transition: none !important')

    vi.runAllTimers()

    expect(document.head.querySelector(TRANSITION_BLOCKER)).toBeNull()
  })

  it('reuses a single transition blocker during rapid theme changes', async () => {
    const { applyTheme } = await loadThemeModule()

    applyTheme('light')
    applyTheme('dark')

    expect(document.head.querySelectorAll(TRANSITION_BLOCKER)).toHaveLength(1)
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(document.documentElement.classList.contains('light')).toBe(false)

    vi.runAllTimers()

    expect(document.head.querySelector(TRANSITION_BLOCKER)).toBeNull()
  })

  it('updates state and localStorage through setTheme', async () => {
    const { setTheme, theme } = await loadThemeModule()

    setTheme('light')

    expect(theme.value).toBe('light')
    expect(document.documentElement.classList.contains('light')).toBe(true)
    expect(localStorage.getItem('bluenite-theme')).toBe('light')
  })

  it('toggles between dark and light', async () => {
    const { setTheme, theme, toggleTheme } = await loadThemeModule()

    setTheme('dark')
    toggleTheme()

    expect(theme.value).toBe('light')
    expect(document.documentElement.classList.contains('light')).toBe(true)
  })

  it('initializes from the stored preference', async () => {
    localStorage.setItem('bluenite-theme', 'light')

    const { initTheme, theme } = await loadThemeModule()
    initTheme()

    expect(theme.value).toBe('light')
    expect(document.documentElement.classList.contains('light')).toBe(true)
  })
})
