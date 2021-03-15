<script>
    import {scale} from 'svelte/transition'
    export let isDragged
    export let index
</script>
{#if isDragged && isDragged?.index === index.toString() }
  
  <div
    id={index}
    class="grid flex-shrink-0 w-64 h-full grid-cols-1 p-2 space-y-2 text-center bg-gray-100 border-2 border-black rounded cursor-move select-none dark:bg-gray-800 dark:border-white grid-rows-layout"
    in:scale={{ delay: 0, duration: 200, start:0.5 }}
  />
{/if}
