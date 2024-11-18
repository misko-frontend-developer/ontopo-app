<template>
  <div>
    <ReservationForm />
    <RestorantsData />
  </div>
</template>

<script lang="ts">
import ReservationForm from "../components/ReservationForm.vue";
import RestorantsData from "../components/RestorantsData.vue";

export default {
  components: { ReservationForm, RestorantsData },
};
</script>
