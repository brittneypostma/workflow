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
  class="self-start w-full bg-green-400 text-white dark:bg-green-600 dark:text-gray-400"
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
      class="p-2 rounded dark:placeholder-black dark:text-black dark:bg-gray-400"
      placeholder="Give it a title..."
    />
    <textarea
      bind:value={body}
      class="p-2 rounded dark:placeholder-black dark:text-black dark:bg-gray-400"
      placeholder="What is this card about ? "
    />
    <div class="flex flex-row space-x-3 dark:text-white">
      <button
        class="flex-1 rounded bg-green-200 dark:bg-green-600"
        on:click={add}>Add</button
      >
      <button
        class="flex-1 rounded bg-yellow-200 dark:bg-yellow-700"
        on:click={cancel}>Cancel</button
      >
    </div>
  </div>
{/if}
