<script>
  import { addKanbanColumn } from '../store/board.store'
</script>

<div
  id="kanban-area"
  class="flex w-full h-full space-x-4 overflow-x-auto no-wrap"
>
  <slot />
  <button
    class="relative flex-shrink-0 w-64 p-2 text-xs border-2 border-black rounded dark:border-white focus:outline-none focus:ring-2 focus:ring-accent"
    on:click={addKanbanColumn}
  >
    Add New Column</button
  >
</div>
