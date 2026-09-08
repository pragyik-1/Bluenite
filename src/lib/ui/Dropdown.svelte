<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { HTMLAttributes } from 'svelte/elements'
  import { floatingAnchor } from '../utils.svelte'
  import { cn } from '../cn'
  import type { BlueniteProps } from '../types'
  import '../styles/Dropdown.css'
  import { fade } from 'svelte/transition'

  export type DropDownProps = HTMLAttributes<HTMLDivElement> &
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
    onClose = () => (open = false),
    matchAnchorWidth = true,
    class: _class,
    overrideClasses,
    ...rest
  }: DropDownProps = $props()

  let className = $derived(cn(overrideClasses, _class, 'dropdown'))
  let dropdownNode = $state<HTMLElement | null>(null)

  $effect(() => {
    if (!open) return

    const handleWindowClick = (event: MouseEvent) => {
      const target = event.target as Node
      const clickedInsideDropdown = dropdownNode?.contains(target)
      const clickedInsideAnchor = anchor?.contains(target)
      if (!clickedInsideDropdown && !clickedInsideAnchor) {
        onClose()
      }
    }
    document.addEventListener('click', handleWindowClick)
    return () => {
      document.removeEventListener('click', handleWindowClick)
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
