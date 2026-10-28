<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { HTMLAttributes } from 'svelte/elements'
  import { floatingAnchor } from '../utils.svelte'
  import { cn } from '../cn'
  import type { BlueniteProps } from '../types'
  import '../styles/Dropdown.css'
  import { fade } from 'svelte/transition'

  export type DropdownProps = HTMLAttributes<HTMLDivElement> &
    BlueniteProps & {
      open?: boolean
      anchor: HTMLElement | null
      children?: Snippet
      placement?: 'top' | 'right' | 'bottom' | 'left' | 'bottom-start' | 'bottom-end'
      onClose?: () => void
      matchAnchorWidth?: boolean
    }

  let {
    anchor,
    open = $bindable(false),
    children,
    placement = 'bottom',
    onClose = () => {},
    matchAnchorWidth = false,
    class: _class,
    overrideClasses,
    ...rest
  }: DropdownProps = $props()

  let className = $derived(cn(_class, 'dropdown', { override: overrideClasses }))
  let dropdownNode = $state<HTMLElement | null>(null)

  function close() {
    open = false
    onClose?.()
  }

  $effect(() => {
    if (!open) return

    const handlePointerDown = (event: PointerEvent) => {
      const path = event.composedPath()
      const clickedInsideDropdown = dropdownNode && path.includes(dropdownNode)
      const clickedInsideAnchor = anchor && path.includes(anchor)
      if (!clickedInsideDropdown && !clickedInsideAnchor) {
        close()
      }
    }
    document.addEventListener('pointerdown', handlePointerDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
    }
  })
</script>

{#if open}
  <div
    class={className}
    bind:this={dropdownNode}
    use:floatingAnchor={{ anchorElement: anchor, placement, matchAnchorWidth }}
    transition:fade={{ duration: 100 }}
    {...rest}
  >
    {@render children?.()}
  </div>
{/if}
