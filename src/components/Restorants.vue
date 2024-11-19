<template>
  <div
    class="flex flex-col justify-center items-center 2xl:w-1/2 lg:w-3/4 m-auto"
  >
    <div v-if="data && data.length > 0" class="lg:w-full w-4/6">
      <div v-for="(post, index) in data" :key="index" class="mb-5">
        <div class="m-auto" v-for="(postDetail, k) in post" :key="k">
          <Restorant :post="postDetail" />
        </div>
      </div>

      <div
        v-if="loadingLoadMore"
        class="h-[180px] bg-gray-300 rounded-lg animate-pulse"
      ></div>

      <div v-else class="w-full mb-5">
        <p class="text-center text-gray-600">No more data!</p>
      </div>
    </div>

    <div v-else-if="loading" class="lg:w-full w-4/6 mb-5">
      <SkeletonLoaders />
    </div>
  </div>
</template>
<script>
import { defineComponent, onMounted, onUnmounted, computed } from "vue";
import { storeToRefs } from "pinia";
import { useOntopoActions } from "../stores/OntopoStore";
import Restorant from "./Restorant.vue";
import SkeletonLoaders from "./SkeletonLoaders.vue";

export default defineComponent({
  components: { Restorant, SkeletonLoaders },
  name: "Restorants",
  setup() {
    const ontopo = useOntopoActions();
    const { data, loading, loadingLoadMore } = storeToRefs(ontopo);

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

    return { data, loading, loadingLoadMore };
  },
});
</script>
