<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { HTMLButtonAttributes } from 'svelte/elements'
  import { cn } from '../cn'
  import type { BlueniteProps } from '../types'
  import '../styles/DropdownMenuItem.css'

  export type DropdownMenuItemProps = HTMLButtonAttributes &
    BlueniteProps & {
      children?: Snippet
      icon?: Snippet
      destructive?: boolean
    }

  export type MenuItemProps = DropdownMenuItemProps

  let {
    children,
    icon,
    destructive = false,
    disabled = false,
    class: _class,
    overrideClasses,
    onclick,
    ...rest
  }: DropdownMenuItemProps = $props()

  let className = $derived(
    cn(
      _class,
      'dropdown-menu-item',
      destructive ? 'dropdown-menu-item-destructive' : undefined,
      { override: overrideClasses },
    ),
  )
</script>

<button
  type="button"
  role="menuitem"
  class={className}
  {disabled}
  onclick={(e) => {
    if (disabled) {
      e.preventDefault()
      return
    }
    onclick?.(e)
  }}
  {...rest}
>
  {#if icon}
    <span class="dropdown-menu-item-icon">{@render icon()}</span>
  {/if}
  <span class="dropdown-menu-item-label">{@render children?.()}</span>
</button>
