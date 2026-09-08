<script lang="ts">
  import type { Snippet } from 'svelte'
  import { cn } from '../cn'
  import type { BlueniteProps } from '../types'
  import '../styles/Col.css'
  import type { HTMLAttributes } from 'svelte/elements'

  export type ColProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> &
    BlueniteProps & {
      children?: Snippet
      gap?: number
      align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline'
    }

  let { children, gap = 0, align = 'start', class: _class, overrideClasses, ...rest }: ColProps = $props()

  let className = $derived(cn(overrideClasses, _class, 'col-container'))

  const alignStyles = {
    center: 'align-items: center;',
    end: 'align-items: flex-end;',
    stretch: 'align-items: stretch;',
    baseline: 'align-items: baseline;',
    start: 'align-items: flex-start;',
  }
</script>

<div class={className} style="--col-gap: {gap}rem; {alignStyles[align]}" {...rest}>
  {@render children?.()}
</div>
