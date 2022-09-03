import { computed, reactive, readonly } from "vue";
import { Transaction } from "../models/Transaction";
import transactionApi from "../network/transactionApi";

interface ITransactionStoreState {
  showSidebar: boolean;
  darkTheme: boolean;
  transactions: Transaction[];
  transaction: Transaction | null;
}

const state = reactive<ITransactionStoreState>({
  showSidebar: true,
  darkTheme: true,
  transactions: [],
  transaction: null,
});

const mutations = {
  setTransactions: (payload: Transaction[]) => {
    state.transactions = payload;
  },
  setSidebar(payload: boolean) {
    state.showSidebar = !state.showSidebar;
  },
  setTheme(payload: boolean) {
    state.darkTheme = payload;
  },
  appendTransactions: (payload: Transaction) => {
    state.transactions.unshift(payload);
  },
  setSingleTransaction: (payload: Transaction) => {
    state.transaction = payload;
  },
};

const getters = {
  sidebarStatus: computed(() => state.showSidebar),
  darkTheme: computed(() => state.darkTheme),
  transactions: computed(() => state.transactions),
  numberOfTransactions: computed(() => state.transactions.length),
  transaction: computed(() => state.transaction),
};

const actions = {
  getTransactions: async () => {
    const apiCall = await transactionApi.getTransactions();

    const result = apiCall.data;

    if (result && result.code === 200) {
      mutations.setTransactions(result.data);
      console.log("transactions: ", result.data);

      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: result?.error,
      };
    }
  },

  addTransaction: async (data: any) => {
    const apiCall = await transactionApi.addTransaction(data);
    const result = apiCall.data;
    if (result && apiCall.status === 200) {
      actions.getTransactions();

      return {
        success: true,
        message: result.message,
      };
    } else {
      return {
        success: false,
        message: result?.error,
      };
    }
  },

  editTransaction: async (id: string, data: any) => {
    const apiCall = await transactionApi.editTransaction(id, data);
    const result = apiCall.data;
    if (result && apiCall.status === 200) {
      mutations.setSingleTransaction(data);

      return {
        success: true,
        message: result.message,
      };
    } else {
      return {
        success: false,
        message: result?.error,
      };
    }
  },

  deleteTransaction: async (id: string) => {
    const apiCall = await transactionApi.deleteTransaction(id);

    const result = apiCall.data;

    if (apiCall.status === 200) {
      actions.getTransactions();

      return {
        success: true,
        message: result.message,
      };
    } else {
      return {
        success: false,
        message: result?.error,
      };
    }
  },
};

export default {
  state: readonly(state),
  mutations,
  getters,
  actions,
};
