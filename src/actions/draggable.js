import {
    dragState,
    registerDraggable,
    unregister,
    setDrag,
    isEnoughElementsToDrag,
    getTargetElements,
    getDraggedElement,
    changePosition
} from '../store/drag.store'
import { get } from 'svelte/store'
/**
 * 
 * @typedef {Object} ActionReturn
 * @property {()=>void} destroy 
 * @property {(props:any)=>void} update method, it will be called whenever that parameter changes
 * 
 *  
 * 
 * @param {HTMLElement} node
 * @param {{handle:HTMLElement, component:string}} props
 * @returns {ActionReturn | void} 
 * 
 */

export function draggable(node, { handle, component, id }) {
    registerDraggable(node, component, id)
    node.draggable = true
    /**
     * Starting to drag
     * @param {DragEvent} event 
     */
    function dragStartHandler(event) {
        event.stopPropagation()

        if (!isEnoughElementsToDrag()) {
            event.preventDefault()
            return false
        } else {
            setDrag(component, id, true)
        }
    }
    function dragEndHandler() {
        const state = get(dragState)
        changePosition(component, state.draggedId, state.targetId)
        setDrag(component, id, false)
    }
    function isDragValid(event) {
        const possibleTargets = getTargetElements(component).map(element => element.elementRef)
        if (possibleTargets.includes(event.target)) {
            event.preventDefault()
            dragState.update(state => {
                return ({
                    ...state,
                    targetId: event.target.id
                })
            })
        }
    }
    //drag end means user released the mouse button
    node.addEventListener('dragend', dragEndHandler)
    //drag start is required for the drag actions
    node.addEventListener('dragstart', dragStartHandler, false)
    node.addEventListener('dragenter', e => isDragValid(e))
    node.addEventListener('dragover', e => isDragValid(e))
    return {
        update: () => { },
        destroy: () => {
            node.removeEventListener('dragstart', dragStartHandler)
            unregister(component, id)
        }
    }
    //node.addEventListener()
}