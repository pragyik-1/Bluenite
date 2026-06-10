import type { Snippet } from 'svelte'

export type ToastVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warn' | 'info'

export type ToastItem = {
  id: string
  message?: string
  description?: string
  variant?: ToastVariant
  duration?: number
  children?: Snippet
}

let toasts = $state<ToastItem[]>([])

export const toast = {
  get all() {
    return toasts
  },
  show(toast: Omit<ToastItem, 'id'>) {
    const id = crypto.randomUUID()
    toasts.push({ ...toast, id })
    return id
  },

  dismiss(id: string) {
    toasts = toasts.filter((t) => t.id !== id)
  }
}