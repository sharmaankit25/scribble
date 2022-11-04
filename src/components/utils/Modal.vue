<template>
  <TransitionRoot appear :show="props.status" as="template">
    <Dialog as="div" @close="$emit('close', false)" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>
      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full sm:items-center items-end justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                Add Account
              </DialogTitle>
              <div class="my-2">
                <p class="text-sm text-gray-500">Accounts are of 3 types</p>
              </div>
              <form
                class="flex flex-col gap-5"
                @submit.prevent="$emit('submit')"
              >
                <slot></slot>

                <div class="flex justify-between">
                  <button
                    @click="$emit('close', false)"
                    type="button"
                    class="btn btn-danger"
                  >
                    Cancel
                  </button>
                  <button type="submit" class="btn btn-primary">Submit</button>
                </div>
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
<script setup lang="ts">
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
const props = defineProps<{
  status: boolean;
}>();
</script>
