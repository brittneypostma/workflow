import {getLocalTheme} from '../services/localStorage'
import {writable} from 'svelte/store'
const themes = {
    dark:'dark',
    light:'light'
}

const themeStore = writable(getLocalTheme())

function setTheme(theme){
    if(theme === themes.dark || theme === themes.light){
        themeStore.set(theme)
    }
}
function toggleTheme(){
    themeStore.update(state=>{
        if(state === themes.dark){
            return themes.light
        }else return themes.dark
    })
}
export {
    themeStore,
    toggleTheme,
    setTheme,
    themes
}