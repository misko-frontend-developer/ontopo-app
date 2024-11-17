<template>
  <div class="justify-center flex bg-blue-300 items-center h-screen text-4xl">
    {{ errorMessage }}

    <p>Something went wrong, refresh page</p>
  </div>
</template>

<script>
export default {
  props: ["errorMessage"],
};
</script>
