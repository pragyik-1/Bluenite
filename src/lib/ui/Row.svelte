<script lang="ts">
  import type { Snippet } from 'svelte'
  import '../styles/Row.css'
  import type { HTMLAttributes } from 'svelte/elements'

  type RowProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
    children?: Snippet
    gap?: number
    justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  }

  let { children, gap = 0, justify = 'start', ...rest }: RowProps = $props()

  const justifyStyles = {
    start: 'justify-contnet: flex-start;',
    center: 'justify-content: center;',
    end: 'justify-content: flex-end;',
    between: 'justify-content: space-between;',
    around: 'justify-content: space-around;',
    evenly: 'justify-content: space-evenly;',
  }
</script>

<div
  class="row-container"
  style="--row-gap: {gap}rem; {justifyStyles[justify]}"
  {...rest}
>
  {@render children?.()}
</div>
