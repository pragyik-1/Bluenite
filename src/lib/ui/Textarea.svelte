<script lang="ts">
  import type { HTMLTextareaAttributes } from 'svelte/elements'
  import '../styles/Textarea.css'

  export type TextareaProps = Omit<HTMLTextareaAttributes, 'children'> & {
    label?: string
    error?: string
    helperText?: string
    ref?: HTMLTextAreaElement | null
  }
  let {
    value = $bindable(''),
    ref = $bindable(null),
    label,
    error,
    helperText,
    id,
    disabled,
    ...rest
  }: TextareaProps = $props()

  let textareaId = $derived(id || 'textarea-' + Math.random().toString(36).slice(2, 9))
</script>

<div class="textarea-wrapper">
  {#if label}
    <label class="input-label" for={textareaId}>{label}</label>
  {/if}
  <textarea
    class="textarea"
    class:error
    bind:this={ref}
    bind:value
    id={textareaId}
    {disabled}
    aria-invalid={!!error}
    aria-describedby={error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined}
    {...rest}
  ></textarea>
  {#if error}
    <span class="textarea-error" id="{textareaId}-error">{error}</span>
  {:else if helperText}
    <span class="textarea-helper" id="{textareaId}-helper">{helperText}</span>
  {/if}
</div>
