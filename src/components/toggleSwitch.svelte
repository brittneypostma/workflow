<script>
  export let id = ''
  export let text = ''
  export let checked = false
  export let disabled = false
</script>

<label for={id}>
  <div
    class="relative inline-block align-middle bg-transparent cursor-pointer select-none"
  >
    <input
      {id}
      name={id}
      type="checkbox"
      class="sr-only"
      {disabled}
      bind:checked
      on:click
    />
    <div class="w-12 h-6 bg-gray-100 rounded-full shadow-inner" />
    <div
      class="absolute top-0 w-6 h-6 p-1 transition-all duration-300 ease-in-out bg-white rounded-full shadow-md -left-1 thumb dark:bg-gray-800"
    >
      <slot name="icon" />
    </div>
  </div>
  <span class="ml-2 cursor-pointer">{text}</span>
</label>

<style>
  input[type='checkbox']:checked ~ .thumb {
    @apply transform translate-x-full left-1;
  }
</style>
