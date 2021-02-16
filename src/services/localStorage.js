import {writable} from 'svelte/store'
/**
 * 
 * @param {any} initialState 
 * @param {string} key 
 */
export function persistedStore(initial, key){
    const pesisted = localStorage.getItem(key)
    const initialValue = pesisted?JSON.parse(pesisted):initial
    const store = writable(initialValue,()=>{
        const unsubscribe = store.subscribe(state=>{
            localStorage.setItem(key, JSON.stringify(state))
        })
        return ()=>{
            unsubscribe()
        }
    } )
    return store
}