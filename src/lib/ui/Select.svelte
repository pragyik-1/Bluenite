<script lang="ts">
  import Dropdown from './Dropdown.svelte'
  import { cn } from '../cn'
  import type { BlueniteProps } from '../types'
  import '../styles/Select.css'
  import '../styles/Input.css'

  export type SelectOption = {
    label: string
    value: unknown
    [key: string]: unknown
  }

  export type SelectProps = BlueniteProps & {
    options?: SelectOption[]
    value?: unknown
    label?: string
    placeholder?: string
    disabled?: boolean
    id?: string
    name?: string
    required?: boolean
    optionStyle?: string
    optionClass?: string
    wrapperClass?: string
    wrapperStyle?: string
    style?: string
    class?: string
    error?: string
    helperText?: string
  }

  let {
    options = [],
    value = $bindable(),
    label,
    placeholder = 'Select...',
    disabled = false,
    id,
    name,
    required = false,
    optionClass = '',
    optionStyle = '',
    wrapperClass = '',
    wrapperStyle = '',
    class: _class,
    overrideClasses,
    error,
    helperText,
    ...rest
  }: SelectProps = $props()

  let wrapperClassName = $derived(
    cn(_class, 'select-wrapper', wrapperClass, { override: overrideClasses }),
  )

  let open = $state(false)
  let anchor = $state<HTMLElement | null>(null)
  let listboxNode = $state<HTMLElement | null>(null)
  let highlightedIndex = $state(-1)
  let generatedId = $props.id()
  let selectId = $derived(id ?? `select-${generatedId}`)
  let listboxId = $derived(selectId + '-listbox')
  let errorId = $derived(selectId + '-error')
  let helperId = $derived(selectId + '-helper')

  let selectedLabel = $derived(options.find((opt) => opt.value === value)?.label)

  function toFormValue(value: unknown): string {
    return value === null || value === undefined ? '' : String(value)
  }

  function handleSelect(optValue: unknown) {
    value = optValue
    open = false
    anchor?.focus()
  }

  function highlightNext() {
    if (highlightedIndex < options.length - 1) {
      highlightedIndex++
      scrollHighlightedIntoView()
    }
  }

  function highlightPrev() {
    if (highlightedIndex > 0) {
      highlightedIndex--
      scrollHighlightedIntoView()
    }
  }

  function scrollHighlightedIntoView() {
    const items = listboxNode?.querySelectorAll<HTMLElement>('.select-item')
    items?.[highlightedIndex]?.scrollIntoView({ block: 'nearest' })
  }

  function handleKeydown(e: KeyboardEvent) {
    if (disabled) return

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault()
        if (open && highlightedIndex >= 0) {
          handleSelect(options[highlightedIndex].value)
        } else {
          open = !open
          if (open) highlightedIndex = options.findIndex((opt) => opt.value === value)
        }
        break
      case 'ArrowDown':
        e.preventDefault()
        if (!open) {
          open = true
          highlightedIndex = options.findIndex((opt) => opt.value === value)
        } else {
          highlightNext()
        }
        break
      case 'ArrowUp':
        e.preventDefault()
        if (open) highlightPrev()
        break
      case 'Escape':
        if (open) {
          e.preventDefault()
          open = false
          anchor?.focus()
        }
        break
      case 'Home':
        if (open) {
          e.preventDefault()
          highlightedIndex = 0
          scrollHighlightedIntoView()
        }
        break
      case 'End':
        if (open) {
          e.preventDefault()
          highlightedIndex = options.length - 1
          scrollHighlightedIntoView()
        }
        break
    }
  }

  $effect(() => {
    if (open) {
      highlightedIndex = options.findIndex((opt) => opt.value === value)
    }
  })
</script>

<div class={wrapperClassName} style={wrapperStyle} {...rest}>
  {#if label}
    <label class="input-label" for={selectId}>{label}</label>
  {/if}

  <div class="select-input-wrap">
    <button
      id={selectId}
      type="button"
      class="select-trigger"
      class:error
      role="combobox"
      {disabled}
      bind:this={anchor}
      onclick={() => !disabled && (open = !open)}
      onkeydown={handleKeydown}
      aria-expanded={open}
      aria-haspopup="listbox"
      aria-controls={listboxId}
      aria-activedescendant={open && highlightedIndex >= 0
        ? `${selectId}-option-${highlightedIndex}`
        : undefined}
      aria-invalid={error ? true : undefined}
      aria-required={required || undefined}
      aria-describedby={error ? errorId : helperText ? helperId : undefined}
    >
      <span class:select-placeholder={!selectedLabel}>
        {selectedLabel ?? placeholder}
      </span>
    </button>
    <svg
      class="select-chevron"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      style="transform: translateY(-50%) rotate({open
        ? '180deg'
        : '0deg'}); transition: transform 0.2s; opacity: 0.5;"
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  </div>

  {#if name !== undefined && name !== ''}
    <input type="hidden" {name} value={toFormValue(value)} {disabled} />
  {/if}

  {#if error}
    <span class="input-error" id={errorId}>{error}</span>
  {:else if helperText}
    <span class="input-helper" id={helperId}>{helperText}</span>
  {/if}

  <Dropdown
    {anchor}
    bind:open
    placement="bottom-start"
    style="width: {anchor?.offsetWidth}px; box-sizing: border-box;"
  >
    <div
      class="select-options"
      id={listboxId}
      bind:this={listboxNode}
      role="listbox"
      aria-label={label || placeholder}
    >
      {#each options as option, i (option.value)}
        <button
          type="button"
          id={`${selectId}-option-${i}`}
          class="select-item {optionClass}"
          style={optionStyle}
          class:selected={value === option.value}
          class:highlighted={highlightedIndex === i}
          role="option"
          tabindex="-1"
          aria-selected={value === option.value}
          onclick={() => handleSelect(option.value)}
          onmouseenter={() => (highlightedIndex = i)}
        >
          {option.label}
        </button>
      {/each}
    </div>
  </Dropdown>
</div>
