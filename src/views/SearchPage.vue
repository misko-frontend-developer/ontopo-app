<template>
  <ReservationForm />
  <div v-if="authError">
    <ErrorHandler :errorMessage="authError" />
  </div>
  <div v-else>
    <RestorantsData />
  </div>
</template>

<script lang="ts">
import ReservationForm from "../components/ReservationForm.vue";
import RestorantsData from "../components/RestorantsData.vue";
import ErrorHandler from "../components/ErrorHandler.vue";
import { storeToRefs } from "pinia";
import { useAuthActions } from "../stores/AuthStore";
export default {
  components: { ReservationForm, RestorantsData, ErrorHandler },
  setup() {
    const authActions = useAuthActions();
    const { authError } = storeToRefs(authActions);
    return { authError };
  },
};
</script>
