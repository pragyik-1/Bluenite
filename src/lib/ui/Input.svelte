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

  let generatedId = $props.id()
  let inputId = $derived(id ?? `input-${generatedId}`)
  let inputClassName = $derived(cn(_class, 'input', error ? 'error' : undefined, { override: overrideClasses }))
  let wrapperClassName = $derived(cn(wrapperClass, 'input-wrapper', { override: overrideClasses }))
</script>

<div class={wrapperClassName}>
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
