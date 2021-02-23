<script>
  import { flip } from 'svelte/animate'
  import Column from './column.svelte'
  import DragTarget from './dragTarget.svelte'
  import ColumnSkeleton from './columnSkeleton.svelte'
  import { board, changePosition } from '../store/board.store'
  import { addCard } from '../actions/card'
  let isDragged
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

  function addCardHandler(event) {
    const { column: columnId, card } = event.detail

    // console.log({ columnId })
    // console.log(event.detail)
    // console.log(event.detail.card);
    // console.log({ columnId, card })
    addCard(columnId, card)
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
      on:cardAdded={addCardHandler}
      {index}
      id={column.id}
      title={column.title}
      cards={column.cards}
    />
    <!-- if the column is dragged is taken out of the DOM flow, in it's place we render this skeleton-->
    <ColumnSkeleton {isDragged} {index} />
  </div>
{/each}

<style>
</style>
