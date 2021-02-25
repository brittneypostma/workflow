<script>
  import { createEventDispatcher } from 'svelte'
import { draggable } from '../actions/draggable';

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
  id={card.id}
  use:draggable={{handle:'handle', component:'card', id:card.id}}
  class="bg-white flex-1 rounded box-border border-2 border-gray-200 hover:border-black text-gray-600 hover:text-black hover:shadow p-2 select-none cursor-move"
>
  <div class="font-bold">{card.title}</div>
</div>
