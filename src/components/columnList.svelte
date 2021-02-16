<script>
    import {flip} from 'svelte/animate'
    import Column from './column.svelte'
    import DragTarget from './dragTarget.svelte'
    import { board, changePosition} from '../store/board.store'
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
        <Column on:dropped={dropHandler} on:over={overHandler} {index} id={column.id} title={column.title}></Column>
    </div>
{/each}

<style>

</style>