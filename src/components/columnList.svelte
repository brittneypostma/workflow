<script>
  import { flip } from 'svelte/animate'
  import Column from './column.svelte'
  import CardTray from './cardTray.svelte'
  import { boardStore } from '../store/board.store'
  import { addCard, deleteCard, updateCard } from '../actions/card'
  let selection
  const selectTask = (event) => (selection = event.detail)
  const deselectTask = (event) => (selection = null)
  function save(event, callback) {
    callback(event)
    deselectTask(event)
  }
</script>

{#each $boardStore as column, index (column.id)}
  <div animate:flip={{ duration: 200 }}>
    <Column
      on:taskSelected={selectTask}
      {index}
      id={column.id}
      title={column.title}
      colour={column.bgColor}
      cards={column.cards}
    />
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
    board={boardStore}
  />
{/if}
