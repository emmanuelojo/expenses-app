<template>
  <div class="add-expense w-full">
    <form @submit.prevent="handleSubmit" class="grid">
      <div class="title grid gap-1">
        <label for=""> Title</label>
        <input
          type="text"
          v-model="title"
          placeholder="Description...."
          required
          class="border rounded h-10 pl-1"
        />
      </div>

      <div class="customer mt-3 grid gap-1">
        <label for=""> Customer</label>
        <input
          type="text"
          v-model="customer"
          placeholder="Name of customer"
          class="border rounded h-10 pl-1"
        />
      </div>

      <div class="expenseType mt-4">
        <select
          name="expenseType"
          id="expenseType"
          v-model="selected"
          required
          class="border rounded w-full h-10 pl-1"
        >
          <option value="" disabled>Select a type</option>
          <option value="Credit">Credit</option>
          <option value="Debit">Debit</option>
        </select>
      </div>

      <div class="amount grid gap-1 mt-3">
        <label for="">Amount</label>
        <input
          type="number"
          v-model="amount"
          placeholder="Amount ...."
          :min="0"
          required
          class="border rounded h-10 pl-1"
        />
      </div>

      <div class="date grid gap-1 mt-3">
        <label for="">Date</label>
        <input
          type="date"
          v-model="date"
          required
          class="border rounded h-10 pl-1"
        />
      </div>

      <button type="submit" class="mt-5 bg-green-500 rounded w-full">
        <p class="font-semibold text-white p-2">Add</p>
      </button>
    </form>
  </div>

  <Toast v-if="showToastModal" @close-modal="showToastModal = false">
    <SingleToast
      :desc="toastMsg"
      :toastType="toastType"
      @close-modal="showToastModal = false"
    />
  </Toast>
</template>

<script lang="ts" setup>
import { computed, defineComponent, onMounted, ref } from "vue";
import transactionsStore from "../store/transactionsStore";
import SingleToast from "./SingleToast.vue";
import Toast from "./Toast.vue";

const emit = defineEmits(["success"]);

onMounted(() => {
  // transactionsStore.actions.gettransactionsLocalStorage();
  transactionsStore.getters.transactions;
  transactions.value;
});

const loading = ref(false);

const showToastModal = ref(false);

const toastMsg = ref("");

const toastType = ref("");

const title = ref("");

const customer = ref("");

const amount = ref("");

const selected = ref("");

const date = ref(new Date().toISOString());

const transactions = transactionsStore.getters.transactions;

const numberOfTransactions = computed(() => {
  return transactions.value.length;
});

const handleSubmit = async () => {
  loading.value = true;

  const data = {
    title: title.value,
    customer: customer.value,
    amount: amount.value,
    transactionType: selected.value,
    transactionDate: date.value,
  };

  await transactionsStore.actions.addTransaction(data).then((res) => {
    loading.value = false;

    if (res.success === true) {
      showToastModal.value = true;
      toastMsg.value = res.message;
      toastType.value = "success";

      // setTimeout(() => {
      emit("success");
      // }, 4000);
    } else {
      showToastModal.value = true;
      toastMsg.value = res.message;
      toastType.value = "danger";
    }

    title.value = "";
    customer.value = "";
    amount.value = "";
    selected.value = "";
    date.value = "";
  });
};
</script>

<style scoped></style>
