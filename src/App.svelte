<script>
  import {
    Row,
    Button,
    Input,
    Dropdown,
    Select,
    Card,
    Modal,
    Switch,
    NavBar,
    Textarea,
    ToastManager,
    toast,
    toggleTheme,
  } from './lib'

  let buttonRef = $state(null)
  let dropdownOpen = $state(false)
  let modalOpen = $state(false)
  let val = $state(null)
</script>

<NavBar behavior="hide-on-scroll">
  <div>Hello World</div>
</NavBar>

<p>Hello world</p>

<Card style="margin-bottom: 1rem">
  <Button>Hello World!</Button>
  <Button variant="outline">Hello World!</Button>
  <Button variant="ghost">Hello World!</Button>
</Card>

<Button onclick={() => (dropdownOpen = !dropdownOpen)} bind:ref={buttonRef}>Dropdown</Button>

<Dropdown bind:open={dropdownOpen} anchor={buttonRef}>Hello</Dropdown>

<Input type="file" />
<Input />

<Row gap={1}>
  <p>Hello World</p>
  <p>Hello World</p>
  <p>Hello World</p>
  <p>Hello World</p>
</Row>

<Select
  value={val}
  options={[
    { value: 'apple', label: 'Apple' },
    { value: 'sauce', label: 'apple' },
  ]}
/>
<Button onclick={() => (modalOpen = true)}>Open Modal</Button>
<Button onclick={() => toast.show({ message: 'Cool Toast', variant: 'warn' })}>Show toast</Button>
<Button onclick={toggleTheme}>Toogle themne</Button>
<Switch size="md"></Switch>
<Textarea></Textarea>
<Modal bind:open={modalOpen}>Hello World</Modal>
<ToastManager />
