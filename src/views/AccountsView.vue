<template>
  <!-- <div class="btn-group">
    <button class="btn btn-primary">Add Account +</button>
    <button class="btn">Button</button>
    <button class="btn">Button</button>
  </div> -->
  <h1>Accounts Details</h1>
  <!-- {{ accounts  }} -->
  <section class="text-gray-600 body-font">
    <div class="container px-3 py-12 mx-auto">
      <div class="flex flex-wrap gap-2">
        <div
          v-for="ac in accountsWithType"
          :key="ac.code"
          class="card bg-slate-200 shadow-md w-full"
        >
          <div class="card-body flex flex-row justify-between">
            <span>
              <h2 class="text-gray-500 card-title">{{ ac.name }}</h2>
              <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">
                {{ ac.accountType?.name }} - {{ ac.accountType?.categoryId }}
              </h3>
              <h2 class="text-gray-900 title-font text-lg font-medium">
                {{ ac.parent }}
              </h2>
              <p class="">{{ settings.currency.symbol }}</p>
            </span>
            <div class="card-actions flex flex-col">
              <button class="btn btn-primary btn-sm">+</button>
              <button
                @click="deleteAccount(ac.id)"
                class="btn btn-error btn-sm"
              >
                -
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
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
                @submit.prevent="addUserAccount"
              >
                <input
                  type="text"
                  v-model="accountName"
                  placeholder="Account Name"
                  class="input input-bordered"
                />

                <select
                  v-model="accountCategory"
                  class="select select-bordered"
                >
                  <option value="">Select Category</option>
                  <option
                    v-for="cat in categories"
                    :key="cat.code"
                    :value="cat.code"
                  >
                    {{ cat.name }}
                  </option>
                </select>

                <select
                  v-model="accountType"
                  className="select select-bordered"
                >
                  <option value="">Account Type</option>
                  <option
                    v-for="cat in accountsList"
                    :key="cat.code"
                    :value="cat.code"
                  >
                    {{ cat.name }}
                  </option>
                </select>

                <select
                  v-model="parentAccount"
                  className="select select-bordered "
                >
                  <option value="">Parent Account</option>
                  <option>Han Solo</option>
                  <option>Greedo</option>
                </select>

                <div class="flex justify-between">
                  <button
                    @click="closeModal"
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

  <div class="fixed bottom-10 right-10">
    <button @click="openModal" class="btn btn-circle">
      <PlusIcon />
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { PlusIcon } from "@heroicons/vue/24/solid";
import { useSettingsStore } from "@/stores/settings";
import { useAccountStore } from "@/stores/accounts.store";
import { useFlash } from "../stores/utils";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import { useCategoryStore } from "@/stores/category.store";

// const { groups } = useGroupStore();
const { categories } = useCategoryStore();

const { settings } = useSettingsStore();
const { accountsWithType, createAccount, deleteAccount } = useAccountStore();

const accountCategory = ref<string>("");
const accountName = ref<string>("");
const accountType = ref<string>("");
const parentAccount = ref<string>("");

const accountsList = computed(() => {
  return settings.accounts.types.filter(
    (a) => a.categoryId === accountCategory.value
  );
});

const isOpen = ref(false);

function addUserAccount() {
  createAccount({
    name: accountName.value,
    accountTypeCode: accountType.value,
    parentId: parentAccount.value,
    description: "",
    placeholder: false,
  });
  useFlash({
    message: `New Account ${accountName.value} Created`,
    type: "success",
  });
  accountCategory.value = "";
  accountName.value = "";
  accountType.value = "";
  parentAccount.value = "";

  closeModal();
}

function closeModal() {
  isOpen.value = false;
}
function openModal() {
  isOpen.value = true;
}
</script>
