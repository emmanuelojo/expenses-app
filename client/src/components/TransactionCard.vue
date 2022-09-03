<script lang="ts" setup>
// import { Transaction } from "../models/Transaction";
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
</script>

<template>
  <div
    class="bg-n-bg-sec p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-md cursor-pointer"
  >
    <div class="flex justify-between items-center">
      <p class="text-sm text-white font-semibold">#RT8093</p>
      <p class="sm:hidden text-sm text-n-gray">{{ customer }}</p>
    </div>

    <div class="mt-4 sm:mt-0 flex justify-between items-center">
      <div>
        <p class="text-sm text-n-gray">{{ transactionDate }}</p>
        <p class="sm:hidden text-lg text-white font-semibold">{{ amount }}</p>
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

    <div>
      <p class="hidden sm:block text-sm text-n-gray">{{ customer }}</p>
    </div>

    <div class="hidden sm:block">
      <p class="text-lg text-white font-semibold">{{ amount }}</p>
    </div>

    <div class="hidden sm:flex items-center gap-3">
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
  </div>
</template>
