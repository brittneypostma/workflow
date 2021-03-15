<script>
  import { flip } from 'svelte/animate'
  /**
   * It should get a store with an Array
   *
   */
  export let items
</script>

{#each $items as item, index (item.id)}
  <div animate:flip={{ duration: 200 }}>
    <slot {item} {index} />
  </div>
{:else}
  <div>EMPTY</div>
{/each}
