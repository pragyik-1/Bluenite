import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { toast } from '../lib/toast.svelte'

const DEFAULT_OPTIONS = {
  variant: 'primary' as const,
  duration: 4000,
  position: 'bottom-right' as const,
}

beforeEach(() => {
  let nextId = 0
  vi.stubGlobal('crypto', {
    randomUUID: () => `toast-${++nextId}`,
  })
  toast.clear()
  toast.configure(DEFAULT_OPTIONS)
})

afterEach(() => {
  vi.unstubAllGlobals()
  toast.clear()
})

describe('toast', () => {
  it('shows a toast with the configured defaults', () => {
    const id = toast.show({ message: 'Saved' })

    expect(id).toBe('toast-1')
    expect(toast.all).toHaveLength(1)
    expect(toast.all[0]).toMatchObject({
      id,
      message: 'Saved',
      ...DEFAULT_OPTIONS,
    })
  })

  it('uses updated defaults for new toasts', () => {
    toast.configure({ position: 'top-center', duration: 1000 })

    toast.show({ message: 'Saved' })

    expect(toast.all[0]).toMatchObject({
      position: 'top-center',
      duration: 1000,
    })
  })

  it('allows per-toast overrides', () => {
    toast.show({
      message: 'Failed',
      variant: 'danger',
      duration: 500,
      position: 'bottom-left',
    })

    expect(toast.all[0]).toMatchObject({
      variant: 'danger',
      duration: 500,
      position: 'bottom-left',
    })
  })

  it('dismisses a single toast', () => {
    const first = toast.show({ message: 'First' })
    toast.show({ message: 'Second' })

    toast.dismiss(first)

    expect(toast.all).toHaveLength(1)
    expect(toast.all[0].message).toBe('Second')
  })

  it('clears all toasts', () => {
    toast.show({ message: 'First' })
    toast.show({ message: 'Second' })

    toast.clear()

    expect(toast.all).toHaveLength(0)
  })
})
