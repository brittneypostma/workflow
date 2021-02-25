import {board} from "../store/board.store"
export function addCard(event) {
    const { column: columnId, card } = event.detail
    console.log(event)
    board.update(state => state.map(column => {
        column.id === columnId && column.cards.push(card);
        return ({ ...column })
    }))
}

export function deleteCard(columnId, cardId) {
    board.update(columns => columns.map(column => {
        if(column.id == columnId) {
            column.cards = column.cards.filter(c => c.id != cardId);
        }
        return ({ ...column })
    }))
}

/////////// FUNCTION to update card
 export function updateCard(event) {
    const { column: columnId, card } = event.detail
    board.update(state => state.map(column => {
        if (column.id === columnId) {
            column.cards.map(c => {
                if(c.id === card.id) {
                    c.title=card.title;
                    // return c;
                }
            })
            return column;
        } 
        else return column;
    }))

    
  }