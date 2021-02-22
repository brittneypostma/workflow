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
  //     deselectTask(event)
  //     Projects.dump(projects)
  //   }

  //   function addTask(event) {
  //     const { column, task } = event.detail
  //     columns[column].tasks = [task, ...columns[column].tasks]
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
      on:taskAdded={(event) => {
        const { column: columnId, task: card } = event.detail
        // console.log({ columnId })
        // console.log(event.detail)
        // console.log(event.detail.task);
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
