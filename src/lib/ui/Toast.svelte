<script lang="ts">
  import type { Snippet } from 'svelte'
  import { fade } from 'svelte/transition'
  import '../styles/Toast.css'
  import type { HTMLAttributes } from 'svelte/elements'
  import { clickOutside } from '../utils.svelte'

  export type ToastVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warn' | 'info'

  export type ToastProps = HTMLAttributes<HTMLDivElement> & {
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
  }: ToastProps = $props()

  let remaining = $state(duration)
  let startTime = $state(0)
  let timer = $state<ReturnType<typeof setTimeout> | null>(null)

  function startTimer() {
    startTime = Date.now()
    timer = setTimeout(() => {
      onClose?.()
    }, remaining)
  }

  function pauseTimer() {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    remaining -= Date.now() - startTime
  }

  function handleMouseenter() {
    pauseTimer()
  }

  function handleMouseleave() {
    startTimer()
  }

  $effect(() => {
    startTimer()
    return () => {
      if (timer) clearTimeout(timer)
    }
  })
</script>

<div
  class="toast"
  style="--variant-color: var(--{variant});"
  transition:fade={{ duration: 150 }}
  role="status"
  aria-live="polite"
  use:clickOutside={() => onClose?.()}
  onmouseenter={handleMouseenter}
  onmouseleave={handleMouseleave}
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
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  </button>
</div>
