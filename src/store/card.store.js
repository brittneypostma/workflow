import { board } from "./board.store"
import { persistedStore } from '../services/localStorage'
import { get, readable } from 'svelte/store'
/**
 * @typedef Card
 * @property {string} id
 * @property {'text'|'other'} cardType
 * @property {string} title
 * @property {any} body
 * 
 */

/** @type {import("svelte/store").Writable<Record<number, Card[]>>} */
export const cardsStore = persistedStore({}, 'cardsStore')

export function selector(columnId) {
    return readable([], (set) => {
        const unSubscribe = cardsStore.subscribe(value => {
            if (value[columnId]) {
                set(value[columnId])
            }
        })
        return () => unSubscribe()
    })
}
/**
 * Add a card to a store
 *
 * @export
 * @param {number} columnId
 * @param {Card} card
 */
export function addCard(columnId, card) {
    cardsStore.update(state => {
        if (state[columnId]) {
            const newState = {
                ...state,
                [columnId]: [...state[columnId], card]
            }
            return newState
        } else {
            return ({
                ...state,
                [columnId]: [card]
            })
        }
    })
}
/**
 *
 *
 * @export
 * @param {number} columnId
 * @param {string} cardId
 */
export function deleteCard(cardId) {
    cardsStore.update(state => {
        const updatedState = {}
        for (const column in state) {
            updatedState[column] = state[column].filter(card => card.id !== cardId)
        }
        return updatedState
    })
}
/**
 *
 *
 * @param {number} columnId
 */
/////////// FUNCTION to update card
export function updateCard(event) {
    const { column: columnId, card } = event.detail
    board.update(state => state.map(column => {
        if (column.id === columnId) {
            column.cards.map(c => {
                if (c.id === card.id) {
                    c.title = card.title;
                    // return c;
                }
            })
            return column;
        }
        else return column;
    }))


}
