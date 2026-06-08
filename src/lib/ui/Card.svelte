<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { HTMLAttributes } from 'svelte/elements'
  import '../styles/Card.css'

  export type CardProps = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
    title?: string
    subtitle?: string
    interactive?: boolean
    header?: Snippet
    children?: Snippet
    footer?: Snippet
  }

  let {
    title,
    subtitle,
    interactive = false,
    header,
    children,
    footer,
    class: customClass = '',
    ...rest
  }: CardProps = $props()
</script>

<div 
  class="card {customClass}" 
  class:interactive 
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