<script>
  import { toggleTheme } from '../services/localTheme'
  function toggle() {
    window.document.body.classList.toggle('dark')
    toggleTheme()
  }
</script>

<button on:click={toggle} class="dark:bg-gray-400 dark:text-gray-900">
  <slot />
</button>

<style>
  button {
    @apply bg-yellow-500 text-white border-none rounded p-2 uppercase;
  }
</style>
