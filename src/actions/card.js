import {board} from "../store/board.store"
export function addCard(event) {
    const { column: columnId, card } = event.detail
    console.log(event)
    board.update(state => state.map(column => {
        column.id === columnId && column.cards.push(card);
        return ({ ...column })
    }))
}

export function deleteCard(columnId, card) {
    board.update(columns => columns.map(column => {
        if(column.id == columnId) {
            column.cards = column.cards.filter(c => c.id != card.id);
        }
        return ({ ...column })
    }))
}