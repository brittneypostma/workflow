<script>
  import { createEventDispatcher } from 'svelte'
  import Button from '../button.svelte'
  import PlusIcon from '../../icons/plus.svelte'

  const dispatch = createEventDispatcher()
  export let columnId
  let title = ''
  let body = ''
  let addingCard = false
  function add() {
    dispatch('addCard', {
      title,
      body,
      type: 'text',
      columnId,
    })
    cancel()
  }
  function cancel() {
    title = ''
    body = ''
    addingCard = false
  }
</script>

<button
  class="self-start w-full btn-primary"
  on:click={() => {
    addingCard = true
  }}
>
  <span class="flex justify-center">
    <PlusIcon />
    Add a Card
  </span>
</button>
{#if addingCard}
  <div class="flex flex-col space-y-3">
    <input
      bind:value={title}
      type="text"
      class="p-2 rounded dark:placeholder-black dark:text-black"
      placeholder="Give it a title..."
    />
    <textarea
      bind:value={body}
      class="p-2 rounded dark:placeholder-black dark:text-black"
      placeholder="What is this card about ? "
    />
    <div class="flex flex-row space-x-3">
      <Button color="green" class="flex-1" on:click={add}>Add</Button>
      <Button color="yellow" class="flex-1" on:click={cancel}>Cancel</Button>
    </div>
  </div>
{/if}
