<!-- This is the main file for the app, an index.js of sorts. -->
<script>
  import ThemeProvider from './components/theme.provider.svelte'
  import Layout from './components/_layout.svelte'
  import ColumnList from './components/columnList.svelte'
  import Board from './components/kanbanBoard.svelte'
</script>

<!-- This wraps the app to detect and set the theme -->
<ThemeProvider>
  <!-- This is the main layout that wraps the app -->
  <Layout>
    <!-- This is the main content of the page -->
    <Board>
      <ColumnList />
    </Board>
  </Layout>
</ThemeProvider>
