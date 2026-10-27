<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { HTMLInputAttributes } from 'svelte/elements'
  import { cn } from '../cn'
  import type { BlueniteProps } from '../types'
  import '../styles/Switch.css'

  export type SwitchProps = Omit<HTMLInputAttributes, 'type' | 'checked' | 'children' | 'size'> &
    BlueniteProps & {
      checked?: boolean
      label?: string
      size?: 'sm' | 'md' | 'lg' | number
      class?: string
      style?: string
      children?: Snippet
    }

  let {
    checked = $bindable(false),
    label,
    size = 'md',
    id,
    class: _class,
    overrideClasses,
    style = '',
    disabled = false,
    children,
    ...rest
  }: SwitchProps = $props()

  let heightPx = $derived(
    typeof size === 'number' ? size : size === 'sm' ? 20 : size === 'lg' ? 32 : 26,
  )

  let className = $derived(cn(_class, 'switch-container', { override: overrideClasses }))

  let generatedId = $props.id()
  let switchId = $derived(id ?? `switch-${generatedId}`)
</script>

<label class={className} class:disabled style="--switch-h: {heightPx}px; {style}" for={switchId}>
  <input
    id={switchId}
    type="checkbox"
    class="switch-input"
    role="switch"
    {disabled}
    bind:checked
    {...rest}
  />

  <div class="switch-track" aria-hidden="true">
    <div class="switch-thumb"></div>
  </div>

  {#if children || label}
    <span class="switch-label">
      {#if children}
        {@render children()}
      {:else}
        {label}
      {/if}
    </span>
  {/if}
</label>
