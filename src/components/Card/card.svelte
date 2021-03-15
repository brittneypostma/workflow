<script>
  import { createEventDispatcher } from 'svelte'
  import { draggable } from '../../actions/draggable'
  import DotsIcon from '../../icons/dots.svelte'
  export let card

  const dispatch = createEventDispatcher()
</script>

<div
  draggable="true"
  on:click={(e) => dispatch('select', { cardId: card.id })}
  id={card.id}
  use:draggable={{ handle: 'handle', component: 'card', id: card.id }}
  class="bg-white flex-1 rounded box-border border-2 border-gray-200 hover:border-black text-gray-600 hover:text-black hover:shadow select-none cursor-move space-y-2"
>
  <div class="flex flex-row">
    <header class="font-semibold bg-gray-200 p-2 flex-1">{card.title}</header>
    <button
      class="text-xs text-black bg-gray-100 p-1"
      on:click|stopPropagation={() => dispatch('delete', { cardId: card.id })}
    >
      <DotsIcon />
    </button>
  </div>
  <p class="text-sm p-2 ">{card.body}</p>
</div>
