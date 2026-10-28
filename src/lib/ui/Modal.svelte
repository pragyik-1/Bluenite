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
    closeOnInsideClick?: boolean
    closeOnBackdropClick?: boolean
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
    cn(_class, 'card-container-modal', `modal-${size}`, { override: overrideClasses }),
  )
  let dialogNode = $state<HTMLDialogElement | null>(null)
  let previousFocus = $state<HTMLElement | null>(null)

  const FOCUSABLE =
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

  function focusFirstElement() {
    if (!dialogNode) return
    const focusable = dialogNode.querySelectorAll<HTMLElement>(FOCUSABLE)
    if (focusable.length > 0) {
      focusable[0].focus()
    } else {
      dialogNode.focus()
    }
  }

  function handleDialogKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      e.preventDefault()
      e.stopPropagation()
      onClose()
      return
    }
    if (e.key !== 'Tab' || !dialogNode) return

    const focusable = dialogNode.querySelectorAll<HTMLElement>(FOCUSABLE)
    if (focusable.length === 0) {
      e.preventDefault()
      return
    }
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    const active = document.activeElement

    if (e.shiftKey) {
      if (active === first || !dialogNode.contains(active)) {
        e.preventDefault()
        last.focus()
      }
    } else {
      if (active === last || !dialogNode.contains(active)) {
        e.preventDefault()
        first.focus()
      }
    }
  }

  $effect(() => {
    if (!open) {
      if (dialogNode?.open) {
        dialogNode.close()
      }
      if (previousFocus && document.contains(previousFocus)) {
        previousFocus.focus()
      }
      previousFocus = null
      return
    }

    previousFocus = document.activeElement as HTMLElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    tick().then(() => {
      if (dialogNode?.isConnected && !dialogNode.open) {
        dialogNode.showModal()
      }
      focusFirstElement()
    })

    return () => {
      document.body.style.overflow = previousOverflow
    }
  })
</script>

{#if open}
  <div
    transition:fade={{ duration: 120 }}
    class="modal-backdrop"
    onclick={(e) => {
      if (e.target === e.currentTarget && closeOnBackdropClick) onClose()
    }}
    role="presentation"
  >
    <dialog
      bind:this={dialogNode}
      onkeydown={handleDialogKeydown}
      onclick={(e) => {
        e.stopPropagation()
        if (closeOnInsideClick || (e.target === dialogNode && closeOnBackdropClick)) {
          onClose()
        }
      }}
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
