<template>
  <header>
    <!-- <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" /> -->
  </header>

  <main>
    <div v-if="authError">
      <ErrorHandler :errorMessage="authError" />
    </div>
    <div class="justify-center flex items-center h-screen" v-else>
      <button @click="filter">Run Search</button>
      <button @click="composer">Load More</button>
    </div>

    <div>
      <div v-if="data && data.length > 0">
        <div v-for="modifier in data" :key="modifier">
          <ul v-for="(post, k) in modifier" :key="k">
            <li>{{ post.post.venue_name }}</li>
          </ul>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { onMounted, computed } from "vue";
import { storeToRefs } from "pinia";
import { useOntoActions } from "./stores/OntoActions";

import ErrorHandler from "./components/ErrorHandler.vue";

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
