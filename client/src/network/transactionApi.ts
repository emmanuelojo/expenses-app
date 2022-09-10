import axios, { AxiosResponse } from "axios";
import { TransactionsResponse } from "../types/transactionsTypeResponse";
import { getToken } from "../utils/helpers";

export default {
  addTransaction(data: any) {
    const token = getToken();

    return axios.post("http://127.0.0.1:4000/api/v1/transactions", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  getTransactions(page: number, type?: string, searchTerm?: string) {
    const token = getToken();

    return axios.get("http://127.0.0.1:4000/api/v1/transactions", {
      params: {
        page,
        type,
        searchTerm,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }) as Promise<AxiosResponse<TransactionsResponse>>;
  },

  editTransaction(id: string, data: any) {
    const token = getToken();

    return axios.patch(
      `http://127.0.0.1:4000/api/v1/transactions/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },

  deleteTransaction(id: string) {
    const token = getToken();

    return axios.delete(`http://127.0.0.1:4000/api/v1/transactions/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
