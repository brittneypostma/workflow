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
    /** @type {number} */
    let x
    /** @type {number} */
    let y
    /** @type {"left"|"right"=} */
    let movingDirection
    let elementSiblings = {
        left : node.previousElementSibling !== null,
        right : node.nextElementSibling !== null
    }
    //node.setAttribute('draggable', 'true')
    /** @param {MouseEvent} event */
    function mouseDownHandler(event){
        node.style.zIndex = '1000'
        x = event.clientX
        y = event.clientY
        window.addEventListener('mousemove', mouseMoveHandler)
        window.addEventListener('mouseup', mouseUpHandler)
    }
    /** @param {MouseEvent} event */
    function mouseMoveHandler(event){
        node.style.pointerEvents = "none"
        const containerBounds = node.parentElement.getBoundingClientRect()
        const nodeRect = node.getBoundingClientRect()
        const toRightBorder = containerBounds.right - nodeRect.right
        const toleftBorder = nodeRect.left - containerBounds.left 
        const possibilities = {
            canMoveRight : (toRightBorder>0),
            canMoveLeft : (toleftBorder > 0),
        }
        const dx = event.clientX - x 
		const dy = event.clientY - y
        if(dx>= 0 ){
            movingDirection="right"
        }else movingDirection = "left"

        if(dx>0 && possibilities.canMoveRight || dx<0 && possibilities.canMoveLeft){
            node.dispatchEvent(new CustomEvent('moving', {detail:{dx,dy, x,y}}))
        }
		x = event.clientX
		y = event.clientY
       
    }
    function mouseUpHandler(){
        node.style.pointerEvents = "initial"
        node.style.zIndex = 'initial'
        const nodeRect = node.getBoundingClientRect()

        const leftSiblingRect = node.previousElementSibling.getBoundingClientRect()
        const rightSiblingRect = node.nextElementSibling.getBoundingClientRect()

        const nodeCenter = getCenterRectX(nodeRect.x,nodeRect.width)
        const leftSiblingCenter = getCenterRectX(leftSiblingRect.x, leftSiblingRect.width)
        console.log(nodeCenter - leftSiblingCenter)
        //console.log({1:node.previousElementSibling, 2:node.nextElementSibling})
        window.removeEventListener('mousemove', mouseMoveHandler)
        window.removeEventListener('mouseup', mouseUpHandler);
        node.dispatchEvent(new CustomEvent('drop', {detail:{
            dropID:0
        }}))
    }
    node.addEventListener('mousedown', mouseDownHandler, false)
}
function getCenterRectX(x, width){
    return x+(width/2)

}