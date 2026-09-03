<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { HTMLButtonAttributes } from 'svelte/elements'
  import '../styles/Button.css'

  export type ButtonProps = Omit<HTMLButtonAttributes, 'children'> & {
    variant?: 'fill' | 'outline' | 'ghost'
    children?: Snippet
    color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warn' | 'info'
    size?: 'sm' | 'md' | 'lg'
    loading?: boolean
    icon?: Snippet
    ref?: HTMLButtonElement | null
  }

  let {
    variant = 'fill',
    color = 'primary',
    size = 'md',
    loading = false,
    icon,
    ref = $bindable(null),
    children,
    disabled,
    ...rest
  }: ButtonProps = $props()
</script>

<button
  style="--btn-color: var(--{color}); --btn-hover: var(--{color}-hover); 
    --btn-text: {variant === 'ghost' ? 'var(--btn-color)' : 'var(--primary-text)'};"
  class="button {variant} {size}"
  bind:this={ref}
  disabled={disabled || loading}
  aria-busy={loading}
  {...rest}
>
  {#if loading}
    <span class="button-spinner" aria-hidden="true"></span>
  {:else if icon}
    <span class="button-icon">{@render icon()}</span>
  {/if}
  {@render children?.()}
</button>
