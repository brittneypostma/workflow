<script>
  import { fly } from 'svelte/transition'
  import {
    deleteKanbanColumn,
    reverseState,
    changePosition,
    editColumnName
  } from '../store/board.store'
  import { draggable } from '../actions/draggable'
  import TitleInput from './column.titleInput.svelte'

  export let index
  export let id
  export let title
  
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


  <input on:mousedown|stopPropagation on:blur="{(e) => editColumnName(id,e.target.value)}" value={title} type="text" 
    class="text-sm text-center font-thin h-5 border-b-2 border-blue-600 overflow-hidden cursor-text bg-transparent focus:outline-none"
  >

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
