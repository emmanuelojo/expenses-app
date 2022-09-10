<template>
  <div class="hero">
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="">Title</label>
        <input
          type="text"
          v-model="transaction.title"
          class="form-control"
          required
        />
      </div>

      <div class="form-group mt-3">
        <label for=""> Customer</label>
        <input
          type="text"
          v-model="transaction.customer"
          placeholder="Name of customer"
        />
      </div>

      <div class="form-group mt-3">
        <label for="transactionType">Type</label>

        <select
          name="transactionType"
          id="transactionType"
          v-model="transaction.transactionType"
          required
        >
          <option value="Credit">Credit</option>
          <option value="Debit">Debit</option>
        </select>
      </div>

      <div class="form-group mt-3">
        <label for="">Amount</label>
        <input
          type="number"
          v-model="transaction.amount"
          class="form-control"
          required
        />
      </div>

      <div class="form-group mt-3">
        <label for="">Date</label>
        <input
          type="date"
          v-model="formattedDate"
          class="form-control"
          required
        />
      </div>

      <button type="submit" class="mt-5 flex justify-center items-center gap-2">
        <i v-if="loading" class="fa fa-spinner fa-spin text-white"></i>

        <p class="font-semibold">
          {{ loading ? "Updating" : "Update" }}
        </p>
      </button>
    </form>

    <Toast v-if="showToastModal" @close-modal="showToastModal = false">
      <SingleToast
        :desc="toastMsg"
        :toastType="toastType"
        @close-modal="showToastModal = false"
      />
    </Toast>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, PropType, ref, reactive } from "vue";
import transactionsStore from "../store/transactionsStore";
import { Transaction } from "../models/Transaction";
import Toast from "../components/Toast.vue";
import SingleToast from "../components/SingleToast.vue";

interface Props {
  transaction: Transaction;
}

const props = defineProps<Props>();

const emit = defineEmits(["success"]);

const showToastModal = ref(false);

const loading = ref(false);

const toastMsg = ref("");

const toastType = ref("");

const formattedDate = ref(
  props.transaction.transactionDate.toString().split("T")[0]
);

const form = reactive({
  title: props.transaction.title,
  customer: props.transaction.customer,
  amount: props.transaction.amount,
  type: props.transaction.transactionType,
  date: formattedDate.value,
});

const handleSubmit = () => {
  loading.value = true;

  transactionsStore.actions
    .editTransaction(props.transaction._id, props.transaction)
    .then((res) => {
      loading.value = false;

      if (res.success) {
        toastMsg.value = "Transaction updated successfully";
        toastType.value = "success";
        showToastModal.value = true;

        setTimeout(() => {
          emit("success");
        }, 5000);
      } else {
        toastMsg.value = res.message;
        toastType.value = "danger";
        showToastModal.value = true;
      }
    });
};
</script>

<style scoped>
.hero {
  display: grid;
  gap: 1rem;
  width: 100%;
}

form {
  display: grid;
}

form .form-group {
  display: grid;
  gap: 0.5rem;
}

form .form-group label {
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 10px;
}

form .form-group input {
  border: 1px solid #000;
  outline: none;
  border-radius: 0.25rem;
  height: 2.5rem;
  padding: 0 0.5rem;
}

form .form-group select {
  height: 2.5rem;
  width: 100%;
  border: 1px solid #000;
  outline: none;
  border-radius: 0.25rem;
  padding: 0 0.5rem;
}

form button {
  background: green;
  border-radius: 0.45rem;
  width: 100%;
}

form button p {
  color: #fff;
  padding: 0.5rem;
}

h3 {
  margin-top: 50px;
}
.card {
  width: 600px;
  margin: auto;
}

@media screen and (max-width: 450px) {
  .card {
    width: 330px;
    margin: auto;
  }
}
</style>
