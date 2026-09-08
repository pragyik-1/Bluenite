<script lang="ts">
  import type { Snippet } from 'svelte'
  import { cn } from '../cn'
  import type { BlueniteProps } from '../types'
  import '../styles/Row.css'
  import type { HTMLAttributes } from 'svelte/elements'

  export type RowProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> &
    BlueniteProps & {
      children?: Snippet
      gap?: number
      justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
    }

  let { children, gap = 0, justify = 'start', class: _class, overrideClasses, ...rest }: RowProps = $props()

  let className = $derived(cn(overrideClasses, _class, 'row-container'))

  const justifyStyles = {
    start: 'justify-content: flex-start;',
    center: 'justify-content: center;',
    end: 'justify-content: flex-end;',
    between: 'justify-content: space-between;',
    around: 'justify-content: space-around;',
    evenly: 'justify-content: space-evenly;',
  }
</script>

<div class={className} style="--row-gap: {gap}rem; {justifyStyles[justify]}" {...rest}>
  {@render children?.()}
</div>
