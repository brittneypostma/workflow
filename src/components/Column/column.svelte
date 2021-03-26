<script>
  import { fly } from 'svelte/transition'
  import { getContext, setContext } from 'svelte'
  import { Item, Menu as DropMenu } from '../DropMenu'
  import { draggable } from '../../actions/draggable'
  import TrashIcon from '../../icons/trash.svelte'
  /**
   * Incoming data to the column
   * @type {{id:number, title:string, bgColor:string}}
   */

  export let data
  const { editColumnName, deleteKanbanColumn } = getContext('boardStore')
  const { id, title, bgColor: color } = data
  let canDrag = true
  function changeDraggability(value) {
    canDrag = value
  }
  setContext('setParentDraggable', { setParentDraggable: changeDraggability })
</script>

<div
  {id}
  class={`grid content-start flex-shrink-0 w-64 h-full grid-cols-1 p-2 space-y-2 text-center ${color.light} border-2 border-black rounded cursor-move select-none dark:${color.dark} dark:border-white`}
  use:draggable={{ handle: 'handle', component: 'column', id, canDrag }}
  transition:fly={{ x: -100 }}
>
  <div class="flex flex-row w-full mb-2 space-x-1">
    <input
      on:blur={(e) => {
        editColumnName(id, e.target.value)
        canDrag = true
      }}
      on:focus={() => (canDrag = false)}
      value={title}
      type="text"
      class="w-10/12 overflow-hidden text-sm font-thin text-center bg-transparent border-b border-secondary-900 cursor-text focus:outline-none"
    />
    <DropMenu
      on:menuToggled={(e) => changeDraggability(!e.detail.isMenuVisible)}
    >
      <Item on:click={() => deleteKanbanColumn(id)}>Delete Column</Item>
      <Item>Color Select</Item>
    </DropMenu>
  </div>
  <slot />
</div>

<style>
  .moved {
    transform: translateX('100px');
  }
</style>
