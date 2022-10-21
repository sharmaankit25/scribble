<script setup lang="ts">
import { computed, ref } from "vue";
import { marked } from "marked";
defineProps<{
  msg: string;
}>();

const markdown = ref<string>("");

const markdownToHtml = computed(() => marked(markdown.value));
</script>

<template>
  <div class="greetings">
    <textarea v-model="markdown" rows="20" cols="20"></textarea>
    <div v-html="markdownToHtml"></div>
    <input type="checkbox" class="checkbox checkbox-secondary" />
  </div>
</template>
