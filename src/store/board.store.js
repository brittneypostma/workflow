//@ts-check
import {writable, get, derived, Writable} from 'svelte/store'
/**
 * @typedef {Object} CardModel
 * 
 * @typedef {Object} ColumnModel
 * @property {number} id
 * @property {string} title
 * @property {Array<CardModel>} cards 
 */

/** @type {Writable<ColumnModel[]>} */
export const board = writable([])
export const lastId = derived(board, ($board, set) => {
 if($board.length>0){
    const indexes = $board.map(element => element.id)
    set(Math.max(...indexes)+1)
 }else set(0) 
}, 0)
/**
 * 
 * @param {ColumnModel[]} state
 * @returns {ColumnModel} 
 */
function getEmptyColumn(state){
    return ({
        id:get(lastId),
        title:'New Column',
        cards:[]
    })
}

export function addKanbanColumn(){
    board.update((state)=>{
        const column = getEmptyColumn(state)
        return [...state, column]
    })
}
export function reverseState(){
    board.update(state=>state.reverse())
}
/**
 * Changes the column position in the store array
 * @param {number} oldIndex Actual index of a Column
 * @param {number} newIndex New index of a Column
 */
export function changePosition(oldIndex, newIndex){
    
    board.update(state=>{
        const newState = state.filter(arrayElement=>arrayElement.id !== state[oldIndex].id)
        newState.splice(newIndex, 0, state[oldIndex])
        return newState
    })

}
export function deleteKanbanColumn(id){
    board.update((state)=>state.filter(column=>column.id!==id))
}
/**
 * Change the title of the column
 * @todo Change the name to editColumnTitle 
 * @param {number} id 
 * @param {string} name
 *  
 */
export function editColumnName(id, name){
    board.update(state=>state.map(column=>{
        if(column.id === id) return ({...column, title:name})
        else return ({...column})
    }))
}