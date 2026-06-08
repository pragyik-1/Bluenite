<script>
  import Row from './lib/ui/Row.svelte'
  import Button from './lib/ui/Button.svelte'
  import './app.css'
  import Input from './lib/ui/Input.svelte'
  import Dropdown from './lib/ui/Dropdown.svelte'
  import Select from './lib/ui/Select.svelte'
  import Card from './lib/ui/Card.svelte'
    import Modal from './lib/ui/Modal.svelte'

  let buttonRef = $state(null)
  let dropdownOpen = $state(false)
  let modalOpen = $state(false)
  let val = $state(null)
  $inspect(dropdownOpen)
</script>

<p>Hello world</p>

<Card style="margin-bottom: 1rem">
  <Button>Hello World!</Button>
  <Button variant="outline">Hello World!</Button>
  <Button variant="ghost">Hello World!</Button>
</Card>

<Button onclick={() => (dropdownOpen = !dropdownOpen)} bind:ref={buttonRef}>
  Dropdown
</Button>

<Dropdown bind:open={dropdownOpen} anchor={buttonRef}>Hello</Dropdown>

<Input type="file" />

<Row gap={1}>
  <p>Hello World</p>
  <p>Hello World</p>
  <p>Hello World</p>
  <p>Hello World</p>
</Row>

<Select value={val} options={[{ value: 'apple', label: 'Apple' }]} />
<Button onclick={() => (modalOpen = true)}>Open Modal</Button>
<Modal bind:open={modalOpen}>Hello World</Modal>
