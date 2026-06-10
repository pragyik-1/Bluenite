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
    {@render children?.()}
  </div>
</nav>

{#if behavior !== 'static' && !disableSpacing}
  <div class="navbar-page-spacer"></div>
{/if}
