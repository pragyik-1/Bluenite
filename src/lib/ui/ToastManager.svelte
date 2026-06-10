<script lang="ts">
  import Toast from './Toast.svelte'
  import { toast } from '../toast.svelte'
</script>

<style>
  .toast-manager {
    position: fixed;
    bottom: 1.5rem;
    right: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    z-index: 10000;
    pointer-events: none;
  }
</style>

<div class="toast-manager">
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
