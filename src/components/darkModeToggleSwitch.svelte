<script>
  import { toggleTheme } from '../store/theme.store'
  import ToggleSwitch from './toggleSwitch.svelte'
  import SunIcon from '../icons/sun.svelte'
  import MoonIcon from '../icons/moon.svelte'
  export let isDarkMode
</script>

<ToggleSwitch
  id="dark_mode_switch"
  bind:checked={isDarkMode}
  on:click={toggleTheme}
>
  <i slot="icon" class={isDarkMode ? 'text-yellow-400' : 'text-black'}>
    {#if isDarkMode}
      <SunIcon />
    {:else}
      <MoonIcon />
    {/if}
  </i>
</ToggleSwitch>
