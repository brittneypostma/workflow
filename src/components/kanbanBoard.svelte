<script>
  import { boardStore } from '../store/board.store'
  import { cardsStore } from '../store/card.store'
  import { setContext } from 'svelte'
  setContext('cardsStore', cardsStore)
  setContext('boardStore', boardStore)
  const { addKanbanColumn } = boardStore
</script>

<div
  id="kanban-area"
  class="flex w-full h-full space-x-4 overflow-x-auto no-wrap"
>
  <slot />
  <button
    class="relative flex-shrink-0 w-32 p-2 text-xs transition-colors border-2 border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-accent hover:bg-gray-100 dark:hover:bg-gray-800"
    on:click={addKanbanColumn}
  >
    Add New Column
  </button>
</div>
