<template>
  <div class="flex justify-center items-center my-24">
    <div>
      <label class="hidden" for="size">Size (Number of Guests):</label>
      <input
        class="h-[50px]"
        id="size"
        type="number"
        v-model="formData.size"
        placeholder="Size (Number of Guests)"
        min="1"
      />
    </div>
    <div>
      <label class="hidden" for="date">Date of Reservation:</label>
      <input
        class="h-[50px]"
        id="date"
        type="date"
        v-model="formData.date"
        placeholder="Date of Reservation:"
        onkeydown="return false"
      />
    </div>

    <div>
      <label class="hidden" for="time">Time of Reservation:</label>
      <input
        class="h-[50px]"
        id="time"
        type="time"
        v-model="formData.time"
        placeholder="Time of Reservation:"
        onkeydown="return false"
      />
    </div>

    <button class="bg-blue-500 ml-5 px-5 h-[50px]" @click="filter">
      Pretrazi
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
