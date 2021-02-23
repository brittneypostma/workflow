import {board} from "../store/board.store"
export function addCard(event) {
    const { column: columnId, card } = event.detail

    board.update(state => state.map(column => {
        column.id === columnId && column.cards.push(card);
        return ({ ...column })
    }))
}

export function deleteCard(event) {
    const { column: columnId, card } = event.detail
    card = JSON.stringify(card);
    board.update(columns => columns.map(column => {
        if(column.id == columnId) {
            column.cards = column.cards.filter(c => c != card);
        }
        return ({ ...column })
    }))
}