<script lang="ts">
  import {
    Row,
    Button,
    Input,
    Dropdown,
    DropdownMenu,
    DropdownMenuItem,
    Select,
    Card,
    Modal,
    Switch,
    Navbar,
    Textarea,
    ToastManager,
    toast,
    toggleTheme,
    theme,
    initTheme,
  } from './lib'
  import { onMount } from 'svelte'

  type Variant = 'primary' | 'secondary' | 'success' | 'danger' | 'warn' | 'info'
  type Placement = 'top' | 'right' | 'bottom' | 'left' | 'bottom-start' | 'bottom-end'
  type ToastPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'

  let buttonRef = $state<HTMLButtonElement | null>(null)
  let dropdownOpen = $state(false)
  let dropdownPlacement = $state<Placement>('bottom')

  let menuRef = $state<HTMLButtonElement | null>(null)
  let dropdownMenuOpen = $state(false)

  let modalOpen = $state(false)
  let modalSize = $state<'sm' | 'md' | 'lg'>('md')

  let selectValue = $state('apple')
  let selectNameValue = $state('banana')
  let inputValue = $state('')
  let textareaValue = $state('')
  let switchValue = $state(false)

  const variants: Variant[] = ['primary', 'secondary', 'success', 'danger', 'warn', 'info']
  const placements: Placement[] = ['bottom', 'top', 'left', 'right', 'bottom-start', 'bottom-end']
  const toastPositions: ToastPosition[] = [
    'top-left',
    'top-center',
    'top-right',
    'bottom-left',
    'bottom-center',
    'bottom-right',
  ]

  onMount(() => {
    initTheme()
  })

  function handleThemeToggle() {
    toggleTheme()
  }

  function showToast(variant: Variant) {
    toast.show({
      message: `${variant[0].toUpperCase()}${variant.slice(1)} toast`,
      description: 'This is the description text.',
      variant,
    })
  }
</script>

<Navbar behavior="hide-on-scroll">
  <strong>Bluenite</strong>
  <Button size="sm" variant="ghost" onclick={handleThemeToggle}>
    {theme.value === 'dark' ? 'Light mode' : 'Dark mode'}
  </Button>
</Navbar>

