<template>
  <header>
    <!-- <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" /> -->
  </header>

  <main>
    {{ authError }}
  </main>
</template>

<style scoped>
/* header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
} */
</style>

<script lang="ts">
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useOntoActions } from "./stores/OntoActions";
export default {
  setup() {
    const onto = useOntoActions();
    const { authError } = storeToRefs(onto);
    onMounted(() => onto.loginAnonymously());

    return { authError };
  },
};
</script>
