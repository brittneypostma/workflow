<script>
  import DotsIcon from '../../icons/dots.svelte'
  import { slide } from 'svelte/transition'
  import Overlay from '../overlay.svelte'
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()
  let isMenuVisible = false
  let menuPosition = {
    x: 0,
    y: 0,
  }
  const toggleVisible = (e) => {
    isMenuVisible = !isMenuVisible
    menuPosition = {
      x: e.x,
      y: e.y,
    }
    dispatch('menuToggled', { isMenuVisible })
  }
</script>

<button class="flex items-center" on:click={toggleVisible}>
  <span class="sr-only"> Show customization menu </span>
  <span><DotsIcon /></span>
</button>
{#if isMenuVisible}
  <Overlay density={0} on:click={toggleVisible}>
    <div
      transition:slide
      class="absolute z-20 border-2 top-0 bg-gray-300 dark:bg-gray-700"
      style={`left:${menuPosition.x}px;top:${menuPosition.y}px`}
    >
      <ul class="text-sm min-w-max space-y-2">
        <slot />
      </ul>
    </div>
  </Overlay>
{/if}
