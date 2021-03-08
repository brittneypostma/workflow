<script>
  import { createEventDispatcher } from 'svelte'
  import Button from './button.svelte'
  export let column
  export let card

  let cardTitle = card.title
  const dispatch = createEventDispatcher()

  function save() {
    if (!cardTitle) {
      alert('A card must have a title.')
      return
    }

    dispatch('cardUpdated', {
      column,
      card: {
        id: card.id,
        title: cardTitle,
      },
    })
  }

  function remove() {
    dispatch('cardRemoved', {
      column,
      id: card.id,
    })
  }

  function close() {
    dispatch('trayClosed', null)
  }
</script>

<aside
  class="h-screen w-96 p-4 flex flex-col space-y-4 fixed top-0 right-0 bg-gray-500 shadow-lg z-50"
>
  <div class="font-bold text-xl">{cardTitle || 'Card'}</div>
  <div class="flex flex-col space-y-1">
    <label for="title" class="text-sm">Title</label>
    <input
      id="title"
      bind:value={cardTitle}
      class="p-2 rounded bg-gray-200 text-gray-800	"
    />
  </div>
  <div class="flex flex-row space-x-3">
    <Button on:click={save} color="green" class="flex-1">Save</Button>
    <Button on:click={close} color="yellow" class="flex-1">Cancel</Button>
    <Button on:click={remove} color="red" class="flex-1">Delete</Button>
  </div>
</aside>
