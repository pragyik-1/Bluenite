<script lang="ts">
  import Card from './Card.svelte'
  import type { CardProps } from './Card.svelte'
  import "../styles/Modal.css"
    import { fade } from 'svelte/transition'

  type ModalProps = CardProps & {
    open?: boolean
    onClose?: () => void
  }

  let {
    open = $bindable(false),
    onClose = () => {open = false},
    children,
    ...rest
  }: ModalProps = $props()
</script>

{#if open}
  <div transition:fade={{duration: 150}} class="modal-backdrop" onclick={onClose} role="presentation">
    <Card class="card-container-modal" {...rest}>
        {@render children?.()}
    </Card>
  </div>
{/if}
