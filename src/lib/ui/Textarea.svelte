<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import '../styles/Textarea.css'

  export type TextareaProps = HTMLAttributes<HTMLTextAreaElement> & {
    value?: string
  }
  let { value = $bindable(), ...rest }: TextareaProps = $props()
</script>

<textarea class="textarea" bind:value {...rest}></textarea>
