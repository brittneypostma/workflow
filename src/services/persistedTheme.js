const themeKey = 'theme'
export const themes = {
    dark:'dark',
    light:'light'
}

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
function setTheme(theme){
    localStorage.setItem(themeKey, theme)
}
export function isDarkMode(){
    return getLocalTheme() === themes.dark
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