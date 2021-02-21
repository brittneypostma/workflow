<script>
    import { createEventDispatcher } from "svelte";
    import { v4 as uuid } from "uuid";
    import Button from "./button.svelte";

    const dispatch = createEventDispatcher();

    let newTaskTitle = "";

    function add() {
        const task = {
            _id: uuid(),
            title: newTaskTitle
        };

        dispatch('add', { task: task });
    }

    function cancel() {
        dispatch('cancel');
    }
</script>

<div class="flex flex-col space-y-3">
    <input 
        bind:value={newTaskTitle} 
        class="rounded p-2"
        placeholder="Give it a title..." />
    <div class="flex flex-row space-x-3">
        <Button color="green" class="flex-1" on:click={add}>Add</Button>
        <Button color="yellow" class="flex-1" on:click={cancel}>Cancel</Button>
    </div>
</div>