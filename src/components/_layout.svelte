<script>
  import { themeStore } from '../store/theme.store'
  import ToggleDarkMode from './darkModeToggleSwitch.svelte'

  const year = new Date().getFullYear()
</script>

<div
  class="grid h-full grid-cols-1 gap-2 p-2 text-secondary-900 bg-secondary-50 grid-rows-layout dark:text-white dark:bg-secondary-900"
>
  <header>
    <ToggleDarkMode isDarkMode={$themeStore === 'dark'} />
  </header>

  <main>
    <slot />
  </main>

  <footer class="text-center">&copy;{year} ZTM WorkFlow Group</footer>
</div>
