<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { HTMLAttributes } from 'svelte/elements'
  import '../styles/NavBar.css'

  export type NavbarProps = HTMLAttributes<HTMLElement> & {
    behavior?: 'static' | 'fixed' | 'hide-on-scroll'
    children?: Snippet
    disableSpacing?: boolean
  }

  let {
    behavior = 'fixed',
    class: customClass = '',
    style: customStyle = '',
    disableSpacing = false,
    children,
    ...rest
  }: NavbarProps = $props()

  let isHidden = $state(false)
  let mobileOpen = $state(false)
  let lastScrollY = 0

  function handleScroll() {
    const currentScrollY = window.scrollY

    if (currentScrollY < 64) {
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

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  })

  function toggleMobile() {
    mobileOpen = !mobileOpen
  }
</script>

<nav
  class="navbar-container {customClass}"
  class:behavior-static={behavior === 'static'}
  class:behavior-fixed={behavior === 'fixed' || behavior === 'hide-on-scroll'}
  class:is-hidden={isHidden}
  style={customStyle}
  {...rest}
>
  <div class="navbar-inner">
    <button
      class="navbar-hamburger"
      onclick={toggleMobile}
      aria-expanded={mobileOpen}
      aria-label="Toggle navigation"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
    <div class="navbar-content" class:mobile-open={mobileOpen}>
      {@render children?.()}
    </div>
  </div>
</nav>

{#if behavior !== 'static' && !disableSpacing}
  <div class="navbar-page-spacer"></div>
{/if}
