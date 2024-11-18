<template>
  <div class="flex lg:flex-row flex-col my-5 border border-gray rounded-sm p-4">
    <div class="lg:w-[190px] w-100 lg:px-0 px-5 lg:mb-0 mb-4">
      <img
        width="100%"
        style="min-height: 100px; min-width: 100px"
        src="https://random.imagecdn.app/150/100"
        alt="random-image"
      />
    </div>
    <div class="flex flex-col w-full px-5">
      <p class="font-bold">{{ post.post.venue_name }}</p>
      <p class="text-sm mt-2">
        {{ post.availability.formattedRequest.date }} -
        {{ post.availability.formattedRequest.time }}
      </p>
      <p class="text-sm">
        {{ post.availability.formattedRequest.service }}
      </p>
      <hr class="my-5" />

      <div
        v-if="post.availability.areas"
        @click="show = !show"
        class="cursor-pointer text-right text-sm"
      >
        {{ show ? "Nazad" : "Pokaži mi još" }}
      </div>

      <div
        :class="
          show
            ? 'flex flex-col max-h-screen  overflow-hidden transition-all duration-500'
            : 'flex flex-col max-h-0 overflow-hidden transition-all duration-500'
        "
      >
        <div v-for="area in post.availability.areas" :key="area">
          <p class="my-5 text-sm">{{ area.name }}</p>
          <div class="flex lg:flex-row flex-col">
            <div
              class="flex flex-col text-center cursor-pointer border border-gray rounded-sm md:mr-5 mr-0 md:my-0 my-2 p-2"
              v-for="option in area.options"
              :key="option"
            >
              <p class="text-sm mx-5">
                {{
                  `${option.time}`.padStart(4, "0").replace(/(..)(..)/, "$1:$2")
                }}
              </p>
              <p class="text-sm">{{ option.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, toRaw, ref } from "vue";

export default defineComponent({
  props: ["post"],

  setup() {
    const show = ref(false);
    return { toRaw, show };
  },
});
</script>
