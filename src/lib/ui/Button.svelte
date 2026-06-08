<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { HTMLButtonAttributes } from 'svelte/elements'
  import '../styles/Button.css'

  type ButtonProps = Omit<HTMLButtonAttributes, 'children'> & {
    variant?: 'fill' | 'outline' | 'ghost'
    children?: Snippet
    color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warn' | 'info'
    ref?: HTMLButtonElement | null
  }

  let {
    variant = 'fill',
    color = 'primary',
    ref = $bindable(null),
    children,
    ...rest
  }: ButtonProps = $props()
</script>

<button
  style="--btn-color: var(--{color}); --btn-hover: var(--{color}-hover); 
    --btn-text: {variant === 'ghost'
    ? 'var(--primary)'
    : 'var(--primary-text)'};"
  class="button {variant}"
  bind:this={ref}
  {...rest}
>
  {@render children?.()}
</button>
