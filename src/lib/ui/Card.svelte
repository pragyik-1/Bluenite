<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { HTMLAttributes } from 'svelte/elements'
  import { cn } from '../cn'
  import type { BlueniteProps } from '../types'
  import '../styles/Card.css'

  export type CardProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> &
    BlueniteProps & {
      title?: string
      subtitle?: string
      interactive?: boolean
      noPadding?: boolean
      header?: Snippet
      children?: Snippet
      footer?: Snippet
    }

  let {
    title,
    subtitle,
    interactive = false,
    noPadding = false,
    header,
    children,
    footer,
    class: _class,
    overrideClasses,
    ...rest
  }: CardProps = $props()

  let className = $derived(cn(overrideClasses, _class, 'card'))
</script>

<div
  class={className}
  class:interactive
  class:no-padding={noPadding}
  {...rest}
>
  {#if title || subtitle || header}
    <div class="card-header">
      {#if header}
        {@render header()}
      {:else}
        {#if title}<h3 class="card-title">{title}</h3>{/if}
        {#if subtitle}<p class="card-subtitle">{subtitle}</p>{/if}
      {/if}
    </div>
  {/if}

  {#if children}
    <div class="card-content">
      {@render children()}
    </div>
  {/if}

  {#if footer}
    <div class="card-footer">
      {@render footer()}
    </div>
  {/if}
</div>
