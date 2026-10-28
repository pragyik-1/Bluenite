# Bluenite

Note: This library was created mainly for personal use in my own projects.

A dark-mode-first UI component library for [Svelte 5](https://svelte.dev), built with the [runes](https://svelte.dev/docs/svelte/what-are-runes) API.

## Features

- **Svelte 5 runes**: Every component uses the modern `$props()`, `$state`, `$derived`, `$effect`, and `$bindable` API.
- **Theming**: CSS custom properties with explicit light/dark switching and `localStorage` persistence via `initTheme()`.
- **TypeScript**: First-class types and exported prop types for every component.
- **Snippets**: Content is passed via [snippets](https://svelte.dev/docs/svelte/snippets).
- **Floating UI**: Dropdowns are positioned with `@floating-ui/dom`.
- **Accessible**: ARIA attributes, keyboard navigation, and focus management built in.
- **CSS exports**: `@hermitk/bluenite/styles` and `@hermitk/bluenite/styles/*` available.

## Installation

```bash
npm install @hermitk/bluenite
```

Requires `svelte@^5.0.0` as a peer dependency.

## Quick start

```svelte
<script>
  import { Button, Input, theme, toggleTheme, initTheme } from '@hermitk/bluenite'
  import { onMount } from 'svelte'
  import '@hermitk/bluenite/styles'

  onMount(() => initTheme())
</script>

<button onclick={toggleTheme}>
  {theme.value === 'dark' ? 'Switch to light' : 'Switch to dark'}
</button>

<Input label="Name" placeholder="Enter your name" />

<Button color="primary" onclick={() => console.log('clicked')}>Click me</Button>
```

> **Note:** Bluenite is dark-mode-first. Initialize with `initTheme()` and use `toggleTheme()` or `setTheme()`. The chosen theme is persisted to `localStorage`. Theme changes apply atomically; transitions are briefly suppressed to avoid color flashes.

## Components

| Component                                                              | Description                                                   |
| ---------------------------------------------------------------------- | ------------------------------------------------------------- |
| [`Button`](#button)                                                    | Button with variants, colors, sizes, icons, and loading state |
| [`Card`](#card)                                                        | Surface container for grouping content                        |
| [`Row` / `Col`](#row--col)                                             | Flexbox layout helpers                                        |
| [`Input`](#input)                                                      | Text input with label, error, and helper text                 |
| [`Textarea`](#textarea)                                                | Multi-line text input with label, error, and helper text      |
| [`Select`](#select)                                                    | Dropdown select with keyboard navigation and form support     |
| [`Dropdown`](#dropdown)                                                | Floating container positioned relative to an anchor element   |
| [`DropdownMenu` / `DropdownMenuItem`](#dropdownmenu--dropdownmenuitem) | Accessible dropdown menu with keyboard navigation             |
| [`Switch`](#switch)                                                    | Toggle switch                                                 |
| [`Modal`](#modal)                                                      | Dialog overlay                                                |
| [`Navbar`](#navbar)                                                    | Navigation bar container                                      |
| [`Toast` / `ToastManager`](#toast--toastmanager)                       | Notification toasts with positions                            |

## Usage

### Button

```svelte
<Button variant="fill" color="primary" size="md">Submit</Button>
<Button variant="outline" color="danger">Delete</Button>
<Button variant="ghost" loading>Loading…</Button>
```

**Props:** `variant: 'fill' | 'outline' | 'ghost'` (default `'fill'`), `color: 'primary' | 'secondary' | 'success' | 'danger' | 'warn' | 'info'` (default `'primary'`), `size: 'sm' | 'md' | 'lg'` (default `'md'`), `loading: boolean`, `icon: Snippet`.

### Input

```svelte
<Input bind:value={name} label="Name" placeholder="Jane Doe" />
<Input label="Email" error="A valid email is required" />
<Input label="Bio" helperText="Max 200 characters" />
```

**Props:** `label`, `error`, `helperText`, `value` (bindable), `ref` (bindable), plus all standard `HTMLInputAttributes`.

### Select

```svelte
<script>
  import { Select } from '@hermitk/bluenite'

  let value = $state('us')
  const options = [
    { label: 'United States', value: 'us' },
    { label: 'Canada', value: 'ca' },
    { label: 'Mexico', value: 'mx' },
  ]
</script>

<Select {options} bind:value label="Country" name="country" />
```

**Props:** `options`, `value` (bindable), `label`, `placeholder`, `name`, `required`, `error`, `helperText`, `disabled`, plus `optionClass`, `optionStyle`, `wrapperClass`, and `wrapperStyle`.

### DropdownMenu / DropdownMenuItem

`Dropdown` is the bare positioned container. `DropdownMenu` adds an accessible `role="menu"` list, keyboard navigation, and item styling.

```svelte
<script>
  import { DropdownMenu, DropdownMenuItem } from '@hermitk/bluenite'

  let anchor = $state(null)
  let open = $state(false)
</script>

<button bind:this={anchor} onclick={() => (open = !open)}>Actions</button>

<DropdownMenu bind:open {anchor} label="Actions">
  <DropdownMenuItem onclick={() => (open = false)}>Profile</DropdownMenuItem>
  <DropdownMenuItem destructive onclick={() => (open = false)}>Sign out</DropdownMenuItem>
</DropdownMenu>
```

### Toast / ToastManager

```svelte
<script>
  import { ToastManager, toast } from '@hermitk/bluenite'
</script>

<ToastManager />
<Button onclick={() => toast.show({ message: 'Saved!', variant: 'success' })}>Save</Button>
```

API: `toast.show({ message, description, variant, duration })` returns an id; `toast.dismiss(id)` removes a toast.

### Navbar

```svelte
<Navbar behavior="fixed" height="64px">
  <strong>Bluenite</strong>
</Navbar>
```

**Props:** `behavior: 'static' | 'fixed' | 'hide-on-scroll'` (default `'fixed'`), `height` (default `'64px'`), `mobile` (default `true`), `scrollThreshold` (default `64`), `disableSpacing`.

## Theming

All colors and radii are exposed as CSS custom properties on `:root`. Override any of them to customize the look:

```css
:root {
  --primary: rgb(99, 102, 241);
  --primary-hover: rgb(79, 70, 229);
  --round-sm: 0.25rem;
  --round-md: 0.5rem;
  --round-lg: 0.8rem;
  --round-xl: 1.25rem;
}
```

## Development

```bash
npm install        # install dependencies
npm run dev        # start the demo app
npm run build      # bundle the library into dist/
npm run check      # type-check with svelte-check
npm run test       # run unit tests
npm run lint       # lint source
npm run format     # format source
```

## License

[MIT](./LICENSE)
