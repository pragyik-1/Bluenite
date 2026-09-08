<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements'
  import { cn } from '../cn'
  import type { BlueniteProps } from '../types'
  import '../styles/Input.css'

  export type InputProps = HTMLInputAttributes &
    BlueniteProps & {
      label?: string
      error?: string
      helperText?: string
      ref?: HTMLInputElement | null
      wrapperClass?: string
    }
  let {
    value = $bindable(''),
    ref = $bindable(null),
    label,
    error,
    helperText,
    id,
    class: _class,
    overrideClasses,
    wrapperClass = '',
    ...rest
  }: InputProps = $props()

  let inputId = $derived(id || 'input-' + Math.random().toString(36).slice(2, 9))
  let inputClassName = $derived(cn(overrideClasses, _class, 'input'))
</script>

<div class="input-wrapper {wrapperClass}">
  {#if label}
    <label class="input-label" for={inputId}>{label}</label>
  {/if}
  <input
    class={inputClassName}
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
