import { addCard, deleteCard } from '../../store/card.store'
import { v4 as uuid } from 'uuid'

const add = (event) => {
    const { columnId, title, type, body } = event.detail
    const card = {
        id: uuid(),
        cardType: type,
        title,
        body,
    }
    addCard(columnId, card)
}
const select = () => {

}
const deleteItem = (event) => {
    const { cardId } = event.detail
    deleteCard(cardId)

}

export const cardActions = {
    add,
    deleteItem
}
