<script>
  import { createEventDispatcher } from 'svelte'

  export let column
  export let card

  const dispatch = createEventDispatcher()
  function select() {
    dispatch('taskSelected', {
      column: column,
      task: task,
    })
  }
</script>

<div
  draggable="true"
  class="bg-white rounded box-border border-2 border-gray-200 hover:border-black text-gray-600 hover:text-black hover:shadow p-2 select-none cursor-move"
>
  <div class="font-bold">{card.title}</div>
</div>
