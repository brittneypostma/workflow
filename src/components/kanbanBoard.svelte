<script>
  import { addKanbanColumn } from '../store/board.store'
</script>

<main class="flex flex-row h-full min-w-full overflow-x-scroll p-4 space-x-3">
  <slot>
    <p class="text-2xl font-thin text-gray-500 self-center w-full text-center">
      There are no columns in this board create one!
    </p>
  </slot>
  <div>
    <button class="kanban-button" on:click={addKanbanColumn}>
      Add Column</button
    >
  </div>
</main>
