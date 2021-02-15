<script>
  import { fly } from 'svelte/transition'
  import {
    deleteKanbanColumn,
    reverseState,
    changePosition,
  } from '../store/board.store'
  import { draggable } from '../actions/draggable'
  import TitleInput from './column.titleInput.svelte'

  export let index
  export let id
  export let title
  
  let isTitleEditing = false
  let isDragged = false
</script>

<div
  id={index}
  class="kanban-column"
  use:draggable
  transition:fly={{x:-100}}
  on:over
  on:dragged={(e) => {
    isDragged = e.detail
  }}
  on:dropped
>
  <header
    class="text-sm font-thin h-5 border-b-2 border-blue-600 overflow-hidden cursor-text"
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
          on:click={() => deleteKanbanColumn(id)}
          >Delete Column number {id}</button
        >
      </p>
    </slot>
  </div>
  <div class="flex justify-between w-full">
    <button
      class="w-4 h-4 text-sm bg-red-400 text-center"
      on:click={() => changePosition(index, index === 0 ? 0 : index - 1)}
    >
      {'<'}
    </button>
    <button
      class="w-4 h-4 text-sm bg-red-400 text-center"
      on:click={() => changePosition(index, index + 1)}
    >
      {'>'}
    </button>
  </div>
  <button class="kanban-button self-center" on:click={reverseState}>
    Add a Card</button
  >
</div>
{#if isDragged}
  <div id={index} class="kanban-column " transition:fly={{x:-100, delay:0, duration:200}} />
{/if}

<style>
  .kanban-column {
    @apply w-36 h-full bg-gray-200 border-gray-500 border-2 flex flex-col p-2 text-center space-y-2;
    user-select: none;
  }
</style>
