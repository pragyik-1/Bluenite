<script lang="ts">
  import type { Snippet } from 'svelte'
  import '../styles/Col.css'
  import type { HTMLAttributes } from 'svelte/elements'

  type ColProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
    children?: Snippet
    gap?: number
    align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline'
  }

  let { children, gap = 0, align = 'start', ...rest }: ColProps = $props()

  const alignStyles = {
    center: 'align-items: center;',
    end: 'align-items: flex-end;',
    stretch: 'align-items: stretch;',
    baseline: 'align-items: baseline;',
    start: 'align-items: flex-start;',
  }
</script>

<div class="col-container" style="--col-gap: {gap}rem; {alignStyles[align]}" {...rest}>
  {@render children?.()}
</div>
