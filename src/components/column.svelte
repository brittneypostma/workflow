<script>
  import { fly } from 'svelte/transition'
  import {
    deleteKanbanColumn,
    changePosition,
    editColumnName,
  } from '../store/board.store'
  import { draggable } from '../actions/draggable'

  export let index
  export let id
  export let title

  let isDragged = false
</script>

<div
  id={index}
  class="grid flex-shrink-0 w-64 h-full grid-cols-1 p-2 space-y-2 text-center border-2 rounded select-none grid-rows-layout"
  use:draggable
  transition:fly={{ x: -100 }}
  on:over
  on:dragged={(e) => {
    isDragged = e.detail
  }}
  on:dropped
>
  <div class="flex w-full space-x-2">
    <input
      on:mousedown|stopPropagation
      on:blur={(e) => editColumnName(id, e.target.value)}
      value={title}
      type="text"
      class="w-full overflow-hidden text-sm font-thin text-center bg-transparent border-b-2 cursor-text focus:outline-none"
    />
    <!-- Delete column button, would like to remove id once bugs are fixed -->
    <button class="bg-red-400" on:click={() => deleteKanbanColumn(id)}>
      <!-- Trash icon -->
      <span class="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-trash"
          viewBox="0 0 16 16"
        >
          <path
            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
          />
          <path
            fill-rule="evenodd"
            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
          />
        </svg>
        id:{id}</span
      ></button
    >
  </div>
  <p>There are no cards here, lets add some.</p>

  <button
    class="self-end btn-primary "
    on:click={() => {
      /** TODO */
    }}
  >
    Add a Card</button
  >
</div>
{#if isDragged}
  <div
    id={index}
    class="grid flex-shrink-0 w-64 h-full grid-cols-1 p-2 space-y-2 text-center border-2 rounded select-none grid-rows-layout"
    transition:fly={{ x: -100, delay: 0, duration: 200 }}
  />
{/if}
