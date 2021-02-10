<script>
  import Layout from './components/_layout.svelte'
  import Column from './components/column.svelte'
  import Board from './components/kanbanBoard.svelte'
  import { board } from './store/board.store'
  import ToggleDarkMode from './components/darkModeToggleSwitch.svelte'
  import { onMount } from 'svelte'
  import { getLocalTheme, themes } from './services/persistedTheme'
  export let name
  let isDarkMode = false
  onMount(() => {
    if (getLocalTheme() === themes.dark) {
      window.document.body.classList.add('dark')
      isDarkMode = true
    }
  })
</script>

<Layout>
  <span slot="header">
    <ToggleDarkMode {isDarkMode} />
  </span>
  <Board>
    {#each $board as board}
      <Column id={board.id} />
    {/each}
  </Board>
</Layout>
