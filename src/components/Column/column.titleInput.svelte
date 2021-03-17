<script>
  import { onMount } from 'svelte'
  import { editColumnName } from '../store/board.store'
  /** @type {string} */
  export let title
  /** @type {number} */
  export let id
  /** @type {HTMLInputElement} */
  let inputField
  onMount(() => {
    inputField.value = title
    inputField.focus()
    inputField.select()
  })
</script>

<input
  class="outline-none w-full border-0 bg-transparent text-center"
  type="text"
  on:blur
  on:change={(e) => editColumnName(id, e.target.value)}
  bind:this={inputField}
/>
