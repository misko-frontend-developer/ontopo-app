<template>
  <div>
    <div class="justify-center flex items-center h-screen">
      <button @click="filter">Run Search</button>
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
import { onMounted, computed } from "vue";
import { storeToRefs } from "pinia";
import { useOntoActions } from "../stores/OntoActions";

import ErrorHandler from "../components/ErrorHandler.vue";

export default {
  components: { ErrorHandler },
  setup() {
    const onto = useOntoActions();
    const { authError, data, searchId } = storeToRefs(onto);

    onMounted(() => onto.loginAnonymously());

    const filter = async () => {
      await onto.runFilter();
      if (searchId.value) {
        await onto.requestData();
      }
    };

    const composer = async () => {
      await onto.requestData();
    };

    return { authError, filter, data, composer };
  },
};
</script>

<style lang="scss" scoped></style>
