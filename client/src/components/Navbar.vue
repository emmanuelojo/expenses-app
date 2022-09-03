<script setup lang="ts">
import { ref, watch, onBeforeMount } from "vue";
// import Modal from "./Modal.vue";
// import AddNewTask from "./AddNewTask.vue";
import store from "../store/transactionsStore";

onBeforeMount(() => {
  window.addEventListener("scroll", handleScroll);
});

const topOfPage = ref(true);

const showCreateTaskModal = ref(false);

const darkMode = ref(true);

const theme = ref(store.getters.darkTheme);

watch(theme, (newVal, oldVal) => {
  newVal === true ? (darkMode.value = true) : (darkMode.value = false);
});

const handleScroll = () => {
  if (window.pageYOffset > 0) {
    if (topOfPage.value) topOfPage.value = false;
  } else {
    if (!topOfPage.value) topOfPage.value = true;
  }
};
</script>

<template>
  <nav
    class="p-4 flex justify-between items-center border"
    :class="[{ onScroll: !topOfPage }, darkMode ? 'bg-n-bg' : 'bg-white']"
  >
    <div>
      <p class="font-bold text-xl text-n-purple">Platform Launch</p>
    </div>

    <div class="flex items-center gap-4">
      <div
        @click="showCreateTaskModal = true"
        class="flex items-center gap-2 bg-n-blue rounded-full sm:rounded-2xl px-3 sm:px-5 py-2 text-white cursor-pointer hover:scale-105"
      >
        <i class="fa fa-plus text-sm"></i>
        <p class="hidden sm:block text-white text-sm font-semibold">
          Add New Task
        </p>
      </div>

      <div class="cursor-pointer hover:scale-105 text-n-purple">
        <i class="fa fa-ellipsis-v"></i>
      </div>
    </div>
  </nav>

  <!-- <Modal
    v-if="showCreateTaskModal"
    title="Add New Task"
    @close-modal="showCreateTaskModal = false"
  >
    <AddNewTask @success="showCreateTaskModal = false" />
  </Modal> -->
</template>

<style>
@import "../index.css";

.onScroll {
  box-shadow: 0 0 1px #aaa;
  background-color: var(--app-background-color);
}
</style>
