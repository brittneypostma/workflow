<script>
  import DotsIcon from '../../icons/dots.svelte'
  import { fade, slide } from 'svelte/transition'
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

<div id="overlay" class="relative">
  <button class="flex items-center" on:click={toggleVisible}>
    <span><DotsIcon /></span>
  </button>
  {#if isMenuVisible}
    <div class="w-full absolute z-10 border-2" on:click={toggleVisible}>
      <div
        transition:slide
        class="absolute z-20 border-2 top-0 bg-gray-300 dark:bg-gray-700"
      >
        <ul class="text-sm min-w-max space-y-2">
          <slot />
        </ul>
      </div>
    </div>
  {/if}
</div>
