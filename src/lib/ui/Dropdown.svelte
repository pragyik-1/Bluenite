<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { HTMLAttributes } from 'svelte/elements'
  import { floatingAnchor } from '../utils.svelte'
  import '../styles/Dropdown.css'
  import { fade } from 'svelte/transition'

  type DropDownProps = HTMLAttributes<HTMLDivElement> & {
    open?: boolean
    anchor: HTMLElement | null
    children?: Snippet
    placement?:
      | 'top'
      | 'right'
      | 'bottom'
      | 'left'
      | 'bottom-start'
      | 'bottom-end'
    onClose?: () => void
  }

  let {
    anchor,
    open = $bindable(false),
    children,
    placement = 'bottom',
    onClose = () => (open = !open),
    ...rest
  }: DropDownProps = $props()

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
    class="dropdown"
    bind:this={dropdownNode}
    use:floatingAnchor={{ anchorElement: anchor, placement }}
    transition:fade={{ duration: 150 }}
    {...rest}
  >
    {@render children?.()}
  </div>
{/if}
