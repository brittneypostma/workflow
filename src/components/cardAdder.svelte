<script>
  import { createEventDispatcher } from 'svelte'
  import { v4 as uuid } from 'uuid'
  import Button from './button.svelte'

  const dispatch = createEventDispatcher()

  let newCardTitle = ''

  function add() {
    const card = {
      id: uuid(),
      title: newCardTitle,
    }
    console.log(card)
    dispatch('add', { card: card })
  }

  function cancel() {
    dispatch('cancel')
  }
</script>

<div class="flex flex-col space-y-3">
  <input
    bind:value={newCardTitle}
    class="rounded p-2"
    placeholder="Give it a title..."
  />
  <div class="flex flex-row space-x-3">
    <Button color="green" class="flex-1" on:click={add}>Add</Button>
    <Button color="yellow" class="flex-1" on:click={cancel}>Cancel</Button>
  </div>
</div>
