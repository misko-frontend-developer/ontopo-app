<template>
  <header class="flex justify-center p-10">
    <img
      alt="Ontopo logo"
      class="logo"
      src="./assets/logo.svg"
      width="125"
      height="125"
    />
  </header>
  <main>
    <router-view />
  </main>
</template>

<script lang="ts">
import { onMounted, defineComponent } from "vue";
import { storeToRefs } from "pinia";
import { useAuthActions } from "./stores/AuthStore";

export default defineComponent({
  setup() {
    const authActions = useAuthActions();

    onMounted(() => authActions.loginAnonymously());
  },
});
</script>
