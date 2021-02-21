<script>
  import { fly } from 'svelte/transition'
  import { deleteKanbanColumn, editColumnName } from '../store/board.store'
  import { draggable } from '../actions/draggable'

  export let index
  export let id
  export let title
</script>

<div
  id={index}
  class="grid flex-shrink-0 w-64 h-full grid-cols-1 p-2 space-y-2 text-center border-2 rounded cursor-move select-none border-secondary-900 bg-primary-100 dark:bg-primary-800 dark:border-primary-200"
  use:draggable
  transition:fly={{ x: -100 }}
  on:over
  on:dragged
  on:dropped
>
  <div>
    <div class="flex self-start w-full mb-2 space-x-2">
      <input
        on:mousedown|stopPropagation
        on:blur={(e) => editColumnName(id, e.target.value)}
        value={title}
        type="text"
        class="w-full overflow-hidden text-sm font-thin text-center bg-transparent border-b border-secondary-900 cursor-text focus:outline-none"
      />
      <!-- Delete column button, would like to remove id once bugs are fixed -->
      <button
        class="text-white bg-red-500"
        on:click={() => deleteKanbanColumn(id)}
      >
        <!-- Trash icon -->
        <span class="flex items-center gap-2">
          <svg
            class="w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          id:{id}</span
        ></button
      >
    </div>
    <button
      class="self-start w-full btn-primary"
      on:click={() => {
        /** TODO */
      }}
    >
      <span class="flex justify-center">
        <svg
          class="w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg> Add a Card</span
      >
    </button>
  </div>
  <slot />
</div>
