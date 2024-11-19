<template>
  <ReservationForm />
  <div v-if="authError">
    <ErrorHandler />
  </div>
  <div v-else>
    <Restorants />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import ReservationForm from "../components/ReservationForm.vue";
import Restorants from "../components/Restorants.vue";
import ErrorHandler from "../components/ErrorHandler.vue";
import { storeToRefs } from "pinia";
import { useAuthActions } from "../stores/AuthStore";

export default defineComponent({
  components: { ReservationForm, Restorants, ErrorHandler },
  setup() {
    const authActions = useAuthActions();
    const { authError } = storeToRefs(authActions);
    return { authError };
  },
});
</script>
