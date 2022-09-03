<template>
  <div>
    <div class="my-5 flex justify-between items-center">
      <p>
        {{ currentPage + " out of " + totalPages + " pages" }}
      </p>

      <ul v-if="data.length > 10 || currentPage > 1" class="flex items-center">
        <li class="mx-2">
          <button
            type="button"
            @click="onClickFirstPage"
            :disabled="isInFirstPage"
          >
            <i class="fa fa-chevron-left"></i><i class="fa fa-chevron-left"></i>
          </button>
        </li>

        <li class="mx-2">
          <button
            type="button"
            @click="onClickPreviousPage"
            :disabled="isInFirstPage"
          >
            <i class="fa fa-chevron-left"></i>
          </button>
        </li>

        <li class="mx-2" v-for="(page, index) in pages" :key="index">
          <button
            type="button"
            @click="onClickPage(page.number)"
            :class="{ active: isPageActive(page.number) }"
          >
            {{ page.number }}
          </button>
        </li>

        <li class="mx-2">
          <button
            type="button"
            @click="onClickNextPage"
            :disabled="isInLastPage"
          >
            <i class="fa fa-chevron-right"></i>
          </button>
        </li>

        <li class="mx-2">
          <button
            type="button"
            @click="onClickLastPage"
            :disabled="isInLastPage"
          >
            <i class="fa fa-chevron-right"></i
            ><i class="fa fa-chevron-right"></i>
          </button>
        </li>
      </ul>
    </div>

    <table class="mt-10 w-full text-n-black">
      <thead class="text-left">
        <tr class="text-base font-bold border-b" style="border-color: #f5f4f9">
          <th class="px-6 py-3">Title</th>
          <th class="px-6 py-3">Customer</th>
          <th class="px-6 py-3">Type</th>
          <th class="px-6 py-3">Amount</th>
          <th class="px-6 py-3">Date</th>
          <th class="px-6 py-3">Action</th>
        </tr>
      </thead>

      <tbody class="text-left">
        <tr
          class="text-sm border-t border-b font-medium"
          v-for="(transaction, idx) in paginatedData"
          :key="idx"
        >
          <td
            @click="showDetails(transaction)"
            class="title px-6 py-3 cursor-pointer"
          >
            {{ truncateString(transaction.title, 30) }}
          </td>
          <td class="title px-6 py-3 cursor-pointer">
            {{
              truncateString(
                transaction.customer ? transaction.customer : "",
                30
              )
            }}
          </td>
          <td class="type px-6 py-3 flex justify-start items-center">
            <span
              :style="
                transaction.transactionType === 'Credit'
                  ? 'background-color: rgb(203, 248, 203); color: green'
                  : 'background-color: rgb(238, 195, 195); color: red'
              "
              class="px-2 py-1 w-14 flex justify-center rounded"
            >
              {{ transaction.transactionType }}
            </span>
          </td>

          <td class="amount px-6 py-3">
            {{ formatCurrency("en-ng", Number(transaction.amount), "NGN") }}
          </td>
          <td class="date px-6 py-3">
            <!-- {{ formatDate(transaction.transactionDate) }} -->
            {{ transaction.transactionDate }}
          </td>
          <td class="btns px-6 py-3 flex items-center">
            <i
              @click="showDetails(transaction)"
              class="fa fa-edit"
              id="edit"
            ></i>
            <i
              class="ml-3 fa fa-trash"
              id="delete"
              @click="isAboutToDelete(transaction._id)"
            ></i>
          </td>
        </tr>
      </tbody>
    </table>

    <Modal
      title="Add New Transaction"
      @close-modal="showAddTransactionModal = false"
      v-if="showAddTransactionModal"
    >
      <Addtransaction @success="showAddTransactionModal = false" />
    </Modal>

    <Modal
      title="Edit transaction"
      @close-modal="showDetailsModal = false"
      v-if="showDetailsModal && transaction"
    >
      <Edittransaction
        :transaction="transaction"
        @success="showDetailsModal = false"
      />
    </Modal>

    <Modal
      title="Confirm Action"
      @close-modal="showConfirmationModal = false"
      v-if="showConfirmationModal"
    >
      <ConfirmationModal
        @proceed="deleteTransaction"
        @decline="showConfirmationModal = false"
      />
    </Modal>

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
import { computed, defineComponent, onMounted, PropType, ref } from "vue";
import ConfirmationModal from "../components/ConfirmationModal.vue";
import Modal from "../components/Modal.vue";
import Navbar from "../components/Navbar.vue";
import SingleToast from "../components/SingleToast.vue";
import Tabs from "../components/Tabs.vue";
import Toast from "../components/Toast.vue";
import transactionsStore from "../store/transactionsStore";
import { Transaction } from "../models/Transaction";
import {
  formatCurrency,
  formatDate,
  shortDate,
  truncateString,
} from "../utils/helpers";
import EditExpense from "./EditExpense.vue";

interface Props {
  data: Transaction[];
  maxVisibleButtons: number;
  totalPages: number;
  total: number;
  perPage: number;
  currentPage: number;
}

const props = withDefaults(defineProps<Props>(), {
  maxVisibleButtons: 3,
});

const emit = defineEmits(["pageChanged"]);

onMounted(() => {
  transactionsStore.actions.getTransactions();
  transactionsStore.getters.transactions;
  transactionsStore.getters.numberOfTransactions;
});

const showDetailsModal = ref(false);

const showAddTransactionModal = ref(false);

const showConfirmationModal = ref(false);

const showToastModal = ref(false);

const toastMsg = ref("");

const toastType = ref("");

const transactions = transactionsStore.getters.transactions;

const transaction = ref<Transaction>();

const paginatedData = computed(() => {
  let start = (props.currentPage - 1) * props.perPage;
  let end = start + props.perPage;
  return props.data.slice(start, end);
});

const startPage = computed(() => {
  if (props.currentPage === 1) return 1;
  if (props.currentPage === props.totalPages)
    return (
      props.totalPages - props.maxVisibleButtons + (props.maxVisibleButtons - 1)
    );

  return props.currentPage - 1;
});

const endPage = computed(() => {
  return Math.min(
    startPage.value + props.maxVisibleButtons - 1,
    props.totalPages
  );
});

const pages = computed(() => {
  let range = [];

  for (let i = startPage.value; i <= endPage.value; i++) {
    range.push({ number: i, isDisabled: i === props.currentPage });
  }

  return range;
});

const isInFirstPage = computed(() => {
  return props.currentPage === 1;
});

const isInLastPage = computed(() => {
  return props.currentPage === props.totalPages;
});

const onClickFirstPage = () => {
  emit("pageChanged", 1);
};

const onClickPreviousPage = () => {
  emit("pageChanged", props.currentPage - 1);
};

const onClickPage = (page: number) => {
  emit("pageChanged", page);
};

const onClickNextPage = () => {
  emit("pageChanged", props.currentPage + 1);
};

const onClickLastPage = () => {
  emit("pageChanged", props.totalPages);
};

const isPageActive = (page: number) => {
  return props.currentPage === page;
};

const transactionId = ref("");

const showDetails = (item: any) => {
  transaction.value = item;
  showDetailsModal.value = true;
};

const isAboutToDelete = (id: string) => {
  transactionId.value = id;
  showConfirmationModal.value = true;
};

const deleteTransaction = () => {
  showConfirmationModal.value = false;

  transactionsStore.actions.deleteTransaction(transactionId.value);
};
</script>

<style scoped></style>
