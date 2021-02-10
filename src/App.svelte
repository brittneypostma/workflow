<script>
  import DarkModeButton from './components/darkModeButton.svelte'
  import ToggleDarkMode from './components/darkModeToggleSwitch.svelte'
  import { onMount } from 'svelte'
  import { getLocalTheme, themes } from './services/localTheme'
  export let name
  let isDarkMode = false
  onMount(() => {
    if (getLocalTheme() === themes.dark) {
      window.document.body.classList.add('dark')
      isDarkMode = true
    }
  })
</script>

<main class="bg-white dark:bg-black text-black dark:text-white">
  <ToggleDarkMode {isDarkMode} />
  <h1 class="text-7xl">Hello {name}!</h1>
  <p>
    Tailwind is working in this project, let's get started on <br />
    <strong class="text-6xl">WorkFlow</strong>!
  </p>
  <h2>Check the readme file for todo's and how to get started.</h2>
</main>
