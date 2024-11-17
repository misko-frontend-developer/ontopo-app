<template>
  <div class="justify-center flex bg-blue-300 items-center h-screen text-4xl">
    {{ authError }}

    <button
      v-if="authError && authError.toLowerCase().includes('token')"
      @click="renewSession"
    >
      Renew session
    </button>
  </div>
</template>

<script>
import { useAuthActions } from "../stores/AuthStore";
import { storeToRefs } from "pinia";

export default {
  name: "ErrorHandler",
  setup() {
    const authActions = useAuthActions();
    const { authError } = storeToRefs(authActions);
    const renewSession = () => authActions.renewSession();

    return { renewSession, authError };
  },
};
</script>
