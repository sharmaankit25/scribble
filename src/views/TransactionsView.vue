<template>
  <h1>Transactions</h1>
  <button @click="showFlash" class="btn btn-success">Emit Event</button>
</template>

<script setup lang="ts">
import { useFlash } from "../stores/utils";
function showFlash() {
  useFlash({ message: "TEST", type: "success" });
}
</script>
