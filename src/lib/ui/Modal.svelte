<script lang="ts">
  import Card from './Card.svelte'
  import type { CardProps } from './Card.svelte'
  import { cn } from '../cn'
  import '../styles/Modal.css'
  import { fade } from 'svelte/transition'
  import { tick } from 'svelte'

  export type ModalProps = CardProps & {
    open?: boolean
    onClose?: () => void
    title?: string
    size?: 'sm' | 'md' | 'lg'
    closeOnInsideClick: boolean
    closeOnBackdropClick: boolean
  }

  let {
    open = $bindable(false),
    onClose = () => (open = false),
    children,
    title,
    size = 'md',
    closeOnInsideClick = false,
    closeOnBackdropClick = true,
    class: _class,
    overrideClasses,
    ...rest
  }: ModalProps = $props()

  let modalClassName = $derived(
    cn(overrideClasses, _class, 'card-container-modal', `modal-${size}`),
  )
  let modalNode = $state<HTMLElement | null>(null)
  let previousFocus = $state<HTMLElement | null>(null)

  const FOCUSABLE =
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

  function handleGlobalKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      e.stopPropagation()
      onClose()
      return
    }
    if (e.key !== 'Tab' || !modalNode) return

    const focusable = modalNode.querySelectorAll<HTMLElement>(FOCUSABLE)
    if (focusable.length === 0) {
      e.preventDefault()
      return
    }
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    const active = document.activeElement

    if (e.shiftKey) {
      if (active === first || !modalNode.contains(active)) {
        e.preventDefault()
        last.focus()
      }
    } else {
      if (active === last || !modalNode.contains(active)) {
        e.preventDefault()
        first.focus()
      }
    }
  }

  $effect(() => {
    if (!open) return

    previousFocus = document.activeElement as HTMLElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleGlobalKeydown)

    tick().then(() => {
      modalNode?.focus()
    })

    return () => {
      document.removeEventListener('keydown', handleGlobalKeydown)
      document.body.style.overflow = previousOverflow
      if (previousFocus && document.contains(previousFocus)) {
        previousFocus.focus()
      }
      previousFocus = null
    }
  })
</script>

{#if open}
  <div
    transition:fade={{ duration: 120 }}
    class="modal-backdrop"
    onclick={() => closeOnBackdropClick && onClose()}
    role="presentation"
  >
    <dialog
      bind:this={modalNode}
      onclick={(e) => (closeOnInsideClick ? onClose() : e.stopPropagation())}
      aria-modal="true"
      aria-label={title}
      class="modal-focus-trap"
    >
      <Card class={modalClassName} {title} {...rest}>
        {@render children?.()}
      </Card>
    </dialog>
  </div>
{/if}
