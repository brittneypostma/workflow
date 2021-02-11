import {writable} from 'svelte/store'

export const board = writable([])

export function addKanbanColumn(){
    board.update((state)=>{
        const column = {
            id:state.length+1,
            name:'New Column',
            cards:[]
        }
        return [...state, column]
    })
}
export function deleteKanbanColumn(id){
    board.update((state)=>state.filter(column=>column.id!==id))
}
export function editColumnName(id, name){
    board.update(state=>state.map(column=>{
        if(column.id === id) return {...column, name:name}
        else return {...column}
    }))
}