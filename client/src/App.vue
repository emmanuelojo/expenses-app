<script setup lang="ts">
import Sidebar from "./components/Sidebar.vue";
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <div class="grid md:grid-cols-auto-1fr bg-n-bg h-screen overflow-auto">
    <div class="hidden md:block">
      <Sidebar :showSidebar="true" />
    </div>

    <div>
      <Navbar />

      <router-view />
    </div>
  </div>
</template>

<style></style>
