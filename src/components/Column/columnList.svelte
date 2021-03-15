<script>
  import { getContext } from 'svelte'
  import { flip } from 'svelte/animate'

  import CardTray from '../Card/cardTray.svelte'
  import { deleteCard, updateCard, cardsStore } from '../../store/card.store'
  let selection
  const boardStore = getContext('boardStore')
  const selectTask = (event) => (selection = event.detail)
  const deselectTask = (event) => (selection = null)
  function save(event, callback) {
    callback(event)
    deselectTask(event)
  }
</script>

{#each $boardStore as column, index (column.id)}
  <div animate:flip={{ duration: 200 }}>
    <slot {column} {index} />
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
  />
{/if}
