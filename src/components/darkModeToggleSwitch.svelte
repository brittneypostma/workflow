<script>
  import { toggleTheme } from '../services/persistedTheme'
  import ToggleSwitch from './toggleSwitch.svelte'
  import SunIcon from '../icons/sun.svelte'
  import MoonIcon from '../icons/moon.svelte'
  export let isDarkMode
  function toggle() {
    window.document.body.classList.toggle('dark')
    toggleTheme()
  }
</script>

<ToggleSwitch id="dark_mode_switch" bind:checked={isDarkMode} on:click={toggle}>
  <i slot="icon" class={isDarkMode ? 'text-yellow-400' : 'text-black'}>
    {#if isDarkMode}
      <SunIcon />
    {:else}
      <MoonIcon />
    {/if}
  </i>
</ToggleSwitch>
