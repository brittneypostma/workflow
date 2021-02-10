<script>
  import { toggleTheme } from '../services/localTheme'
  import ToggleSwitch from './toggleSwitch.svelte'
  export let isDarkMode
  function toggle() {
    window.document.body.classList.toggle('dark')
    toggleTheme()
  }
</script>

<ToggleSwitch id="dark_mode_switch" checked={isDarkMode} on:click={toggle} />
