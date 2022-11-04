import { defineStore } from "pinia";
import { useEventBus } from "@vueuse/core";

export const useFlash = ({ message, type }) => {
  const bus = useEventBus<string>("flash-message");
  bus.emit({ message, type });
};
