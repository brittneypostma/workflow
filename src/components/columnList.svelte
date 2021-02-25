<script>
  import { flip } from 'svelte/animate'
  import Column from './column.svelte'
  import CardTray from './cardTray.svelte'
  import DragTarget from './dragTarget.svelte'
  import ColumnSkeleton from './columnSkeleton.svelte'
  import { board, changePosition } from '../store/board.store'
  import { addCard, deleteCard, updateCard } from '../actions/card'
  let isDragged
  let selection
  const selectTask = (event) => (selection = event.detail)
  const deselectTask = (event) => (selection = null)
  let dragEvent = {
    index: undefined,
    direction: undefined,
  }
  function overHandler(event) {
    dragEvent = {
      index: event.detail.id,
      direction: event.detail.direction,
    }
  }
  function dropHandler(e) {
    changePosition(e.detail, dragEvent.index)
    dragEvent = {
      index: undefined,
      direction: undefined,
    }
  }

  function save(event, callback) {
    callback(event)
    deselectTask(event)
  }
</script>

{#each $board as column, index (column.id)}
  <div animate:flip={{ duration: 200 }}>
    <Column
      on:dragged={(e) => {
        isDragged = e.detail
      }}
      on:dropped={dropHandler}
      on:over={overHandler}
      on:cardAdded={addCard}
      on:taskSelected={selectTask}
      {index}
      id={column.id}
      title={column.title}
      cards={column.cards}
    />
    <!-- if the column is dragged is taken out of the DOM flow, in it's place we render this skeleton-->
    <ColumnSkeleton {isDragged} {index} />
  </div>
{/each}
{#if selection}
  <CardTray
    on:trayClosed={deselectTask}
    on:cardUpdated={(event) => save(event, updateCard)}
    on:cardRemoved={(event) => {
      // deleteCard(columnId, cardId);
      deleteCard(event.detail.column, event.detail.id)
      deselectTask(event) /* Close card tray */
    }}
    {...selection}
    {board}
  />
{/if}

<style>
</style>
