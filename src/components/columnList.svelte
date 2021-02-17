<script>
    import {flip} from 'svelte/animate'
    import Column from './column.svelte'
    import DragTarget from './dragTarget.svelte'
    import ColumnSkeleton from './columnSkeleton.svelte'
    import { board, changePosition} from '../store/board.store'
    let isDragged
    let dragEvent = {
        index : undefined,
        direction: undefined
    }
    function overHandler(event){
        dragEvent = {
            index:event.detail.id,
            direction:event.detail.direction
        }
    }
    function dropHandler(e){
        changePosition(e.detail, dragEvent.index)
        dragEvent = {
            index:undefined,
            direction:undefined
        }
    }
</script>

{#each $board as column, index (column.id) }
    <div animate:flip={{duration:200}}> 
        <Column on:dragged={(e)=>{isDragged=e.detail}} on:dropped={dropHandler} on:over={overHandler} {index} id={column.id} title={column.title}></Column>
        <!-- if the column is dragged is taken out of the DOM flow, in it's place we render this skeleton-->
        <ColumnSkeleton {isDragged} {index}/>
    </div>
{/each}

<style>

</style>