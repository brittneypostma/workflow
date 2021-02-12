<script>
  import { deleteKanbanColumn } from '../store/board.store'
  import { fly } from 'svelte/transition'
  import TitleInput from './column.titleInput.svelte'
  export let id
  export let title
  let isTitleEditing = false
</script>

<div
  {id}
  class="kanban-column"
  transition:fly={{ x: 0, y: 300, opacity: 0, duration: 200 }}
>
  <header
    class="text-sm font-thin h-5 border-b-2 border-blue-600 overflow-hidden"
    on:click={() => (isTitleEditing = true)}
  >
    {#if isTitleEditing}
      <TitleInput {title} {id} on:blur={() => (isTitleEditing = false)} />
    {:else}
      {title}
    {/if}
  </header>

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
    @apply w-36 h-full bg-gray-200 border-gray-500 border-2 flex flex-col p-2 text-center space-y-2;
  }
</style>
