<template>
  <header class="flex justify-center bg-gray-800 p-10">
    <p class="font-semibold">Ontopo Application</p>
    <!-- <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" /> -->
  </header>
  <main>
    <div v-if="authError">
      <ErrorHandler :errorMessage="authError" />
    </div>
    <div v-else>
      <router-view />
    </div>
  </main>
</template>

<script lang="ts">
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useAuthActions } from "./stores/AuthStore";
import ErrorHandler from "./components/ErrorHandler.vue";

export default {
  components: { ErrorHandler },
  setup() {
    const authActions = useAuthActions();
    const { authError } = storeToRefs(authActions);

    onMounted(() => authActions.loginAnonymously());

    return { authError };
  },
};
</script>
