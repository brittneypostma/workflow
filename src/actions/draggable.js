import {spring} from 'svelte/motion'
/**
 * 
 * @typedef {Object} ActionReturn
 * @property {()=>void=} destroy 
 * @property {(props:any)=>void=} update method will be called whenever that parameter changes
 * 
 * @param {HTMLElement} node Element where the action is applied
 * @param {any} props Addtional parameters passed to action, using use:action={props}
 * @returns {ActionReturn | void} 
 * 
 */
export function draggable(node, props ) {
    let clientMousePosition = {x:0,y:0}
    let originalNodeRect = undefined

    const wobblingEffect = spring(0,{
        stiffness:0.03,
        damping:0.21
    })
    const nodePosition = spring({
        top:node.getBoundingClientRect().top,left:node.getBoundingClientRect().left, height:node.getBoundingClientRect().height
    })
    const dostroyMoving = nodePosition.subscribe((value)=>{
        if(node.style.position === 'fixed'){
            node.style.top = value.top+'px'
            node.style.left = value.left+'px'
            node.style.height = value.height+'px'
        }
    })
    const destroyWobbbling = wobblingEffect.subscribe((value)=>{
        node.style.transform = `translate3d(${value}px,0,0) rotate3d(1,1,-2,${value}deg)`
    })
    //node.setAttribute('draggable', 'true')
    /** @param {MouseEvent} event */
    function mouseDownHandler(event){
        //is there a more elegant way to handle this?
        if(event.target instanceof HTMLInputElement) return
        clientMousePosition.x = event.clientX
        clientMousePosition.y = event.clientY
        originalNodeRect = node.getBoundingClientRect()
        nodePosition.set({top:originalNodeRect.top, left:originalNodeRect.left, height:originalNodeRect.height}, {hard:true})
        
        window.addEventListener('mousemove', mouseMoveHandler)
        window.addEventListener('mouseup', mouseUpHandler)
    }
    /** @param {MouseEvent} event */
    function mouseMoveHandler(event){
        node.style.zIndex = '100'
        node.style.pointerEvents = "none"
        node.style.position = "fixed"
        node.dispatchEvent(new CustomEvent('dragged', {detail:true}))
        const dx = event.clientX - clientMousePosition.x 
		const dy = event.clientY - clientMousePosition.y
        const siblingOver = document.elementFromPoint(event.clientX, event.clientY)
        siblingOver.dispatchEvent(new CustomEvent("over", {detail:{
            id:+siblingOver.id,
            direction : dx<0?'left':'right'
        }}))
        nodePosition.update((position)=>({
            top:position.top + dy,
            left:position.left + dx,
            height:position.height
        }))
        wobblingEffect.set(-dx)
		clientMousePosition.x = event.clientX
		clientMousePosition.y = event.clientY
       
    }
    function mouseUpHandler(){
        
        node.style.pointerEvents = "initial"
        node.style.zIndex = 'initial'
        node.style.position = 'initial'
        //originalNodeRect = node.getBoundingClientRect()
        nodePosition.set({top:originalNodeRect.top, left:originalNodeRect.left, height:originalNodeRect.height},{hard:true})
        node.dispatchEvent(new CustomEvent('dragged', {detail:false}))
        node.dispatchEvent(new CustomEvent('dropped', {detail:node.id}))
        wobblingEffect.set(0, {hard:true})
        window.removeEventListener('mousemove', mouseMoveHandler)
        window.removeEventListener('mouseup', mouseUpHandler);
    }
    node.addEventListener('mousedown', mouseDownHandler, false)
    return ({
        destroy: ()=>{
            destroyWobbbling()
            dostroyMoving()
        }
    })
}