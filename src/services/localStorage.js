import {themes} from '../store/theme.store'

const themeKey = 'theme'

function setInitialTheme(){
    if(window.matchMedia('(prefers-color-scheme: dark)').matches){
        //dark-mode Preffered
        localStorage.setItem(themeKey, themes.dark)
        return themes.dark
    }else{
        localStorage.setItem(themeKey, themes.light)
        return themes.light
    }
}
export function persistTheme(theme){
    localStorage.setItem(themeKey, theme)
}
export function getLocalTheme(){
     return localStorage.getItem(themeKey) ? localStorage.getItem(themeKey) : setInitialTheme()
}
export function toggleTheme(){
    if(getLocalTheme() === themes.light){
        setTheme(themes.dark)
    }else{
        setTheme(themes.light)
    }
}