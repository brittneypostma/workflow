<script>
  import { onMount } from 'svelte'
  import { themeStore, themes } from '../store/theme.store'

  onMount(() => {
    const unsunscribe = themeStore.subscribe((theme) => {
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
