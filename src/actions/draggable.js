import { 
    dragState,
    registerDraggable,
    unregister,
    setDrag,
    isEnoughElementsToDrag, 
    getTargetElements,
    getDraggedElement,
     } from '../store/drag.store'
import {changePositionByIds} from '../store/board.store'
import { get } from 'svelte/store'
/**
 * 
 * @typedef {Object} ActionReturn
 * @property {()=>void=} destroy 
 * @property {(props:any)=>void=} update method, it will be called whenever that parameter changes
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
        event.stopImmediatePropagation()
        if (!isEnoughElementsToDrag()) {
            event.preventDefault()
            return false
        }else {
            console.log(event.currentTarget)
            setDrag(component, id, true)
        }
    }
    function dragEndHandler(event) {
        const state = get(dragState)
        changePositionByIds(state.draggedId,state.targetId)
        setDrag(component, id, false)
    }
    function isDragValid(event){
        const possibleTargets = getTargetElements(component).map(element => element.elementRef)
        const dragged = getDraggedElement(component)
        if(possibleTargets.includes(event.currentTarget) && dragged.id !== id ){
            event.preventDefault()
            dragState.update(state=>{
                return ({
                    ...state,
                    targetId:id
                })
            })
        }
    }
    //drag end means user released the mouse button
    node.addEventListener('dragend', dragEndHandler)
    //drag start is required for the drag actions
    node.addEventListener('dragstart', dragStartHandler, false)
    node.addEventListener('dragenter', e=>isDragValid(e))
    node.addEventListener('dragover', e=>isDragValid(e))
    return {
        update: () => { },
        destroy: () => {
            node.removeEventListener('dragstart', dragStartHandler)
            unregister(component, id)
        }
    }
    //node.addEventListener()
}