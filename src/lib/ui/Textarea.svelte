<script lang="ts">
  import type { HTMLTextareaAttributes } from 'svelte/elements'
  import { cn } from '../cn'
  import type { BlueniteProps } from '../types'
  import '../styles/Textarea.css'

  export type TextareaProps = Omit<HTMLTextareaAttributes, 'children'> &
    BlueniteProps & {
      label?: string
      error?: string
      helperText?: string
      ref?: HTMLTextAreaElement | null
      wrapperClass?: string
    }
  let {
    value = $bindable(''),
    ref = $bindable(null),
    label,
    error,
    helperText,
    id,
    disabled,
    class: _class,
    overrideClasses,
    wrapperClass = '',
    ...rest
  }: TextareaProps = $props()

  let generatedId = $props.id()
  let textareaId = $derived(id ?? `textarea-${generatedId}`)
  let textareaClassName = $derived(cn(_class, 'textarea', { override: overrideClasses }))
</script>

<div class={cn(wrapperClass, 'textarea-wrapper', { override: overrideClasses })}>
  {#if label}
    <label class="input-label" for={textareaId}>{label}</label>
  {/if}
  <textarea
    class={textareaClassName}
    class:error
    bind:this={ref}
    bind:value
    id={textareaId}
    {disabled}
    aria-invalid={!!error}
    aria-describedby={error
      ? `${textareaId}-error`
      : helperText
        ? `${textareaId}-helper`
        : undefined}
    {...rest}></textarea>
  {#if error}
    <span class="textarea-error" id="{textareaId}-error">{error}</span>
  {:else if helperText}
    <span class="textarea-helper" id="{textareaId}-helper">{helperText}</span>
  {/if}
</div>
