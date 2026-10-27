<script lang="ts">
  import Toast from './Toast.svelte'
  import { toast, type ToastPosition } from '../toast.svelte'

  const positions: ToastPosition[] = [
    'top-left',
    'top-center',
    'top-right',
    'bottom-left',
    'bottom-center',
    'bottom-right',
  ]

  function getPositionStyle(pos: ToastPosition) {
    switch (pos) {
      case 'top-left':
        return 'top: var(--space-6); left: var(--space-6);'
      case 'top-center':
        return 'top: var(--space-6); left: 50%; transform: translateX(-50%);'
      case 'top-right':
        return 'top: var(--space-6); right: var(--space-6);'
      case 'bottom-left':
        return 'bottom: var(--space-6); left: var(--space-6);'
      case 'bottom-center':
        return 'bottom: var(--space-6); left: 50%; transform: translateX(-50%);'
      case 'bottom-right':
      default:
        return 'bottom: var(--space-6); right: var(--space-6);'
    }
  }

  function getFlexDirection(pos: ToastPosition) {
    if (pos.startsWith('top')) return 'column'
    return 'column-reverse'
  }
</script>

{#each positions as pos}
  {@const items = toast.all.filter((t) => (t.position ?? 'bottom-right') === pos)}
  {#if items.length > 0}
    <div
      class="toast-manager toast-manager-{pos}"
      role="status"
      aria-live="polite"
      aria-atomic="false"
      style="{getPositionStyle(pos)} flex-direction: {getFlexDirection(pos)};"
    >
      {#each items as t (t.id)}
        <Toast
          message={t.message}
          description={t.description}
          variant={t.variant}
          duration={t.duration}
          icon={t.icon}
          children={t.children}
          onClose={() => toast.dismiss(t.id)}
        />
      {/each}
    </div>
  {/if}
{/each}

<style>
  .toast-manager {
    position: fixed;
    display: flex;
    gap: var(--space-3);
    z-index: var(--z-toast, 3000);
    pointer-events: none;
    max-width: calc(100vw - var(--space-6) * 2);
  }

  .toast-manager-top-center,
  .toast-manager-bottom-center {
    align-items: center;
  }
</style>
