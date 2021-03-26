<script>
  import { fade } from 'svelte/transition'
  /**
   * Density of background
   * @type {0|1|2|3|4}
   */
  export let density
  /**
   * tailwind classes additional for overlay
   * @type {string}
   */
  export let className
  const opacity = [
    'bg-opacity-0',
    'bg-opacity-25',
    'bg-opacity-50',
    'bg-opacity-75',
    'bg-opacity-100',
  ]
</script>

<div
  on:click
  transition:fade
  class={`w-screen bg-black z-10 h-screen fixed top-0 bg-opa left-0 ${opacity[density]} ${className}`}
>
  <slot />
</div>
