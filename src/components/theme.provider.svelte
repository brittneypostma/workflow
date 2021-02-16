<script>
  import { onMount } from 'svelte'
  import { themeStore, themes } from '../store/theme.store'

  onMount(() => {
    const unsubscribe = themeStore.subscribe((theme) => {
      if (theme === themes.dark) {
        window.document.documentElement.className = themes.dark
      } else {
        window.document.documentElement.className = ''
      }
    })
    return () => unsubscribe()
  })
</script>

<slot />
