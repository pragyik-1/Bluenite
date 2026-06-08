<script lang="ts">
  import Dropdown from './Dropdown.svelte'
  import '../styles/Select.css'
  import '../styles/Input.css' 
    import type { HTMLButtonAttributes } from 'svelte/elements'

  export type SelectOption = {
    label: string
    value: unknown
    [key: string]: unknown
  }

  type SelectProps = Omit<HTMLButtonAttributes, "children"> & {
    options?: SelectOption[]
    value?: unknown
    label?: string
    placeholder?: string
    disabled?: boolean
    id?: string
    optionStyle?: string
    optionClass?: string
  }

  let {
    options = [],
    value = $bindable(),
    label,
    placeholder = 'Select...',
    disabled = false,
    id,
    optionClass = "",
    optionStyle = "",
    ...rest
  }: SelectProps = $props()

  let open = $state(false)
  let anchor = $state<HTMLElement | null>(null)
  let selectedLabel = $derived(
    options.find((opt) => opt.value === value)?.label
  )

  function handleSelect(optValue: any) {
    value = optValue
    open = false
  }
</script>

<div class="select-wrapper">
  {#if label}
    <label class="input-label" for={id}>{label}</label>
  {/if}

  <button
    {id}
    type="button"
    class="select-trigger"
    {disabled}
    bind:this={anchor}
    onclick={() => !disabled && (open = !open)}
    aria-expanded={open}
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
      style="transform: rotate({open ? '180deg' : '0deg'}); transition: transform 0.2s;"
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
    <div class="select-options">
      {#each options as option}
        <button
          type="button"
          class="select-item {optionClass}"
          style={optionStyle}
          class:selected={value === option.value}
          onclick={() => handleSelect(option.value)}
        >
          {option.label}
        </button>
      {/each}
    </div>
  </Dropdown>
</div>