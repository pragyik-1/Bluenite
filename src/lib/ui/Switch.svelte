<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { HTMLInputAttributes } from 'svelte/elements'
  import '../styles/Switch.css'

  export type SwitchProps = Omit<HTMLInputAttributes, 'type' | 'checked' | 'children' | 'size'> & {
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
    id = crypto.randomUUID(),
    class: _class = '',
    style = '',
    disabled = false,
    children,
    ...rest
  }: SwitchProps = $props()

  let heightPx = $derived(
    typeof size === 'number' ? size : size === 'sm' ? 20 : size === 'lg' ? 32 : 26,
  )
</script>

<label
  class="switch-container {_class}"
  class:checked
  class:disabled
  style="--switch-h: {heightPx}px; {style}"
  for={id}
>
  <input {id} type="checkbox" class="switch-input" {disabled} bind:checked {...rest} />

  <div class="switch-track">
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
