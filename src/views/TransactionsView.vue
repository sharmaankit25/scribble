<template>
  <!-- <h1 class="h-1 m-3 p-3">List of All Transactions</h1> -->
  <!-- <hr /> -->
  <section class="text-gray-600 body-font">
    <div class="container px-3 py-12 mx-auto">
      <div class="flex flex-wrap gap-2">
        <div
          v-for="ac in transactionsWithAccounts"
          :key="ac.id"
          class="card bg-slate-200 shadow-md w-full"
        >
          <div class="card-body flex flex-col sm:flex-row justify-between">
            <span>
              <h2 class="text-gray-500 card-title">{{ ac.description }}</h2>
              <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">
                {{ ac.type }}
              </h3>
              <h2 class="text-gray-900 title-font text-lg font-medium">
                {{ settings.currency.symbol }} {{ ac.amount }}
              </h2>
              <time :datetime="new Date(ac.timestamp).toISOString()"
                >{{ new Date(ac.timestamp).toLocaleDateString() }}
                {{ new Date(ac.timestamp).toLocaleTimeString("en-IN") }}</time
              >
            </span>
            <strong>
              {{ ac.fromAccount?.name }} => {{ ac.toAccount?.name }}
            </strong>
            <div class="card-actions flex sm:flex-col">
              <button class="btn btn-primary btn-sm">+</button>
              <button class="btn btn-error btn-sm">-</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <Modal :status="isOpen" @close="closeModal" @submit="createNewTransaction">
    <div class="flex">
      <div class="form-control">
        <label class="label cursor-pointer" for="deposit">
          <input
            type="radio"
            id="deposit"
            name="type"
            value="deposit"
            v-model="newTransactionForm.type"
            class="radio radio-primary checked:bg-red-500"
            checked
          />
          <strong class="label-text text-slate-900 p-2">Deposit</strong>
        </label>
      </div>

      <div class="form-control">
        <label class="label cursor-pointer" for="withdrawal">
          <input
            type="radio"
            id="withdrawal"
            name="type"
            value="withdrawal"
            v-model="newTransactionForm.type"
            class="radio radio-primary checked:bg-red-500"
            checked
          />
          <strong class="label-text text-slate-900 p-2">Withdrawal</strong>
        </label>
      </div>
    </div>
    <input
      min="0"
      type="number"
      v-model="newTransactionForm.amount"
      placeholder="Amount"
      class="input input-bordered"
    />

    <input
      type="text"
      v-model="newTransactionForm.description"
      placeholder="Description"
      class="input input-bordered"
    />

    <select
      v-model="newTransactionForm.fromAccountId"
      className="select select-bordered "
    >
      <option value="">From Account</option>
      <option v-for="fromAcc in accounts" :key="fromAcc.id" :value="fromAcc.id">
        {{ fromAcc.name }}
      </option>
    </select>

    <select
      v-model="newTransactionForm.toAccountId"
      className="select select-bordered "
    >
      <option value="">To Account</option>
      <option v-for="toAcc in accounts" :key="toAcc.id" :value="toAcc.id">
        {{ toAcc.name }}
      </option>
    </select>
  </Modal>

  <div class="fixed bottom-10 right-10">
    <button @click="openModal" class="btn btn-circle">
      <PlusIcon />
    </button>
  </div>
</template>

<script setup lang="ts">
import Modal from "@/components/utils/Modal.vue";
import { PlusIcon } from "@heroicons/vue/24/solid";
import { useFlash, useModal } from "../stores/utils";
import { useTransactionStore } from "../stores/transaction.store";
import { useSettingsStore } from "@/stores/settings";
import { ref } from "vue";
import { useAccountStore } from "@/stores/accounts.store";

const newTransactionForm = ref({
  fromAccountId: "",
  toAccountId: "",
  amount: 0,
  description: "",
  type: "deposit",
});

const { openModal, closeModal, isOpen } = useModal();
const { transactionsWithAccounts, createTransaction } = useTransactionStore();
const { accounts } = useAccountStore();
const { settings } = useSettingsStore();
function createNewTransaction() {
  createTransaction({
    fromAccountId: newTransactionForm.value.fromAccountId,
    toAccountId: newTransactionForm.value.toAccountId,
    amount: newTransactionForm.value.amount,
    description: newTransactionForm.value.description,
    type: newTransactionForm.value.type,
  });
  useFlash({ message: "Transaction Successfull", type: "success" });
  closeModal();
}
</script>
