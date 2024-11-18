<template>
  <div class="flex md:flex-row flex-col justify-center items-center p-10">
    <div class="flex justify-center items-center">
      <input
        class="md:max-w-[195px] md:w-[195px] w-[150px] text-center h-[70px] border border-gray rounded-sm p-2"
        id="size"
        type="number"
        v-model="formData.size"
        min="1"
      />

      <input
        class="md:max-w-[195px] md:w-[195px] w-[150px] text-center h-[70px] border border-gray rounded-sm p-2"
        id="date"
        type="date"
        v-model="formData.date"
        onkeydown="return false"
        :min="formData.date"
      />

      <input
        class="md:max-w-[195px] md:w-[195px] w-[150px] text-center h-[70px] border border-gray rounded-sm p-2"
        id="time"
        type="time"
        v-model="formData.time"
        onkeydown="return false"
      />
    </div>
    <button
      class="md:max-w-[210px] max-w-[480px] md:w-[210px] h-[70px] w-[450px] bg-stone-950 text-white px-4 md:mt-0 mt-5 rounded-sm md:ml-5 ml-0 font-bold"
      @click="filter"
    >
      Pretraži
    </button>
  </div>
</template>

<script lang="ts">
import { storeToRefs } from "pinia";
import { defineComponent, reactive, computed } from "vue";
import { useOntopoActions } from "../stores/OntopoStore";

export default defineComponent({
  name: "ReservationForm",
  setup() {
    const ontopo = useOntopoActions();
    const { searchId } = storeToRefs(ontopo);

    const formData = reactive({
      size: 2,
      date: new Date().toISOString().split("T")[0],
      time: "17:00",
    });

    const filter = async () => {
      await ontopo.runFilter({
        size: formData.size.toString(),
        date: formData.date.replace(/[-:]/g, ""),
        time: formData.time.replace(/[-:]/g, ""),
      });
      if (searchId.value) {
        await ontopo.requestData();
      }
    };

    return {
      formData,
      filter,
    };
  },
});
</script>
