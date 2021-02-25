//@ts-check
import {get, derived, Writable} from 'svelte/store'
import {persistedStore} from '../services/localStorage' 
/**
 * @typedef {Object} CardModel
 * 
 * @typedef {Object} ColumnModel
 * @property {number} id
 * @property {string} title
 * @property {Array<CardModel>} cards
 * @property {{dark:string, light:string}} bgColor 
 */

/** @type {Writable<ColumnModel[]>} */
export const board = persistedStore([], 'boardStore')
export const lastId = derived(board, ($board, set) => {
    if ($board.length > 0) {
        const indexes = $board.map(element => element.id)
        set(Math.max(...indexes) + 1)
    } else set(0)
}, 0)
/**
 * Get the empty column model
 * @returns {ColumnModel} 
 */
function getEmptyColumn() {
    return ({
        id:get(lastId),
        title:'Edit Column Title',
        cards:[],
        bgColor:{
            dark:'bg-gray-800',
            light:'bg-gray-100'
        }
    })
}

export function addKanbanColumn() {
    board.update((state) => {
        const column = getEmptyColumn()
        return [...state, column]
    })
}
/**
 * Changes the column position in the store array
 * @param {number} oldIndex Actual index of a Column
 * @param {number} newIndex New index of a Column
 */
export function changePosition(oldIndex, newIndex) {
    if (oldIndex !== newIndex && newIndex >= 0) {
        board.update(state => {
            const newState = state.filter(arrayElement => arrayElement.id !== state[oldIndex].id)
            newState.splice(newIndex, 0, state[oldIndex])
            return newState
        })
    }

}
function getIndexFromId(id){
    const index = get(board).findIndex(element=>element.id === id)
    if(index !== -1){
        return index
    }else {
        console.error('INDEX NOT FOUND')
        return undefined
    }
}
export function changePositionByIds(sourceId, targetId){
    //Need to determine it's indexes and call changeposition
    changePosition(getIndexFromId(sourceId), getIndexFromId(targetId))
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
export function editColumnName(id, name) {
    board.update(state => state.map(column => {
        if (column.id === id) return ({ ...column, title: name })
        else return ({ ...column })
    }))
}
