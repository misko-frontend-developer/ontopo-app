<template>
  <div
    class="flex flex-col justify-center items-center bg-blue-200 min-h-[30rem]"
  >
    <div class="2xl:w-1/2 lg:w-3/4 py-10 lg:text-start text-center">
      <h1 class="font-bold m-auto text-4xl mb-4">
        Kulinarsko iskustvo u Beogradu
      </h1>

      <p class="font-thin m-auto text-2xl">
        Oseti njegov duh gde svaki zalogaj otkriva priču o tradiciji i
        inovaciji. Neka gastronomija Beograda probudi sva tvoja čula i učini da
        želiš još.
      </p>
    </div>
    <div
      class="flex lg:flex-row flex-col justify-center items-center 2xl:w-1/2 lg:w-3/4"
    >
      <div class="flex justify-center items-center">
        <input
          class="text-center h-[70px] w-[220px] border border-gray rounded-sm p-2"
          id="size"
          type="number"
          v-model="formData.size"
          min="1"
        />

        <input
          class="text-center h-[70px] w-[220px] border border-gray rounded-sm p-2"
          id="date"
          type="date"
          v-model="formData.date"
          onkeydown="return false"
          :min="todayDate"
        />

        <input
          class="text-center h-[70px] w-[220px] border border-gray rounded-sm p-2"
          id="time"
          type="time"
          v-model="formData.time"
          onkeydown="return false"
        />
      </div>
      <button
        class="lg:w-[260px] w-full h-[70px] bg-stone-950 text-white px-4 rounded-sm lg:ml-5 ml-0 lg:mt-0 mt-5 font-bold"
        @click="filter"
      >
        Pretraži
      </button>
    </div>
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
    const todayDate = computed(() => new Date().toISOString().split("T")[0]);

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
      todayDate,
    };
  },
});
</script>
