import { addCard, deleteCard } from '../../store/card.store'
import { v4 as uuid } from 'uuid'
/**
 *Add New card to the system
 *
 * @param {{detail:{columnId:string, title:string, type:'text'|'other', body:any}}} event
 */
const add = (event) => {
    const { columnId, title, type, body } = event.detail
    const card = {
        id: uuid(),
        cardType: type,
        title,
        body,
        columnId
    }
    addCard(card)
}
const select = () => {

}
/**
 * Delte a card event
 *
 * @param {{detail:{cardId:string}}} event
 */
const deleteItem = (event) => {
    const { cardId } = event.detail
    deleteCard(cardId)

}

export const cardActions = {
    add,
    deleteItem
}
