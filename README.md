# Bluenite

Note: This library was created mainly for personal use in my own projects.

A dark-mode-first UI component library for [Svelte 5](https://svelte.dev), built with the [runes](https://svelte.dev/docs/svelte/what-are-runes) API.

## Features

- **Svelte 5 runes**: Every component uses the modern `$props()`, `$state`, `$derived`, `$effect`, and `$bindable` API — no deprecated let/export syntax.
- **Theming**: CSS custom properties with automatic light/dark switching and `localStorage` persistence.
- **TypeScript**: First-class types and exported prop types for every component.
- **Snippets**: Content is passed via [snippets](https://svelte.dev/docs/svelte/snippets) instead of slots.
- **Floating UI**: Dropdowns are positioned with `@floating-ui/dom`.
- **Accessible**: ARIA attributes, keyboard navigation, and focus management built in.

## Installation

```bash
npm install bluenite
```

Requires `svelte@^5.0.0` as a peer dependency.

## Quick start

```svelte
<script>
  import { Button, Input, theme, toggleTheme } from 'bluenite'
</script>

<button onclick={toggleTheme}>
  {theme.value === 'dark' ? 'Switch to light' : 'Switch to dark'}
</button>

<Input label="Name" placeholder="Enter your name" />

<Button color="primary" onclick={() => console.log('clicked')}>
  Click me
</Button>
```

> **Note:** Bluenite is dark-mode-first. Add the class `light` or `dark` to your root `<html>` element to select a theme, or call `toggleTheme()` programmatically. The chosen theme is persisted to `localStorage`.

## Components

| Component | Description |
| --- | --- |
| [`Button`](#button) | Button with variants, colors, sizes, icons, and loading state |
| [`Card`](#card) | Surface container for grouping content |
| [`Row` / `Col`](#row--col) | Flexbox layout helpers |
| [`Input`](#input) | Text input with label, error, and helper text |
| [`Textarea`](#textarea) | Multi-line text input with label, error, and helper text |
| [`Select`](#select) | Accessible dropdown select with keyboard navigation |
| [`Dropdown`](#dropdown) | Floating menu positioned relative to an anchor element |
| [`Switch`](#switch) | Toggle switch |
| [`Modal`](#modal) | Dialog overlay |
| [`NavBar`](#navbar) | Navigation bar container |
| [`Toast` / `ToastManager`](#toast--toastmanager) | Notification toasts |

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
  import { Select } from 'bluenite'

  let value = $state('us')
  const options = [
    { label: 'United States', value: 'us' },
    { label: 'Canada', value: 'ca' },
    { label: 'Mexico', value: 'mx' }
  ]
</script>

<Select {options} bind:value label="Country" />
```

### Toast

```svelte
<script>
  import { ToastManager, toast } from 'bluenite'
</script>

<ToastManager />
<Button onclick={() => toast.show({ message: 'Saved!', variant: 'success' })}>
  Save
</Button>
```

API: `toast.show({ message, description, variant, duration })` returns an id; `toast.dismiss(id)` removes a toast.

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
