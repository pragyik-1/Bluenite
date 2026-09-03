const isBrowser = typeof window !== 'undefined'

function getInitialTheme(): string {
  if (!isBrowser) return 'dark'
  const stored = localStorage.getItem('bluenite-theme')
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyTheme(value: string): void {
  if (!isBrowser) return
  if (value === 'light') {
    document.documentElement.classList.add('light')
    document.documentElement.classList.remove('dark')
  } else {
    document.documentElement.classList.remove('light')
    document.documentElement.classList.add('dark')
  }
  localStorage.setItem('bluenite-theme', value)
}

export const theme = $state({
  value: getInitialTheme()
})

export const toggleTheme = (): void => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  applyTheme(theme.value)
}

applyTheme(theme.value)
