<div
  class="flex flex-col w-screen h-screen bg-blue-200 dark:bg-gray-200 mx-auto"
>
  <div
    class="w-full h-12 bg-blue-400 dark:bg-gray-400 flex flex-row justify-end"
  >
    <slot name="header">No header content</slot>
  </div>
  <div class="w-full flex-1">
    <slot>Empty Page</slot>
  </div>
  <footer class="h-12 bg-blue-600 dark:bg-gray-600">Footer content</footer>
</div>
