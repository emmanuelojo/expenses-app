<script lang="ts" setup>
import { ref } from "vue";
import { formatCurrency, rearrangedDate } from "../utils/helpers";
import Modal from "./Modal.vue";
import EditTransaction from "../views/EditTransaction.vue";

interface Transaction {
  _id: string;
  title: string;
  customer?: string;
  amount: number;
  transactionType: string;
  transactionDate: Date | string;
}

const props = withDefaults(defineProps<Transaction>(), {
  _id: "",
  title: "",
  customer: "",
  amount: 0,
  transactionType: "",
  transactionDate: "2022-09-03",
});

const showEditTransactionModal = ref(false);

const selectedTransaction = ref({
  _id: props._id,
  title: props.title,
  customer: props.customer,
  amount: props.amount,
  transactionType: props.transactionType,
  transactionDate: props.transactionDate,
});

const openDetails = () => {
  showEditTransactionModal.value = true;
};
</script>

<template>
  <div
    @click="openDetails"
    class="bg-n-bg-sec p-3 flex flex-col sm:grid sm:grid-cols-n-5fr sm:place-content-between rounded-md cursor-pointer"
  >
    <div class="flex justify-between items-center">
      <p class="text-sm text-white font-semibold">#RT8093</p>
      <p class="sm:hidden text-sm text-n-gray">{{ customer }}</p>
    </div>

    <div class="mt-4 sm:mt-0 flex justify-between items-center">
      <div>
        <p class="text-sm text-n-gray">{{ rearrangedDate(transactionDate) }}</p>
        <p class="sm:hidden text-lg text-white font-semibold"></p>
      </div>
      <div
        class="w-20 h-8 sm:hidden flex items-center justify-center gap-1 rounded-md"
        :class="transactionType === 'Credit' ? 'bg-n-bg-green' : 'bg-red-200'"
      >
        <div
          class="w-2 h-2 rounded-full"
          :class="transactionType === 'Credit' ? 'bg-green-500' : 'bg-red-500'"
        ></div>
        <p
          class="text-sm capitalize"
          :class="
            transactionType === 'Credit' ? 'text-green-500 ' : 'text-red-500'
          "
        >
          {{ transactionType }}
        </p>
      </div>
    </div>

    <div class="flex items-center">
      <p class="hidden sm:block text-sm text-n-gray">{{ customer }}</p>
    </div>

    <div class="hidden sm:block">
      <p class="text-lg text-white font-semibold">
        {{ formatCurrency("en-ng", Number(amount), "NGN") }}
      </p>
    </div>

    <div class="hidden sm:flex sm:justify-end items-center gap-3">
      <div
        class="w-20 h-8 flex items-center justify-center gap-1 rounded-md"
        :class="transactionType === 'Credit' ? 'bg-n-bg-green' : 'bg-red-200'"
      >
        <div
          class="w-2 h-2 rounded-full"
          :class="transactionType === 'Credit' ? 'bg-green-500' : 'bg-red-500'"
        ></div>
        <p
          class="text-sm capitalize"
          :class="
            transactionType === 'Credit' ? 'text-green-500 ' : 'text-red-500'
          "
        >
          {{ transactionType }}
        </p>
      </div>

      <div class="text-n-purple">
        <span class="material-symbols-outlined text-sm"> chevron_right </span>
      </div>
    </div>

    <Modal
      v-if="showEditTransactionModal"
      title="Edit Transaction"
      @close-modal="showEditTransactionModal = false"
    >
      <EditTransaction
        :transaction="selectedTransaction"
        @success="showEditTransactionModal = false"
      />
    </Modal>
  </div>
</template>
