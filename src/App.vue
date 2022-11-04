<script setup lang="ts">
import { RouterView } from "vue-router";
import Header from "./components/layouts/Header.vue";
import Sidebar from "./components/layouts/Sidebar.vue";
import Footer from "./components/layouts/Footer.vue";
import appSettings from "./assets/data/settings.json";
import Group from "./stores/models/Group.modal";
import Category from "./stores/models/Category.modal";
import { useRepo } from "pinia-orm";
import AccountType from "./stores/models/AccountType.modal";

const groupRepo = useRepo(Group);
const categoryRepo = useRepo(Category);
const accountTypeRepo = useRepo(AccountType);

groupRepo.save(appSettings.accounts.groups);
categoryRepo.save(appSettings.accounts.categories);
accountTypeRepo.save(appSettings.accounts.types);
</script>

<template>
  <Header />
  <Sidebar />
  <main class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
    <flash-message></flash-message>
    <RouterView />
  </main>
  <Footer />
</template>

<style scoped></style>
