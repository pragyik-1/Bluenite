function getInitialTheme(): string {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    return prefersDark ? 'dark' : 'light'
}

export const theme = $state({
  value: getInitialTheme()
})

const updateTheme = (value: string): void => {
  if (value === 'light') {
    document.documentElement.classList.add('light')
    document.documentElement.classList.remove('dark')
  } else {
    document.documentElement.classList.remove('light')
    document.documentElement.classList.add('dark')
  }
}

export const toggleTheme = (): void => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  updateTheme(theme.value)
}

updateTheme(theme.value)