<script lang="ts">
  import Dropdown from './Dropdown.svelte'
  import '../styles/Select.css'
  import '../styles/Input.css'

  export type SelectOption = {
    label: string
    value: unknown
    [key: string]: unknown
  }

  export type SelectProps = {
    options?: SelectOption[]
    value?: unknown
    label?: string
    placeholder?: string
    disabled?: boolean
    id?: string
    optionStyle?: string
    optionClass?: string
    wrapperClass?: string
    wrapperStyle?: string
    style?: string
    class?: string
  }

  let {
    options = [],
    value = $bindable(),
    label,
    placeholder = 'Select...',
    disabled = false,
    id,
    optionClass = '',
    optionStyle = '',
    wrapperClass = '',
    wrapperStyle = '',
    ...rest
  }: SelectProps = $props()

  let open = $state(false)
  let anchor = $state<HTMLElement | null>(null)
  let listboxNode = $state<HTMLElement | null>(null)
  let highlightedIndex = $state(-1)
  let selectId = $derived(id || 'select-' + Math.random().toString(36).slice(2, 9))
  let listboxId = $derived(selectId + '-listbox')

  let selectedLabel = $derived(options.find((opt) => opt.value === value)?.label)

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

<div class="select-wrapper" class:wrapperClass style={wrapperStyle} {...rest}>
  {#if label}
    <label class="input-label" for={selectId}>{label}</label>
  {/if}

  <button
    id={selectId}
    type="button"
    class="select-trigger"
    {disabled}
    bind:this={anchor}
    onclick={() => !disabled && (open = !open)}
    onkeydown={handleKeydown}
    aria-expanded={open}
    aria-haspopup="listbox"
    aria-controls={listboxId}
    {...rest}
  >
    <span class:select-placeholder={!selectedLabel}>
      {selectedLabel ?? placeholder}
    </span>

    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      style="transform: rotate({open
        ? '180deg'
        : '0deg'}); transition: transform 0.2s; opacity: 0.5;"
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  </button>

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
          class="select-item {optionClass}"
          style={optionStyle}
          class:selected={value === option.value}
          class:highlighted={highlightedIndex === i}
          role="option"
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
