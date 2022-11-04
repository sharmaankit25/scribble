import { useEventBus } from "@vueuse/core";
import { ref } from "vue";

export const useFlash = ({ message, type }) => {
  const bus = useEventBus<string>("flash-message");
  bus.emit({ message, type });
};

export const useModal = () => {
  const isOpen = ref<boolean>(false);

  function closeModal() {
    console.log("C")
    isOpen.value = false;
  }

  function openModal() {
    isOpen.value = true;
  }

  return { closeModal, openModal, isOpen };
};
