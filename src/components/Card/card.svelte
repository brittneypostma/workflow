<script>
  import { createEventDispatcher, getContext } from 'svelte'
  import { draggable } from '../../actions/draggable'
  import { Item, Menu } from '../DropMenu'
  import DotsIcon from '../../icons/dots.svelte'
  export let card
  let canBeDragged = true
  const { setParentDraggable } = getContext('setParentDraggable')
  $: console.log(canBeDragged)
  const dispatch = createEventDispatcher()
</script>

<div
  on:click={(e) => dispatch('select', { cardId: card.id })}
  id={card.id}
  use:draggable={{
    handle: 'handle',
    component: 'card',
    id: card.id,
    canDrag: canBeDragged,
  }}
  class="bg-white flex-1 rounded box-border border-2 border-gray-200 hover:border-black text-gray-600 hover:text-black hover:shadow select-none cursor-move space-y-2 dark:bg-gray-600 dark:text-white"
>
  <div class="flex flex-row">
    <header class="font-semibold bg-gray-200 dark:bg-gray-400 p-2 flex-1">
      {card.title}
    </header>
    <Menu
      on:menuToggled={(event) => {
        canBeDragged = !event.detail.isMenuVisible
        setParentDraggable(!event.detail.isMenuVisible)
      }}
    >
      <Item on:click={() => console.log('card edit')}>Edit</Item>
      <Item on:click={() => console.log('delete')}>Delete</Item>
      <Item on:click={() => console.log('Colors')}>Colors</Item>
    </Menu>
  </div>
  <p class="text-sm p-2 ">{card.body}</p>
  <button on:click={() => (canBeDragged = false)}>OFF</button>
  <button on:click={() => (canBeDragged = true)}>ON</button>
</div>
