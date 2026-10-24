<script lang="ts">
  import Toast from './Toast.svelte'
  import { toast } from '../toast.svelte'
</script>

<div class="toast-manager" role="status" aria-live="polite" aria-atomic="false">
  {#each toast.all as t (t.id)}
    <Toast
      message={t.message}
      description={t.description}
      variant={t.variant}
      duration={t.duration}
      children={t.children}
      onClose={() => toast.dismiss(t.id)}
    />
  {/each}
</div>

<style>
  .toast-manager {
    position: fixed;
    bottom: var(--space-6);
    right: var(--space-6);
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    z-index: var(--z-toast, 3000);
    pointer-events: none;
    max-width: calc(100vw - var(--space-6) * 2);
  }
</style>
