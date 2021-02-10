import {writable} from 'svelte/store'

export const board = writable([])

export function addKanbanColumn(){
    board.update((state)=>{
        const column = {
            id:state.length+1,
            cards:[]
        }
        return [...state, column]
    })
}
export function deleteKanbanColumn(id){
    board.update((state)=>state.filter(column=>column.id!==id))
}