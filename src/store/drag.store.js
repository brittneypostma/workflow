import { writable, get } from 'svelte/store'
import { boardStore } from './board.store'
import { changeCardPosition } from './card.store'


/**
 * @typedef DragStoreModel
 * @property {'column'|'card'} componentType
 * @property {HTMLElement} elementRef
 * @property {boolean} isDragged
 * @property {number} id
 */

/**
 * @type {import("svelte/store").Writable<DragStoreModel[]]>}
 */
export const registeredDragElements = writable([])
export const dragState = writable({
    component: undefined,
    draggedId: undefined,
    targetId: undefined
})

/**
 * Register draggable element to keep track of its state    
 * @param {HTMLElement} ref Reference to HTML Element which is draggable
 * @param {'column'|'card'} componentType Indicate which type of element is registered
 * @param {number} id ID number of the element, which must be unique
 */
export function registerDraggable(ref, componentType, id) {
    registeredDragElements.update(state => {
        return [...state, {
            componentType,
            elementRef: ref,
            isDragged: false,
            id
        }]
    })
}
export function unregister(componentType, id) {
    registeredDragElements.update(state => {
        return state.filter(element => {
            if (element.id === id && element.componentType === componentType) {
                return false
            }
            return true
        }
        )
    })
}

export function setDrag(componentType, id, isDragging) {
    registeredDragElements.update(state => {
        return state.map(element => {
            if (element.id === id && element.componentType === componentType) {
                return ({
                    ...element,
                    isDragged: isDragging
                })
            } else return { ...element }
        })
    })
    dragState.set({
        component: componentType,
        draggedId: isDragging ? id : undefined,
        targetId: undefined
    })
}
export function isEnoughElementsToDrag(component) {
    if (component === 'column') {
        return get(registeredDragElements).length >= 2
    }
    return true
}
export function getTargetElements(component) {
    const targetMap = {
        'column': 'column',
        'card': 'column' || 'card'
    }
    return get(registeredDragElements).filter(element =>
        element.isDragged === false
    )
}
export function getDraggedElement(component) {
    return get(registeredDragElements).find(element =>
        element.isDragged === true && element.componentType === component
    )
}
export function changePosition(component, source, target) {
    if (component === "column" && source && target) {
        boardStore.changePositionByIds(source, +target)
    }
    if (component === "card" && source && target) {
        changeCardPosition(source, target)
    }

}
