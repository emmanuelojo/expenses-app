<template>
  <div>
    <p>Are you sure you want to delete this expense?</p>

    <div class="grid grid-cols-n-2auto gap-4 mt-8">
      <button
        class="border border-transparent rounded py-2 bg-red-500 text-white"
        @click="proceedToAction"
      >
        Yes
      </button>

      <button
        class="border border-transparent rounded py-2 bg-n-white-sec text-n-black"
        @click="cancelAction"
      >
        No
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, ref } from "vue";

const emit = defineEmits(["proceed", "decline"]);

const proceedToAction = () => {
  emit("proceed");
};

const cancelAction = () => {
  emit("decline");
};
</script>

<style scoped></style>
