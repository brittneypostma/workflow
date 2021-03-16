<!-- This is the main file for the app, an index.js of sorts. -->
<script>
  import ThemeProvider from './components/theme.provider.svelte'
  import Layout from './components/_layout.svelte'
  import List from './components/List.svelte'
  import Column from './components/Column/column.svelte'
  import Board from './components/kanbanBoard.svelte'
  import Card from './components/Card/card.svelte'
  import { boardStore } from './store/board.store'
  import { selector } from './store/card.store'
  import CardAdder from './components/Card/cardAdder.svelte'
  import { cardActions } from './components/Card/actions'
</script>

<!-- This wraps the app to detect and set the theme -->
<ThemeProvider>
  <!-- This is the main layout that wraps the app -->
  <Layout>
    <!-- This is the main content of the page -->
    <Board>
      <List let:item={column} items={boardStore}>
        <Column data={column}>
          <CardAdder columnId={column.id} on:addCard={cardActions.add} />
          <List items={selector(column.id)} let:item={card}>
            <Card
              {card}
              on:select={(e) => console.log(e)}
              on:delete={cardActions.deleteItem}
            />
          </List>
        </Column>
      </List>
    </Board>
  </Layout>
</ThemeProvider>
