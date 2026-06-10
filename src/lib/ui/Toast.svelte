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

  $effect(() => {
    const timer = setTimeout(() => {
      onClose?.()
    }, duration)
    return () => clearTimeout(timer)
  })
</script>

<div
  class="toast"
  style="--variant-color: var(--{variant});"
  transition:fade={{ duration: 150 }}
  role="alert"
  use:clickOutside={() => onClose?.()}
>
  {#if icon}
    <div class="snackbar-icon-wrapper">
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
</div>
