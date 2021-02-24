<script>
  import { flip } from 'svelte/animate'
  import Column from './column.svelte'
  import { board } from '../store/board.store'

</script>

{#each $board as column, index (column.id)}
  <div animate:flip={{ duration: 200 }}>
    <Column
      {index}
      id={column.id}
      title={column.title}
      cards={column.cards}
    />
  </div>
{/each}
