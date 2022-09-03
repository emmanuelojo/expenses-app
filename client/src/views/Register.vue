<template>
  <div class="flex justify-center w-[90vw] md:w-[70vw]">
    <div class="w-full md:w-96 px-3 py-4 grid gap-4">
      <p class="uppercase text-2xl font-semibold">Register</p>
      <input
        type="text"
        placeholder="username"
        class="py-2 pl-1 bg-transparent text-n-black placeholder:text-n-gray placeholder:pl-1 border border-n-black outline-none"
      />
      <input
        type="email"
        placeholder="example@mail.com"
        class="py-2 pl-1 bg-transparent text-n-black placeholder:text-n-gray placeholder:pl-1 border border-n-black outline-none"
      />
      <input
        type="password"
        placeholder="password"
        class="py-2 pl-1 bg-transparent text-n-black placeholder:text-n-gray placeholder:pl-1 border border-n-black outline-none"
      />

      <p
        @click="handleRegister"
        class="uppercase bg-green-800 text-white px-8 py-3 w-fit cursor-pointer"
      >
        register
      </p>
      <router-link :to="{ name: 'Login' }"
        ><p class="uppercase underline text-xs">
          already have an account?
        </p></router-link
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from "vue";
import router from "../router";
import authStore from "../store/authStore";

export default defineComponent({
  name: "Register",
  setup() {
    onMounted(() => {
      changeBg();
    });

    onUnmounted(() => {
      changeBg();
    });

    const changeBg = () => {
      // authStore.mutations.setBgColour(false);
    };

    const handleRegister = () => {
      router.push("/");
    };

    return { handleRegister };
  },
});
</script>
