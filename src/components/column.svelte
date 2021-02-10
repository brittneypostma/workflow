<script>
  import { deleteKanbanColumn } from '../store/board.store'
  import { slide } from 'svelte/transition'
  export let id
</script>

<div {id} class="kanban-column" transition:slide>
  <div class="flex-1">
    <slot>
      <p class="text-sm text-gray-500">
        There are no cards here, lets add some or...
        <button
          class="kanban-button bg-red-400"
          on:click={() => deleteKanbanColumn(id)}>Delete Column</button
        >
      </p>
    </slot>
  </div>

  <button class="kanban-button self-center"> Add a Card</button>
</div>

<style>
  .kanban-column {
    @apply w-36 h-full bg-gray-200 border-gray-500 border-2 flex flex-col p-2 text-center;
  }
</style>
