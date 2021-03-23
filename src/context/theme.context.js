import { setContext, getContext } from 'svelte'
import { themeStore, toggleTheme } from '../store/theme.store'

const themeContextKey = 'theme'

function useDarkMode() {
    return ([
        theme = themeStore,
        toggleTheme
    ])
}

function setThemeContext() {
    setContext(themeContextKey, {
        useDarkMode,

    })
}
function getThemeContext() {
    return getContext(themeContextKey)
}
export {

}