<template>
  <div>
    <ReservationForm />
    <div class="justify-center flex items-center">
      <button @click="composer">Load More</button>
    </div>

    <div v-if="data && data.length > 0">
      <div v-for="modifier in data" :key="modifier">
        <ul v-for="(post, k) in modifier" :key="k">
          <li>{{ post.post.venue_name }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { storeToRefs } from "pinia";
import { useOntopoActions } from "../stores/OntopoStore";
import ReservationForm from "../components/ReservationForm.vue";
import ErrorHandler from "../components/ErrorHandler.vue";

export default {
  components: { ErrorHandler, ReservationForm },
  setup() {
    const ontopo = useOntopoActions();
    const { data, searchId } = storeToRefs(ontopo);

    const composer = async () => {
      await ontopo.requestData();
    };

    return { data, composer };
  },
};
</script>
