
import { persistedStore } from '../services/localStorage'
import { readable } from 'svelte/store'
import { validate } from 'uuid'
/**
 * @typedef Card
 * @property {string} id
 * @property {'text'|'other'} cardType
 * @property {string} title
 * @property {any} body
 * @property {number} columnId
 * 
 */

/** @type {import("svelte/store").Writable<Card[]>} */
export const cardsStore = persistedStore([], 'cardsStore')

export function selector(columnId) {
    return readable([], (set) => {
        const unSubscribe = cardsStore.subscribe(value => {
            set(value.filter(card => card.columnId === columnId))
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
export function addCard(card) {
    cardsStore.update(state => {
        return [...state, card]
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
        return state.filter(card => card.id !== cardId)
    })
}

export function updateCard(event) {
    const { column: columnId, card } = event.detail
    cardsStore.update(state => state.map(element => element))

}

export function changeCardPosition(sourceId, targetId) {
    if (validate(targetId)) {
        cardsStore.update(state => {
            const targetIndex = state.findIndex(card => card.id === targetId)
            const sourceCard = state.find(card => card.id === sourceId)
            const targetCard = state.find(card => card.id === targetId)
            const newState = state.filter(arrayElement => arrayElement.id !== sourceCard.id)
            newState.splice(targetIndex, 0, sourceCard)
            return newState.map(card => {
                if (card.id === sourceId) {
                    return ({
                        ...card,
                        columnId: targetCard.columnId
                    })
                }
                return card
            })
        })
    } else {
        cardsStore.update(state => {
            return state.map(card => {
                if (card.id === sourceId) {
                    return ({
                        ...card,
                        columnId: +targetId
                    })
                }
                return card
            })
        })
    }
}
