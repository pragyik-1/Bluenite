<script lang="ts">
  import Card from './Card.svelte'
  import type { CardProps } from './Card.svelte'
  import '../styles/Modal.css'
  import { fade } from 'svelte/transition'
  import { tick } from 'svelte'

  export type ModalProps = CardProps & {
    open?: boolean
    onClose?: () => void
    title?: string
    size?: 'sm' | 'md' | 'lg'
  }

  let {
    open = $bindable(false),
    onClose = () => (open = false),
    children,
    title,
    size = 'md',
    ...rest
  }: ModalProps = $props()

  let modalNode = $state<HTMLElement | null>(null)
  let previousFocus = $state<HTMLElement | null>(null)

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      onClose()
      return
    }
    if (e.key === 'Tab' && modalNode) {
      const focusable = modalNode.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
  }

  $effect(() => {
    if (open) {
      previousFocus = document.activeElement as HTMLElement
      tick().then(() => {
        modalNode?.focus()
      })
    } else if (previousFocus) {
      previousFocus.focus()
      previousFocus = null
    }
  })
</script>

{#if open}
  <div
    transition:fade={{ duration: 100 }}
    class="modal-backdrop"
    onclick={onClose}
    onkeydown={handleKeydown}
    role="presentation"
  >
    <div
      bind:this={modalNode}
      tabindex="-1"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      class="modal-focus-trap"
      onclick={(e) => e.stopPropagation()}
      onkeydown={(e) => e.stopPropagation()}
    >
      <Card class="card-container-modal modal-{size}" {title} {...rest}>
        {@render children?.()}
      </Card>
    </div>
  </div>
{/if}
