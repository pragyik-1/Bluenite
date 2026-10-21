<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { HTMLAttributes } from 'svelte/elements'
  import { cn } from '../cn'
  import type { BlueniteProps } from '../types'
  import '../styles/NavBar.css'

  export type NavbarProps = HTMLAttributes<HTMLElement> &
    BlueniteProps & {
      behavior?: 'static' | 'fixed' | 'hide-on-scroll'
      children?: Snippet
      disableSpacing?: boolean
      height?: string
      mobile?: boolean
      scrollThreshold?: number
    }

  let {
    behavior = 'fixed',
    class: _class,
    overrideClasses,
    style: customStyle = '',
    disableSpacing = false,
    height = '64px',
    mobile = true,
    scrollThreshold = 64,
    children,
    ...rest
  }: NavbarProps = $props()

  let className = $derived(
    cn(overrideClasses, _class, 'navbar-container', mobile ? 'has-mobile' : undefined)
  )

  let generatedId = $props.id()
  let mobileMenuId = `navbar-menu-${generatedId}`

  let isHidden = $state(false)
  let mobileOpen = $state(false)
  let lastScrollY = 0

  function handleScroll() {
    const currentScrollY = window.scrollY

    if (mobileOpen || currentScrollY <= scrollThreshold) {
      isHidden = false
    } else if (currentScrollY > lastScrollY) {
      isHidden = true
    } else {
      isHidden = false
    }

    lastScrollY = currentScrollY
  }

  $effect(() => {
    if (behavior !== 'hide-on-scroll') {
      isHidden = false
      return
    }

    lastScrollY = window.scrollY
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  })

  $effect(() => {
    if (!mobileOpen) return
    const handleResize = () => {
      if (window.innerWidth > 768) mobileOpen = false
    }
    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  })

  function toggleMobile() {
    mobileOpen = !mobileOpen
  }
</script>

<nav
  class={className}
  class:behavior-static={behavior === 'static'}
  class:behavior-fixed={behavior === 'fixed' || behavior === 'hide-on-scroll'}
  class:is-hidden={isHidden}
  style="--navbar-height: {height}; {customStyle}"
  {...rest}
>
  <div class="navbar-inner">
    {#if mobile}
      <button
        type="button"
        class="navbar-hamburger"
        onclick={toggleMobile}
        aria-expanded={mobileOpen}
        aria-controls={mobileMenuId}
        aria-label="Toggle navigation"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          {#if mobileOpen}
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          {:else}
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          {/if}
        </svg>
      </button>
      <div
        id={mobileMenuId}
        class="navbar-content"
        class:mobile-open={mobileOpen}
      >
        {@render children?.()}
      </div>
    {:else}
      {@render children?.()}
    {/if}
  </div>
</nav>

{#if behavior !== 'static' && !disableSpacing}
  <div class="navbar-page-spacer" style="height: {height}"></div>
{/if}