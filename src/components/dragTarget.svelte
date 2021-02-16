<script>
  import { scale } from 'svelte/transition'
  export let dragEvent
  export let isVertical
  export let index
  export let side
</script>

{#if dragEvent.index === index && dragEvent.direction === side}
  <div
    transition:scale
    class="drag-target"
    class:horizontal={!isVertical}
    class:vertical={isVertical}
  />
{/if}

<style>
  .drag-target {
    @apply bg-gray-800 dark:bg-gray-200 rounded-full;
  }
  .horizontal {
    @apply w-full h-2;
  }
  .vertical {
    @apply h-full w-2;
  }
</style>
