import type { Snippet } from 'svelte'

export type ToastVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warn' | 'info'
export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'

export type ToastItem = {
  id: string
  message?: string
  description?: string
  variant?: ToastVariant
  duration?: number
  position?: ToastPosition
  children?: Snippet
  icon?: Snippet
}

export interface ToastOptions {
  variant?: ToastVariant
  duration?: number
  position?: ToastPosition
}

class Toast {
  toasts = $state<ToastItem[]>([])
  defaults: ToastOptions = {
    variant: 'primary',
    duration: 4000,
    position: 'bottom-right',
  }

  get all() {
    return this.toasts
  }

  configure(options: ToastOptions) {
    this.defaults = { ...this.defaults, ...options }
    return this
  }

  show(toast: Omit<ToastItem, 'id'>) {
    const id = crypto.randomUUID()
    this.toasts.push({
      ...this.defaults,
      ...toast,
      id,
    })
    return id
  }

  dismiss(id: string) {
    this.toasts = this.toasts.filter((t) => t.id !== id)
  }

  clear() {
    this.toasts = []
  }
}

export const toast = new Toast()
export { Toast }
export type { Toast as ToastClass }
