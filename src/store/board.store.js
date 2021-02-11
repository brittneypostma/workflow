import {writable, get, readable} from 'svelte/store'

export const board = writable([])

export function addKanbanColumn(){
    board.update((state)=>{
        const column = {
            id:state.length>0?state[state.length-1].id+1 : 1,
            title:'New Column',
            cards:[]
        }
        return [...state, column]
    })
}
export function deleteKanbanColumn(id){
    board.update((state)=>state.filter(column=>column.id!==id))
}
export function editColumnName(id, name){
    console.log('received', id, name)
    board.update(state=>state.map(column=>{
        if(column.id === id) return ({...column, title:name})
        else return ({...column})
    }))
    console.log(get(board))
}