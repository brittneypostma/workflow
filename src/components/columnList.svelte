<script>
  import { flip } from 'svelte/animate'
  import Column from './column.svelte'
  import DragTarget from './dragTarget.svelte'
  import ColumnSkeleton from './columnSkeleton.svelte'
  import { board, changePosition, addCard } from '../store/board.store'
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

  //   function save(event, callback) {
  //     callback(event)
  //     deselectCard(event)
  //     Projects.dump(projects)
  //   }

  //   function addCard(event) {
  //     const { column, card } = event.detail
  //     columns[column].cards = [card, ...columns[column].cards]
  //   }
</script>

{#each $board as column, index (column.id)}
  <div animate:flip={{ duration: 200 }}>
    <Column
      on:dragged={(e) => {
        isDragged = e.detail
      }}
      on:dropped={dropHandler}
      on:over={overHandler}
      on:cardAdded={(event) => {
        const { column: columnId, card: card } = event.detail
        // console.log({ columnId })
        // console.log(event.detail)
        // console.log(event.detail.card);
        // console.log({ columnId, card })
        addCard(columnId, card)
      }}
      {index}
      id={column.id}
      title={column.title}
    />
    <!-- if the column is dragged is taken out of the DOM flow, in it's place we render this skeleton-->
    <ColumnSkeleton {isDragged} {index} />
  </div>
{/each}

<style>
</style>
