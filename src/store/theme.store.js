import { persistedStore } from '../services/localStorage'

const themes = {
    dark: 'dark',
    light: 'light'
}
const customColors = {
    yellow: ['bg-yellow-400', 'bg-yellow-600'],
    green: [],
    blue: [],

}
/**
 *
 *
 * @return {'dark'|'light'} 
 */
function setInitialTheme() {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return themes.dark
    } else {
        return themes.light
    }
}

const themeStore = persistedStore(setInitialTheme(), 'theme')

function setTheme(theme) {
    if (theme === themes.dark || theme === themes.light) {
        themeStore.set(theme)
    }
}
function toggleTheme() {
    themeStore.update(state => {
        if (state === themes.dark) {
            return themes.light
        } else return themes.dark
    })
}
export {
    themeStore,
    toggleTheme,
    setTheme,
    themes
}