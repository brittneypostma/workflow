<script>
  import { flip } from 'svelte/animate'
  import Column from './column.svelte'
  import { board } from '../store/board.store'
  import {addCard} from '../actions/card'

</script>

{#each $board as column, index (column.id)}
  <div animate:flip={{ duration: 200 }}>
    <Column
      {index}
      id={column.id}
      title={column.title}
      colour={column.bgColor}
      cards={column.cards}
      on:cardAdded={addCard}
    />
  </div>
{/each}