<main class="page">
  <header class="page-header">
    <h1>Component Test Page</h1>
    <p class="muted">Every variant, size, and state in one place.</p>
  </header>

  <section>
    <h2>Color tokens</h2>
    <div class="palette">
      {#each variants as color (color)}
        <div class="swatch">
          <div class="swatch-color" style="background: var(--{color})"></div>
          <span class="swatch-label">{color}</span>
        </div>
      {/each}
    </div>
  </section>

  <section>
    <h2>Button</h2>

    <h3>Variants</h3>
    <div class="row">
      <Button>Fill</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>

    <h3>Colors</h3>
    <div class="row">
      {#each variants as color (color)}
        <Button {color}>{color}</Button>
      {/each}
    </div>

    <h3>Outline by color</h3>
    <div class="row">
      {#each variants as color (color)}
        <Button variant="outline" {color}>{color}</Button>
      {/each}
    </div>

    <h3>Ghost by color</h3>
    <div class="row">
      {#each variants as color (color)}
        <Button variant="ghost" {color}>{color}</Button>
      {/each}
    </div>

    <h3>Sizes</h3>
    <div class="row row-center">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>

    <h3>States</h3>
    <div class="row">
      <Button loading>Saving...</Button>
      <Button disabled>Disabled</Button>
      <Button variant="outline" disabled>Disabled</Button>
      <Button variant="ghost" disabled>Disabled</Button>
    </div>

    <h3>With icons</h3>
    <div class="row">
      <Button>
        {#snippet icon()}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M5 12h14M12 5v14"/>
          </svg>
        {/snippet}
        Add item
      </Button>
      <Button variant="outline" color="danger">
        {#snippet icon()}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
          </svg>
        {/snippet}
        Delete
      </Button>
    </div>
  </section>

  <section>
    <h2>Input</h2>
    <div class="grid-2">
      <Input label="Default" placeholder="Type something..." bind:value={inputValue} />
      <Input label="With helper" placeholder="email@example.com" helperText="We'll never share your email." />
      <Input label="With error" placeholder="..." error="This field is required." />
      <Input label="Disabled" placeholder="..." disabled value="Can't edit this" />
      <Input type="file" label="File input" />
      <Input type="password" label="Password" placeholder="••••••••" />
    </div>
  </section>

  <section>
    <h2>Textarea</h2>
    <div class="grid-2">
      <Textarea label="Default" placeholder="Write a message..." bind:value={textareaValue} />
      <Textarea label="With helper" placeholder="..." helperText="Max 500 characters." />
    </div>
  </section>

  <section>
    <h2>Select</h2>
    <div class="grid-2">
      <Select
        label="Fruit"
        placeholder="Pick a fruit"
        bind:value={selectValue}
        options={[
          { value: 'apple', label: 'Apple' },
          { value: 'banana', label: 'Banana' },
          { value: 'cherry', label: 'Cherry' },
        ]}
      />
      <Select
        label="With form name"
        bind:value={selectNameValue}
        options={[
          { value: 'apple', label: 'Apple' },
          { value: 'banana', label: 'Banana' },
          { value: 'cherry', label: 'Cherry' },
        ]}
      />
    </div>
  </section>

  <section>
    <h2>Switch</h2>

    <h3>Sizes</h3>
    <div class="row row-center">
      <Switch size="sm" label="Small" bind:checked={switchValue} />
      <Switch size="md" label="Medium" />
      <Switch size="lg" label="Large" />
    </div>

    <h3>States</h3>
    <div class="row row-center">
      <Switch label="Off" />
      <Switch label="On" checked />
      <Switch label="Disabled off" disabled />
      <Switch label="Disabled on" checked disabled />
    </div>
  </section>

  <section>
    <h2>Card</h2>
    <div class="grid-2">
      <Card title="Card with title" subtitle="Subtitle goes here">
        <p>This is the card body content.</p>
      </Card>

      <Card title="Card with footer">
        <p>Body content here.</p>
        {#snippet footer()}
          <Button variant="ghost" size="sm">Cancel</Button>
          <Button size="sm">Confirm</Button>
        {/snippet}
      </Card>

      <Card interactive title="Interactive card" subtitle="Click me">
        <p>Responds to hover and can be focused with Tab.</p>
      </Card>

      <Card noPadding title="No padding">
        <div style="padding: var(--space-5);">Content with custom padding.</div>
      </Card>
    </div>
  </section>

  <section>
    <h2>Dropdown</h2>

    <div class="row">
      <Button bind:ref={buttonRef} onclick={() => (dropdownOpen = !dropdownOpen)}>
        Toggle dropdown
      </Button>
    </div>

    <Dropdown bind:open={dropdownOpen} anchor={buttonRef} placement={dropdownPlacement}>
      <div class="dropdown-menu">
        <button class="dropdown-item">Profile</button>
        <button class="dropdown-item">Settings</button>
        <button class="dropdown-item">Sign out</button>
      </div>
    </Dropdown>

    <h3>Placement</h3>
    <div class="row">
      {#each placements as p (p)}
        <Button
          size="sm"
          variant={dropdownPlacement === p ? 'fill' : 'outline'}
          onclick={() => (dropdownPlacement = p)}
        >
          {p}
        </Button>
      {/each}
    </div>

    <h3>DropdownMenu (accessible)</h3>
    <div class="row">
      <Button bind:ref={menuRef} onclick={() => (dropdownMenuOpen = !dropdownMenuOpen)}>
        Open dropdown menu
      </Button>
    </div>

    <DropdownMenu bind:open={dropdownMenuOpen} anchor={menuRef} label="Actions">
      <DropdownMenuItem onclick={() => (dropdownMenuOpen = false)}>Profile</DropdownMenuItem>
      <DropdownMenuItem onclick={() => (dropdownMenuOpen = false)}>Settings</DropdownMenuItem>
      <DropdownMenuItem destructive onclick={() => (dropdownMenuOpen = false)}>Sign out</DropdownMenuItem>
    </DropdownMenu>
  </section>

  <section>
    <h2>Modal</h2>
    <div class="row">
      {#each ['sm', 'md', 'lg'] as s (s)}
        <Button onclick={() => { modalSize = s as 'sm' | 'md' | 'lg'; modalOpen = true }}>
          Open {s}
        </Button>
      {/each}
    </div>

    <Modal bind:open={modalOpen} title="Example Modal" size={modalSize}>
      <p>This is the modal body content.</p>
      <p>Press Escape or click the backdrop to close. Tab should cycle through focusable elements.</p>
      <div class="modal-actions">
        <Button variant="ghost" onclick={() => (modalOpen = false)}>Cancel</Button>
        <Button onclick={() => (modalOpen = false)}>Confirm</Button>
      </div>
    </Modal>
  </section>

  <section>
    <h2>Toast</h2>

    <h3>Variants</h3>
    <div class="row">
      {#each variants as variant (variant)}
        <Button variant="fill" color={variant} onclick={() => showToast(variant)}>{variant}</Button>
      {/each}
    </div>

    <h3>Content</h3>
    <div class="row">
      <Button
        variant="outline"
        onclick={() => toast.show({ message: 'Short toast with message only.' })}
      >
        Message only
      </Button>
      <Button
        variant="outline"
        onclick={() => toast.show({ message: 'Long message', description: 'And a description underneath for extra context.' })}
      >
        Message + description
      </Button>
    </div>

    <h3>Positions</h3>
    <div class="row">
      {#each toastPositions as pos (pos)}
        <Button
          size="sm"
          variant="outline"
          onclick={() =>
            toast.show({
              message: `Toast at ${pos}`,
              description: 'Positioned via toast.show()',
              position: pos,
            })}
        >
          {pos}
        </Button>
      {/each}
    </div>

    <h3>Configure defaults</h3>
    <div class="row">
      <Button
        variant="outline"
        onclick={() => {
          toast.configure({ duration: 2000, position: 'top-center' })
          toast.show({ message: 'Configured defaults', description: '2s duration, top-center' })
        }}
      >
        Configure defaults
      </Button>
      <Button
        variant="ghost"
        onclick={() => {
          toast.configure({ duration: 4000, position: 'bottom-right' })
          toast.clear()
        }}
      >
        Reset defaults & clear
      </Button>
    </div>
  </section>

  <section>
    <h2>Row layout</h2>
    <Row gap={2}>
      <div class="box">1</div>
      <div class="box">2</div>
      <div class="box">3</div>
      <div class="box">4</div>
    </Row>
  </section>
</main>

<ToastManager />

<style>
  .page {
    max-width: 960px;
    margin: 0 auto;
    padding: var(--space-8) var(--space-6) var(--space-16);
    display: flex;
    flex-direction: column;
    gap: var(--space-10);
  }

  .page-header {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .page h1 {
    margin: 0;
    font-size: 1.75rem;
    font-weight: 600;
    line-height: 1.2;
  }

  .page h2 {
    margin: 0 0 var(--space-4);
    font-size: 1.25rem;
    font-weight: 600;
    padding-bottom: var(--space-2);
    border-bottom: 1px solid var(--border);
  }

  .page h3 {
    margin: var(--space-5) 0 var(--space-2);
    font-size: 0.8125rem;
    font-weight: 500;
    color: var(--secondary-text);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .page h3:first-of-type {
    margin-top: 0;
  }

  .page section {
    display: flex;
    flex-direction: column;
  }

  .page p {
    margin: 0;
  }

  .muted {
    color: var(--secondary-text);
    font-size: 0.9375rem;
  }

  .row {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-3);
    align-items: flex-start;
  }

  .row-center {
    align-items: center;
  }

  .grid-2 {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: var(--space-4);
  }

  .palette {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: var(--space-3);
  }

  .swatch {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .swatch-color {
    height: 56px;
    border-radius: var(--round-md);
    border: 1px solid var(--border);
  }

  .swatch-label {
    font-size: 0.8125rem;
    color: var(--secondary-text);
    font-family: var(--font-mono);
  }

  .dropdown-menu {
    display: flex;
    flex-direction: column;
    padding: var(--space-1);
    min-width: 180px;
  }

  .dropdown-item {
    background: none;
    border: none;
    text-align: left;
    padding: var(--space-2) var(--space-3);
    border-radius: var(--round-sm);
    color: var(--primary-text);
    font: inherit;
    font-size: 0.9375rem;
    cursor: pointer;
    transition: background-color 0.15s ease;
  }

  .dropdown-item:hover {
    background: var(--surface-hover);
  }

  .modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: var(--space-2);
    margin-top: var(--space-5);
  }

  .box {
    padding: var(--space-4) var(--space-6);
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--round-md);
    color: var(--primary-text);
    font-weight: 500;
  }
</style>