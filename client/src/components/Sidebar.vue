<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import store from "../store/transactionsStore";
import authStore from "../store/authStore";
import { logout } from "../utils/helpers";

onMounted(() => {
  authStore.actions.getUser();

  let bodyElement = document.body;
  bodyElement.classList.add("app-background");

  let htmlElement = document.documentElement;
  localStorage.setItem("theme", "dark");
  htmlElement.setAttribute("theme", "dark");
  store.mutations.setTheme(true);

  let theme = localStorage.getItem("theme");

  if (theme === "dark") {
    htmlElement.setAttribute("theme", "dark");
    darkMode.value = true;
  } else {
    htmlElement.setAttribute("theme", "light");
    darkMode.value = false;
  }
});

const darkMode = ref(false);

const emit = defineEmits(["dark-mode"]);

watch(darkMode, () => {
  let htmlElement = document.documentElement;

  if (darkMode.value) {
    localStorage.setItem("theme", "dark");
    htmlElement.setAttribute("theme", "dark");
    store.mutations.setTheme(true);
  } else {
    localStorage.setItem("theme", "light");
    htmlElement.setAttribute("theme", "light");
    store.mutations.setTheme(false);
  }
});

const sidebarTabs = ref([
  "Platform Launch",
  "Marketing Plan",
  "Roadmap",
  "Create New Board",
]);

const sidebarStatus = ref(store.getters.sidebarStatus);

const user = ref(authStore.getters.user);

const toggleSidebar = () => {
  store.mutations.setSidebar(!sidebarStatus.value);
};
</script>

<template>
  <nav
    :class="[
      sidebarStatus ? 'w-20' : 'w-20',
      darkMode ? 'bg-n-bg' : 'bg-white',
    ]"
    class="h-screen border flex flex-col justify-between"
  >
    <div class="flex flex-col gap-4">
      <router-link to="/">
        <p
          class="uppercase text-center pt-5 pb-10 font-bold"
          :class="darkMode ? 'text-white' : 'text-n-darker-blue'"
        >
          Logo
        </p>
      </router-link>

      <router-link to="/chart" class="text-white flex justify-center"
        ><i class="fa fa-line-chart"></i>
      </router-link>
    </div>

    <div class="grid gap-4 mb-4">
      <div
        @click="toggleSidebar"
        class="px-4 flex justify-center items-center text-n-gray text-xs font-semibold cursor-pointer"
      >
        <span v-if="darkMode" class="material-symbols-outlined">
          light_mode
        </span>
        <span v-else class="material-symbols-outlined"> dark_mode </span>
      </div>

      <div @click="logout" class="mx-auto px-4 text-n-gray cursor-pointer">
        <span class="material-symbols-outlined"> logout </span>
      </div>

      <div class="pt-5 flex justify-center items-center border-t border-white">
        <div
          class="w-10 h-10 rounded-full bg-n-bg-sec flex justify-center items-center"
        >
          <!-- <p class="uppercase text-white">{{ user.username }}</p> -->
          <img
            src="https://i.pravatar.cc/300"
            alt="Profile Image"
            class="text-[8px] h-10 w-10 rounded-full object-cover"
          />
        </div>
      </div>
    </div>
  </nav>
</template>

<style>
.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
.switch input:checked + .slider {
  background-color: #6868f7;
}

.switch input:focus + .slider {
  box-shadow: 0 0 1px #6868f7;
}

.switch input:checked + .slider:before {
  -webkit-transform: translateX(20px);
  -ms-transform: translateX(20px);
  transform: translateX(20px);
}
.switch .slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  border-radius: 20px;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.switch .slider:before {
  position: absolute;
  content: "";
  height: 15px;
  width: 15px;
  left: 2px;
  bottom: 4px;
  top: 3px;
  border-radius: 50%;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.c-switch {
  position: relative;
  display: block;
  height: 20px;
  width: 80px;
  border-radius: 40%;
  overflow: hidden;
  border: 2px solid;
  cursor: pointer;
}

.c-switch span {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  transition: 2s ease-in-out;
}

.c-switch span::after {
  content: "";
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  /* left: 4px; */
  right: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  animation-duration: 300ms;
  border: 2px solid #d9d9d9;
}

input:checked + span {
  background: #8470f4;
}

input:checked + span::after {
  top: 50%;
  left: calc(100% - 4px);
  transform: translateX(-100%) translateY(-50%);
  animation: toggleSize 300ms ease;
}
</style>
