<template>
  <div class="grid md:grid-cols-auto-1fr bg-n-bg h-screen overflow-auto">
    <div class="hidden md:block">
      <Sidebar :showSidebar="true" />
    </div>
    <div>
      <Navbar />
      <div
        class="px-4 lg:px-10 pt-10 w-full 2xl:max-w-[1024px] 2xl:mx-auto h-screen overflow-auto"
      >
        <div class="flex justify-between sm:items-center">
          <div>
            <h3 class="text-lg md:text-3xl text-white font-bold">
              Transactions
            </h3>
            <p class="hidden sm:block text-xs text-n-white-sec font-semibold">
              There are {{ numberOfTransactions }} transactions
            </p>
            <p class="sm:hidden text-n-white-sec">
              {{ numberOfTransactions }} transactions
            </p>
          </div>

          <div class="flex items-center gap-4 sm:gap-3">
            <div class="hidden sm:block">
              <select class="bg-transparent text-white" v-model="filterTerm">
                <option value="" class="text-white" disabled selected>
                  Filter by type
                </option>
                <option value="All" class="text-white">All</option>
                <option value="Credit" class="text-white">Credit</option>
                <option value="Debit" class="text-white">Debit</option>
              </select>
            </div>

            <div
              class="p-2 flex items-center gap-2 bg-purple-700 rounded-3xl cursor-pointer"
            >
              <div
                class="bg-white text-purple-700 h-8 w-8 flex justify-center items-center rounded-full"
              >
                <i class="fa fa-plus"></i>
              </div>

              <p
                @click="showAddTransactionModal = true"
                class="text-white flex items-center gap-1"
              >
                <span class="pr-1">New</span>
                <span class="hidden sm:block pr-3">Transaction</span>
              </p>
            </div>

            <div class="sm:hidden cursor-pointer text-white">
              <!-- <span class="material-symbols-outlined text-3xl"> more_vert </span> -->
              <i class="fa fa-ellipsis-v text-2xl"></i>
            </div>
          </div>
        </div>

        <div class="my-16 flex flex-col gap-4">
          <div
            v-for="(transaction, idx) in transactions.transactions"
            :key="idx"
          >
            <TransactionCard
              :_id="transaction._id"
              :title="transaction.title"
              :customer="transaction.customer"
              :amount="transaction.amount"
              :transactionType="transaction.transactionType"
              :transactionDate="transaction.transactionDate"
            />
          </div>
        </div>
      </div>
    </div>

    <Toast v-if="showToastModal" @close-modal="showToastModal = false">
      <SingleToast
        :desc="toastMsg"
        :toastType="toastType"
        @close-modal="showToastModal = false"
      />
    </Toast>

    <Modal
      title="Add New Transaction"
      @close-modal="showAddTransactionModal = false"
      v-if="showAddTransactionModal"
    >
      <AddTransaction @success="showAddTransactionModal = false" />
    </Modal>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import AddTransaction from "../components/AddTransaction.vue";
import ConfirmationModal from "../components/ConfirmationModal.vue";
import Modal from "../components/Modal.vue";
import Navbar from "../components/Navbar.vue";
import SingleToast from "../components/SingleToast.vue";
import Tabs from "../components/Tabs.vue";
import Toast from "../components/Toast.vue";
import transactionsStore from "../store/transactionsStore";
import { Transaction } from "../models/Transaction";
import AllExpenses from "./AllExpenses.vue";
import AllIncome from "./AllIncome.vue";
import AllTransactions from "./AllTransactions.vue";
import EditTransaction from "./EditTransaction.vue";
import TransactionCard from "../components/TransactionCard.vue";
import Sidebar from "../components/Sidebar.vue";
import authStore from "../store/authStore";

onMounted(async () => {
  await transactionsStore.actions.getTransactions(
    currentPage.value,
    filterTerm.value,
    searchTerm.value
  );
  transactionsStore.getters.transactions;
  transactionsStore.getters.numberOfTransactions;
});

const showDetailsModal = ref(false);

