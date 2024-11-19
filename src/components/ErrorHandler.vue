<template>
  <div
    class="text-center py-20 shadow-lg bg-gradient-to-b from-gray-800 to-gray-900 relative overflow-hidden h-[50vh] ma-auto"
  >
    <div class="absolute inset-0 flex items-center justify-center">
      <div
        class="h-32 w-32 bg-red-600 opacity-30 rounded-full blur-xl animate-pulse"
      ></div>
    </div>
    <div class="relative z-10">
      <div class="flex justify-center">
        <div class="bg-red-600 rounded-full p-4 animate-bounce">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-10 w-10 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M18 10c0 4.418-3.582 8-8 8a8 8 0 100-16c4.418 0 8 3.582 8 8zM9 9V5a1 1 0 112 0v4a1 1 0 01-2 0zm0 4a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>
      <h1 class="text-4xl text-white font-extrabold mt-6">
        Something Went Wrong
      </h1>
      <p class="text-gray-400 mt-4">{{ authError }}, please try again!</p>
      <div class="mt-6 flex justify-center gap-4">
        <button
          v-if="isTokenError"
          onclick="window.location.reload()"
          class="w-1/4 px-6 py-3 bg-gray-700 hover:bg-gray-800 rounded-lg text-white font-semibold shadow-md transition transform hover:scale-105"
          @click="renewSession"
        >
          Refresh session
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";
import { useAuthActions } from "../stores/AuthStore";
import { storeToRefs } from "pinia";
export default defineComponent({
  name: "ErrorHandler",
  setup() {
    const authActions = useAuthActions();
    const { authError } = storeToRefs(authActions);

    const isTokenError = computed(() => {
      return (
        typeof authError.value === "string" &&
        authError.value.toLowerCase().includes("token")
      );
    });

    const renewSession = () => authActions.renewSession();

    return { renewSession, authError, isTokenError };
  },
});
</script>
