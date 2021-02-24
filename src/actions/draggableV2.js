import { element } from 'svelte/internal'
import {writable, get} from 'svelte/store'
const draggableElements = writable([])
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
export function draggable(node, { handle, component }) {
   
    console.log('registered ', node.id)
    draggableElements.update(store => {
        return [...store, node]
    })
    node.dataset["key"] = component;
    /**
     * Starting to drag
     * @param {DragEvent} event 
     */
    function dragStartHandler(event) {
        //event.preventDefault()
        this.style.opacity = "0"
        const notDragged = get(draggableElements).filter(element=>
            !event.target.isSameNode(element)
        )
        notDragged.forEach(element=>{
            element.addEventListener('dragenter', e=>{
                console.log(e.target.id,'something over me')
            })
        })
        //event.dataTransfer.setDragImage(node.cloneNode(false))
    }
    function dragEndHandler(event){
        this.style.opacity = "1"
    }
    /**
     * 
     * @param {DragEvent} event Drag event  
     */
    function dragEnterHandler(event){
       // console.log(event.detail)
    }
    /**
     * Gives an element with a key or it's parent with this key 
     * @param {string} key 
     * @param {HTMLElement} element 
     */
    function findElementByKey(key, element){
        if(element.dataset[key] === key){
            return element
        }else if(element.parentElement.dataset[key] === key){
            return element.parentElement
        }
    }
    node.addEventListener('dragend', dragEndHandler)
    node.addEventListener('dragenter', (e)=>{
       // console.log(typeof dragged)
       // node.addEventListener('dragenter',dragEnterHandler)
    })
    node.addEventListener('dragover', (e)=>{
        e.preventDefault()
    })
    node.addEventListener('dragstart', dragStartHandler)
    return {
        update: () => { },
        destroy: () => { 
            node.removeEventListener('dragstart', dragStartHandler)
        }
    }
    //node.addEventListener()
}