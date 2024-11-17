<template>
  <header>
    <!-- <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" /> -->
  </header>
  <router-view />
  <main>
    <div v-if="authError">
      <ErrorHandler :errorMessage="authError" />
    </div>
  </main>
</template>

<script>
export default {};
</script>