const showAddTransactionModal = ref(false);

const showConfirmationModal = ref(false);

const showToastModal = ref(false);

const tabs = ["All", "Income", "Expenses"] as const;

const activeTab = ref<typeof tabs[number]>(tabs[0]);

const toastMsg = ref("");

const toastType = ref("");

const searchTerm = ref("");

const filterTerm = ref("");

const transactions = ref(transactionsStore.getters.transactions);

const transaction = ref<Transaction>();

const incomeAmount = ref(0);

const debitAmount = ref(0);

const startDate = ref("2022-01-01");

const endDate = ref(new Date().toDateString());

const rowsPerPage = ref(10);

const currentPage = ref(1);

const clonedTransactions = ref<Transaction[]>([]);

const allTransactions = ref(transactionsStore.getters.transactions);

// const allTransactions = computed(() => {
//   // clonedTransactions.value = transactions.value;
//   // let arr = [...transactions.value];
//   let arr: Transaction[] = [];

//   transactions.value.forEach((transaction) => {
//     arr.push(transaction);
//   });

//   let filtered = arr
//     .slice()
//     .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
//     .filter(
//       (transaction) =>
//         transaction.title
//           .toLowerCase()
//           .startsWith(searchTerm.value.toLowerCase()) ||
//         transaction.amount
//           .toString()
//           .toLowerCase()
//           .startsWith(searchTerm.value.toLowerCase()) ||
//         transaction.transactionType
//           .toString()
//           .toLowerCase()
//           .startsWith(searchTerm.value.toLowerCase())
//     );

//   incomeAmount.value = clonedTransactions.value
//     .filter((item) => item.transactionType === "Credit")
//     .reduce((acc, next) => {
//       return (acc += Number(next.amount));
//     }, 0);

//   debitAmount.value = clonedTransactions.value
//     .filter((item) => item.transactionType === "Debit")
//     .reduce((acc, next) => {
//       return (acc += Number(next.amount));
//     }, 0);

//   clonedTransactions.value = filtered;

//   return filtered;
// });

// const filteredIncome = computed(() => {
//   return allTransactions.value.filter(
//     (transaction) => transaction.transactionType === "Credit"
//   );
// });

// const filteredExpenses = computed(() => {
//   return allTransactions.value.filter(
//     (transaction) => transaction.transactionType === "Debit"
//   );
// });

// const allExpenses = computed(() => {
//   // return expenses.value;
//   return "";
// });

const numberOfTransactions = computed(() => {
  // return allTransactions.value.length;
  return transactions.value.transactions.length;
});

const formatCurrency = (locale: string, num: number, currency: string) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(num);
};

// const download = (transactions: Transaction[]) => {
// let csvContent = "data:text/csv;charset=utf-8,";
// csvContent += [
//   Object.keys(transactions[0]).join(";"),
//   ...transactions.map((item) => Object.values(item).join(";")),
// ]
//   .join("\n")
//   .replace(/(^\[)|(\]$)/gm, "");
// const data = encodeURI(csvContent);
// const link = document.createElement("a");
// link.setAttribute("href", data);
// link.setAttribute("download", "Expenses.csv");
// link.click();
// showToastModal.value = true;
// toastMsg.value = "Downloaded Successfully";
// toastType.value = "success";
// };

// const showDetails = (item: any) => {
//   transaction.value = item;
//   showDetailsModal.value = true;
// };

const transactionId = ref("");

const isAboutToDelete = (id: string) => {
  transactionId.value = id;
  showConfirmationModal.value = true;
};

// const deleteTransaction = () => {
//   showConfirmationModal.value = false;

//   transactionsStore.actions.deleteTransaction(transactionId.value);
// };

const onPageChanged = (page: number) => {
  currentPage.value = page;
};

watch(filterTerm, async (newVal) => {
  if (filterTerm.value) {
    await transactionsStore.actions.getTransactions(
      currentPage.value,
      filterTerm.value,
      searchTerm.value
    );
  }
});
</script>

<style scoped></style>
