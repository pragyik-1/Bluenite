<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements'
  import '../styles/Input.css'

  export type InputProps = HTMLInputAttributes & {
    label?: string
    error?: string
    helperText?: string
    ref?: HTMLInputElement | null
  }
  let {
    value = $bindable(''),
    ref = $bindable(null),
    label,
    error,
    helperText,
    id,
    ...rest
  }: InputProps = $props()

  let inputId = $derived(id || 'input-' + Math.random().toString(36).slice(2, 9))
</script>

<div class="input-wrapper">
  {#if label}
    <label class="input-label" for={inputId}>{label}</label>
  {/if}
  <input
    class="input"
    class:error
    bind:this={ref}
    bind:value
    id={inputId}
    aria-invalid={!!error}
    aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
    {...rest}
  />
  {#if error}
    <span class="input-error" id="{inputId}-error">{error}</span>
  {:else if helperText}
    <span class="input-helper" id="{inputId}-helper">{helperText}</span>
  {/if}
</div>
