import { computed, reactive, readonly } from "vue";
import { Transaction } from "../models/Transaction";
import transactionApi from "../network/transactionApi";
import { Pagination } from "../types/transactionsTypeResponse";

interface ITransactionStoreState {
  showSidebar: boolean;
  darkTheme: boolean;
  transactions: { pagination: Pagination; transactions: Transaction[] };
  transaction: Transaction | null;
}

const state = reactive<ITransactionStoreState>({
  showSidebar: true,
  darkTheme: true,
  transactions: { pagination: {} as Pagination, transactions: [] },
  transaction: null,
});

const mutations = {
  setTransactions: (payload: any) => {
    state.transactions = payload;
  },
  setSidebar(payload: boolean) {
    state.showSidebar = !state.showSidebar;
  },
  setTheme(payload: boolean) {
    state.darkTheme = payload;
  },
  // appendTransactions: (payload: Transaction) => {
  //   state.transactions.unshift(payload);
  // },
  setSingleTransaction: (payload: Transaction) => {
    state.transaction = payload;
  },
};

const getters = {
  sidebarStatus: computed(() => state.showSidebar),
  darkTheme: computed(() => state.darkTheme),
  transactions: computed(() => state.transactions),
  numberOfTransactions: computed(() => state.transactions.transactions.length),
  transaction: computed(() => state.transaction),
};

const actions = {
  getTransactions: async (page: number, type?: string, searchTerm?: string) => {
    const apiCall = await transactionApi.getTransactions(
      page,
      type,
      searchTerm
    );

    const result = apiCall.data;

    if (result && result.code === 200) {
      mutations.setTransactions(result.data);

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
      actions.getTransactions(1);

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

  editTransaction: async (transactionId: string, data: any) => {
    const apiCall = await transactionApi.editTransaction(transactionId, data);
    const result = apiCall.data;
    if (result && apiCall.status === 200) {
      mutations.setSingleTransaction(data);
      actions.getTransactions(1);

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
      actions.getTransactions(1);

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
