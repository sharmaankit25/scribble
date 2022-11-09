<script setup lang="ts">
import { useRegisterSW } from "virtual:pwa-register/vue";
const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW();

const close = async () => {
  offlineReady.value = false;
  needRefresh.value = false;
};
</script>

<template>
  <Transition name="slide-fade">
    <div v-if="offlineReady || needRefresh" class="toast" role="alert">
      <div class="alert alert-info">
        <span v-if="offlineReady"> App ready to work offline </span>
        <span v-else>
          New content available, click on reload button to update.
        </span>
        <button
          class="btn btn-sm btn-info"
          v-if="needRefresh"
          @click="updateServiceWorker()"
        >
          Reload
        </button>
        <button class="btn btn-sm btn-error" @click="close">×</button>
      </div>
    </div>
  </Transition>
</template>
<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.4s;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(400px);
  opacity: 0;
}
</style>
