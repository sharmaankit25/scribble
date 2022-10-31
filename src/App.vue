<script setup lang="ts">
import { RouterView } from "vue-router";
import Header from "./components/layouts/Header.vue";
import Sidebar from "./components/layouts/Sidebar.vue";
import Footer from "./components/layouts/Footer.vue";
</script>

<template>
  <Header />
  <Sidebar />
  <main class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
    <RouterView />
  </main>
  <Footer />
</template>

<style scoped></style>
