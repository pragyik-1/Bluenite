<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { HTMLAttributes } from 'svelte/elements'
  import Dropdown from './Dropdown.svelte'
  import { cn } from '../cn'
  import type { BlueniteProps, FloatingOptions } from '../types'
  import '../styles/DropdownMenu.css'

  export type DropdownMenuProps = HTMLAttributes<HTMLDivElement> &
    BlueniteProps & {
      open?: boolean
      anchor: HTMLElement | null
      children?: Snippet
      placement?: 'top' | 'right' | 'bottom' | 'left' | 'bottom-start' | 'bottom-end'
      onClose?: () => void
      matchAnchorWidth?: boolean
      label?: string
      floatingOptions?: FloatingOptions
    }

  export type MenuProps = DropdownMenuProps

  let {
    anchor,
    open = $bindable(false),
    children,
    placement = 'bottom-start',
    onClose = () => {},
    matchAnchorWidth = false,
    label,
    class: _class,
    overrideClasses,
    floatingOptions = {},
    ...rest
  }: DropdownMenuProps = $props()

  let className = $derived(cn(_class, 'dropdown', 'dropdown-menu', { override: overrideClasses }))
  let menuNode = $state<HTMLDivElement | null>(null)
  let activeIndex = $state(-1)

  function close() {
    open = false
    activeIndex = -1
    onClose?.()
  }

  function getItems(): HTMLButtonElement[] {
    if (!menuNode) return []
    return Array.from(
      menuNode.querySelectorAll<HTMLButtonElement>(
        '[role="menuitem"]:not([disabled]):not([aria-disabled="true"])',
      ),
    )
  }

  function focusItem(index: number) {
    const items = getItems()
    if (items.length === 0) return
    activeIndex = ((index % items.length) + items.length) % items.length
    items[activeIndex].focus()
  }

  function handleKeydown(e: KeyboardEvent) {
    if (!open) return
    const items = getItems()
    if (items.length === 0) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        focusItem(activeIndex + 1)
        break
      case 'ArrowUp':
        e.preventDefault()
        focusItem(activeIndex - 1)
        break
      case 'Home':
        e.preventDefault()
        focusItem(0)
        break
      case 'End':
        e.preventDefault()
        focusItem(items.length - 1)
        break
      case 'Escape':
        e.preventDefault()
        close()
        anchor?.focus()
        break
      case 'Tab':
        close()
        break
    }
  }

  $effect(() => {
    if (open) {
      activeIndex = -1
      setTimeout(() => {
        const items = getItems()
        if (items.length > 0 && menuNode) {
          items[0].focus()
          activeIndex = 0
        }
      }, 0)
    }
  })
</script>

<Dropdown
  {anchor}
  bind:open
  {placement}
  {onClose}
  {matchAnchorWidth}
  class={className}
  {floatingOptions}
  {...rest}
>
  <div
    bind:this={menuNode}
    class="dropdown-menu-list"
    role="menu"
    aria-label={label}
    tabindex="0"
    onkeydown={handleKeydown}
  >
    {@render children?.()}
  </div>
</Dropdown>
