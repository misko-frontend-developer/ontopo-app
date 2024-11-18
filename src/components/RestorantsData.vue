<template>
  <div
    class="flex flex-col justify-center items-center 2xl:w-1/2 lg:w-3/4 m-auto"
  >
    <div v-if="data && data.length > 0" class="lg:w-full w-4/6">
      <div v-for="(post, index) in data" :key="index" class="mb-5">
        <div class="m-auto" v-for="(post, k) in post" :key="k">
          <SingleRestorant :post="post" />
        </div>
      </div>
    </div>

    <div v-else-if="loading" class="lg:w-full w-4/6 mb-5">
      <SkeletonLoaders />
    </div>

    <div v-if="loadingLoadMore" class="lg:w-full w-4/6 mb-5">
      <div class="h-[180px] bg-gray-300 rounded-lg animate-pulse" />
    </div>

    <div v-else class="w-full mb-5">
      <div v-if="data && data.length > 0">
        <p class="text-center text-gray-600">No more data!</p>
      </div>
      <div v-else class="w-full mb-5" />
    </div>
  </div>
</template>
<script>
import { defineComponent, onMounted, onUnmounted, toRaw } from "vue";
import { storeToRefs } from "pinia";
import { useOntopoActions } from "../stores/OntopoStore";
import SingleRestorant from "./SingleRestorant.vue";
import SkeletonLoaders from "./SkeletonLoaders.vue";
export default defineComponent({
  components: { SingleRestorant, SkeletonLoaders },

  setup() {
    const ontopo = useOntopoActions();
    const { data, searchId, loading, loadingLoadMore } = storeToRefs(ontopo);

    const composer = async () => {
      await ontopo.requestData();
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight >= documentHeight) {
        composer();
      }
    };

    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    return { data, toRaw, loading, loadingLoadMore };
  },
});
</script>
