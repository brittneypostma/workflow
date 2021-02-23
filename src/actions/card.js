import {board} from "../store/board.store"
export function addCard(id, card) {
    board.update(state => state.map(column => {
        column.id === id && column.cards.push(card);
        return ({ ...column })
    }))
}