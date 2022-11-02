import { reactive } from "vue";
import { defineStore } from "pinia";
import appSettings from "../assets/data/settings.json";

export const useSettingsStore = defineStore("settings", () => {
  const settings = reactive(appSettings);
  return { settings };
});
