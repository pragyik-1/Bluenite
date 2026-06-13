<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements'
  import '../styles/Input.css'

  export type InputProps = HTMLInputAttributes & {
    label?: string
    ref?: HTMLInputElement | null
  }
  let {
    value = $bindable(''),
    files = $bindable(),
    ref = $bindable(null),
    label,
    id,
    ...rest
  }: InputProps = $props()
</script>

{#if label}
  <label class="input-label" for={id}>{label}</label>
{/if}
<input class="input" bind:this={ref} bind:value {id} {...rest} />
