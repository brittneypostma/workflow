<script>
  export let name
  let isEditing = false
  let inputField
  function toggleEdit() {
    isEditing = !isEditing
  }
</script>

<header
  class="text-sm font-thin h-5 border-b-2 border-blue-600"
  on:click={toggleEdit}
>
  {#if isEditing}
    <input
      type="text"
      on:blur={() => {
        console.log(inputField.value)
        toggleEdit()
      }}
      bind:this={inputField}
    />
  {:else}
    {name}
  {/if}
</header>
