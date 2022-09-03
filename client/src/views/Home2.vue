<template>
  <div class="home">
    <Navbar :totalRecords="numberOfTransactions" />
    <div class="summary px-12 flex justify-between items-center">
      <div class="my-5 flex">
        <div>
          <p>
            Income:
            <span class="font-semibold text-2xl text-green-600">
              {{ formatCurrency("en-ng", incomeAmount, "NGN") }}
            </span>
          </p>
        </div>
        <div class="ml-5">
          <p>
            Expense:
            <span class="font-semibold text-2xl text-red-500">
              {{ formatCurrency("en-ng", debitAmount, "NGN") }}
            </span>
          </p>
        </div>
      </div>

      <div class="add">
        <button
          @click="showAddExpenseModal = true"
          class="add-expense-btn flex items-center bg-green-600 rounded text-white px-4 py-5.6"
        >
          <i class="fa fa-plus"></i>
          <p class="ml-2">New Transaction</p>
        </button>
      </div>
    </div>

    <div
      class="actions-panel px-12 my-5 w-full flex justify-between items-center"
    >
      <!-- <button
          @click="download(filteredExpenses ? filteredExpenses : [])"
          class="csv"
        >
          <i class="fa fa-download"></i>
          <p>Download CSV</p>
        </button> -->

      <div class="search">
        <i class="fa fa-search"></i>
        <input placeholder="Search" v-model="searchTerm" />
      </div>
    </div>

    <div class="items bg-white rounded-lg mx-10 p-5">
      <div class="w-full">
        <div class="tabs-wrapper">
          <h3>
            <Tabs :tabs="[...tabs]" v-model="activeTab" class="tabs"></Tabs>
          </h3>
        </div>

        <hr class="hr" />

        <div v-if="activeTab === 'All'" class="table overflow-auto w-full">
          <!-- 
               <div v-if="allTransactions && allTransactions.length < 1">
              <p class="text-center">No data found</p>
            </div>
            
            <AllTransactions
              v-else
              :data="allTransactions"
              :totalPages="Math.ceil(allTransactions.length / rowsPerPage)"
              :total="allTransactions.length"
              :perPage="rowsPerPage"
              :currentPage="currentPage"
              @pageChanged="onPageChanged"
            /> -->
          <div v-if="transactions && transactions.length < 1">
            <p class="text-center">No transaction found</p>
          </div>

          <!-- <div v-else>
              <p class="text-center">Transactions found</p>
            </div> -->

          <table v-else class="mt-10 w-full text-n-black">
            <thead class="text-left">
              <tr
                class="text-base font-bold border-b"
                style="border-color: #f5f4f9"
              >
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
                v-for="(transaction, idx) in transactions"
                :key="idx"
              >
                <td class="title px-6 py-3 cursor-pointer">
                  {{ transaction.title }}
                </td>
                <td class="title px-6 py-3 cursor-pointer">
                  {{ transaction.customer }}
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
                  {{
                    formatCurrency("en-ng", Number(transaction.amount), "NGN")
                  }}
                </td>
                <td class="date px-6 py-3">
                  {{ transaction.transactionDate }}
                </td>
                <td class="btns px-6 py-3 flex items-center cursor-pointer">
                  <i class="fa fa-edit text-sm text-green-700" id="edit"></i>
                  <i
                    class="fa fa-trash ml-3 text-sm text-red-500"
                    id="delete"
                  ></i>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- <div v-if="activeTab === 'Income'" class="table overflow-auto w-full">
            <div v-if="filteredIncome && filteredIncome.length < 1">
              <p>No data found</p>
            </div>
            <AllIncome
              v-else
              :data="filteredIncome"
              :totalPages="Math.ceil(filteredIncome.length / rowsPerPage)"
              :total="filteredIncome.length"
              :perPage="rowsPerPage"
              :currentPage="currentPage"
              @pageChanged="onPageChanged"
            />
          </div> -->

        <!-- <div v-if="activeTab === 'Expenses'" class="table overflow-auto w-full">
            <div v-if="filteredExpenses && filteredExpenses.length < 1">
              <p class="text-center">No data found</p>
            </div>
            <AllExpenses
              v-else
              :data="filteredExpenses"
              :totalPages="Math.ceil(filteredExpenses.length / rowsPerPage)"
              :total="filteredExpenses.length"
              :perPage="rowsPerPage"
              :currentPage="currentPage"
              @pageChanged="onPageChanged"
            />
          </div> -->
      </div>
    </div>

    <Modal
      title="Add New Transaction"
      @close-modal="showAddExpenseModal = false"
      v-if="showAddExpenseModal"
    >
      <AddExpense @success="showAddExpenseModal = false" />
    </Modal>
    <!-- 
      <Modal
        title="Edit Expense"
        @close-modal="showDetailsModal = false"
        v-if="showDetailsModal && expense"
      >
        <EditExpense :expense="expense" @success="showDetailsModal = false" />
      </Modal>
  
      <Modal
        title="Confirm Action"
        @close-modal="showConfirmationModal = false"
        v-if="showConfirmationModal"
      >
        <ConfirmationModal
          @proceed="deleteExpense"
          @decline="showConfirmationModal = false"
        />
      </Modal> -->

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
import { computed, defineComponent, onMounted, ref } from "vue";
import AddExpense from "../components/AddExpense.vue";
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

onMounted(() => {
  transactionsStore.actions.getTransactions();
  transactionsStore.getters.transactions;
  transactionsStore.getters.numberOfTransactions;
});

const showDetailsModal = ref(false);

const showAddExpenseModal = ref(false);

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
