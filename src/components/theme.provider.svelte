<script>
  import { onMount } from 'svelte'
  import { themeStore, themes } from '../store/theme.store'
  import { persistTheme } from '../services/localStorage'

  onMount(() => {
    const unsunscribe = themeStore.subscribe((theme) => {
      persistTheme(theme)
      if (theme === themes.dark) {
        window.document.documentElement.className = themes.dark
      } else {
        window.document.documentElement.className = ''
      }
    })
    return () => unsunscribe()
  })
</script>

<slot />
