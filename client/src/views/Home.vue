<template>
  <div class="grid grid-cols-auto-1fr bg-n-bg h-screen overflow-auto">
    <div class="hidden md:block">
      <Sidebar :showSidebar="true" />
    </div>
    <div class="px-4 lg:px-10 pt-10 w-full 2xl:max-w-[1024px] 2xl:mx-auto">
      <div class="flex justify-between sm:items-center">
        <div>
          <h3 class="text-lg md:text-3xl text-white font-bold">Invoices</h3>
          <p class="hidden sm:block text-xs text-n-white-sec font-semibold">
            There are {{ numberOfTransactions }} total transactions
          </p>
          <p class="sm:hidden text-n-white-sec">
            {{ numberOfTransactions }} transactions
          </p>
        </div>

        <div class="flex items-center gap-4 sm:gap-3">
          <div class="hidden sm:block">
            <select class="bg-transparent text-white">
              <option value="" class="text-white">Filter by type</option>
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
        <div v-for="(transaction, idx) in transactions" :key="idx">
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
import { computed, defineComponent, onMounted, ref } from "vue";
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
import EditExpense from "./EditExpense.vue";
import TransactionCard from "../components/TransactionCard.vue";
import Sidebar from "../components/Sidebar.vue";

onMounted(() => {
  transactionsStore.actions.getTransactions();
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
  return transactions.value.length;
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
</script>

<style scoped>
.actions-panel .csv {
  display: flex;
  align-items: center;
  background-color: blue;
  border-radius: 0.25rem;
  color: #fff;
  padding: 0.35rem 1rem;
}
.actions-panel .csv p {
  margin-left: 0.5rem;
}

.actions-panel .search {
  background-color: #ffff;
  border-radius: 0.25rem;
  padding: 0.35rem 1rem;
}

.actions-panel .search input {
  border: none;
  outline: none;
  width: 200px;
  height: 25px;
  margin-left: 0.5rem;
}

.items {
  margin-top: 3rem;
}

.items p {
  margin-top: 100px;
}

select {
  color: #888;
  border: none;
  outline: none;
  height: 42px;
}

.item .title,
.item .amount,
.item .type,
.item .date {
  margin-top: auto;
  margin-bottom: auto;
}

.type {
  display: flex;
  align-items: center;
}
.type > div {
  height: 0.875rem;
  width: 0.875rem;
  border-radius: 50%;
  margin-right: 0.25rem;
}

.btns i {
  font-size: 20px;
}

.btns i:nth-child(2) {
  margin-left: 1rem;
}

#edit,
#edit a {
  color: green;
  text-decoration: none;
}
#delete {
  color: red;
}
#edit,
#edit a:hover,
#delete:hover {
  cursor: pointer;
}

@media screen and (max-width: 900px) {
  form {
    display: grid;
  }
  form input {
    border-radius: 8px;
    margin-top: 10px;
  }
  form input:first-of-type {
    border-radius: 8px;
  }
  form input:last-of-type {
    border-radius: 8px;
  }
  select {
    width: 300px;
    max-width: 500px;
    border-radius: 8px;
    margin-top: 10px;
  }
  .items {
    width: 100%;
    overflow-x: auto;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 100px;
  }
}

@media screen and (max-width: 32.5rem) {
  .summary,
  .actions-panel,
  .items {
    padding: 0 0.5rem;
  }

  .summary > div {
    display: grid;
  }

  .summary > div > div:nth-child(2) {
    margin-left: 0;
  }

  .summary > div > div p {
    text-align: left;
  }

  .summary .add .add-expense-btn {
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.25rem;
    height: 40px;
    width: 40px;
  }

  .summary .add .add-expense-btn p {
    display: none;
  }

  .actions-panel .csv {
    border-radius: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.25rem;
    height: 40px;
    width: 40px;
  }

  .actions-panel .csv p {
    display: none;
  }

  .items {
    margin: 2rem 0;
    width: 100%;
  }

  .items table .item-header {
    grid-template-columns: repeat(6, auto);
    gap: 1rem;
  }

  .items table .item {
    grid-template-columns: repeat(6, auto);
    gap: 1rem;
  }

  .items table .item td {
    width: 6.25rem;
  }
}
</style>
