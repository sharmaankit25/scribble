<template>
  <h1>List of All Transactions</h1>  

  <Modal :status="isOpen" @close="closeModal" @submit="createTransaction">
    <div class="btn-group">
      <input
        type="radio"
        id="deposit"
        name="radio-2"
        class="radio radio-primary mr-3"
        checked
      />
      <label for="deposit">Deposit</label>
    </div>
    <div class="btn-group">
      <input
        type="radio"
        id="withdrawal"
        name="radio-2"
        class="radio radio-primary mr-3"
      />
      <label for="withdrawal">Withdrawal</label>
    </div>
    <input
      min="0"
      type="number"
      placeholder="Amount"
      class="input input-bordered"
    />

    <select className="select select-bordered ">
      <option value="">From Account</option>
      <option v-for="fromAcc in accounts" :key="fromAcc.id" :value="fromAcc.id">
        {{ fromAcc.name }}
      </option>
    </select>

    <select className="select select-bordered ">
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
import { useAccountStore } from "../stores/accounts.store";

function showFlash() {
  useFlash({ message: "TEST", type: "success" });
}

const { openModal, closeModal, isOpen } = useModal();
const { accounts } = useAccountStore();

function createTransaction() {
  console.log("Creating Transaction");
  useFlash({ message: "Transaction Successfull", type: "success" });
}
</script>
