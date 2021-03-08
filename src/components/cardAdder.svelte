<script>
  import { createEventDispatcher } from 'svelte'
  import { v4 as uuid } from 'uuid'
  import { addCard } from '../store/card'
  import Button from './button.svelte'

  const dispatch = createEventDispatcher()
  export let columnId
  let newCardTitle = ''

  function add() {
    const card = {
      id: uuid(),
      title: newCardTitle,
    }
    addCard(columnId, card)
    dispatch('cancel') //close 'cardAdder' after adding the card.
  }

  function cancel() {
    dispatch('cancel')
  }
</script>

<div class="flex flex-col space-y-3">
  <input
    bind:value={newCardTitle}
    class="p-2 rounded dark:placeholder-black dark:text-black"
    placeholder="Give it a title..."
  />
  <div class="flex flex-row space-x-3">
    <Button color="green" class="flex-1" on:click={add}>Add</Button>
    <Button color="yellow" class="flex-1" on:click={cancel}>Cancel</Button>
  </div>
</div>
