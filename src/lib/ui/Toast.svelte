<script lang="ts">
  import type { Snippet } from 'svelte'
  import { fade } from 'svelte/transition'
  import { cn } from '../cn'
  import type { BlueniteProps } from '../types'
  import '../styles/Toast.css'
  import type { HTMLAttributes } from 'svelte/elements'

  export type ToastVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warn' | 'info'

  export type ToastProps = HTMLAttributes<HTMLDivElement> &
    BlueniteProps & {
      message?: string
      description?: string
      variant?: ToastVariant
      duration?: number
      onClose?: () => void
      children?: Snippet
      icon?: Snippet
    }

  let {
    message,
    description,
    variant = 'primary',
    duration = 4000,
    icon,
    onClose,
    children,
    class: _class,
    overrideClasses,
    ...rest
  }: ToastProps = $props()

  let className = $derived(cn(overrideClasses, _class, 'toast', `toast-${variant}`))

  let remaining = $state(0)
  let startTime = 0
  let timer: ReturnType<typeof setTimeout> | null = null

  function clearTimer() {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  function startTimer() {
    clearTimer()
    if (remaining <= 0) return
    startTime = Date.now()
    timer = setTimeout(() => onClose?.(), remaining)
  }

  function pauseTimer() {
    if (!timer) return
    clearTimer()
    remaining = Math.max(0, remaining - (Date.now() - startTime))
  }

  $effect(() => {
    if (duration <= 0) {
      clearTimer()
      remaining = 0
      return
    }
    remaining = duration
    startTimer()
    return clearTimer
  })

  function handlePointerEnter() {
    pauseTimer()
  }

  function handlePointerLeave() {
    startTimer()
  }

  function handleFocusIn() {
    pauseTimer()
  }

  function handleFocusOut(event: FocusEvent) {
    const currentTarget = event.currentTarget as Node | null
    const relatedTarget = event.relatedTarget as Node | null
    if (currentTarget && relatedTarget && currentTarget.contains(relatedTarget)) {
      return
    }
    startTimer()
  }
</script>

<div
  class={className}
  transition:fade={{ duration: 150 }}
  onpointerenter={handlePointerEnter}
  onpointerleave={handlePointerLeave}
  onfocusin={handleFocusIn}
  onfocusout={handleFocusOut}
  {...rest}
>
  {#if icon}
    <div class="toast-icon-wrapper">
      {@render icon()}
    </div>
  {/if}

  <div class="toast-content">
    {#if children}
      {@render children()}
    {:else}
      {#if message}<span class="toast-message">{message}</span>{/if}
      {#if description}<span class="toast-description">{description}</span>{/if}
    {/if}
  </div>

  <button
    type="button"
    class="toast-close"
    onclick={() => onClose?.()}
    aria-label="Dismiss notification"
  >
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  </button>
</div>
