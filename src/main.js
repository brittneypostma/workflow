
// This file is the main entry point of the app. It pulls in the App.svelte file and runs it.

import App from './App.svelte'
import '../public/global.css'

const app = new App({
  target: document.body,
})

export default app