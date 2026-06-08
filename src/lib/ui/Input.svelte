<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements'
  import '../styles/Input.css'

  type InputProps = HTMLInputAttributes & { label?: string }
  let {
    value = $bindable(''),
    files = $bindable(),
    label,
    id,
    ...rest
  }: InputProps = $props()
</script>

{#if label}
  <label class="input-label" for={id}>{label}</label>
{/if}
<input class="input" {value} {id} {...rest} />
