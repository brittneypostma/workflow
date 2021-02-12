<script>
  import Layout from './components/_layout.svelte'
  import Column from './components/column.svelte'
  import Board from './components/kanbanBoard.svelte'
  import { board } from './store/board.store'
  import ToggleDarkMode from './components/darkModeToggleSwitch.svelte'
  import { themeStore } from './store/theme.store'
  import ThemeProvider from './components/theme.provider.svelte'
</script>

<ThemeProvider>
  <Layout>
    <span slot="header">
      <ToggleDarkMode isDarkMode={$themeStore === 'dark'} />
    </span>
    <Board>
      {#each $board as { id, title }, i (id)}
        <Column {id} {title} index={i} />
      {/each}
    </Board>
  </Layout>
</ThemeProvider>
