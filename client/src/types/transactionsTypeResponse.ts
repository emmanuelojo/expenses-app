import { Transaction } from "../models/Transaction";
import { apiResponse } from "./apiResponseTypes";

export interface TransactionsResponse extends apiResponse {
  data: {
    pagination: Pagination;
    transactions: Transaction[];
  };
}

export interface Pagination {
  total: number;
  currentPage: number;
  perPage: number;
  totalPages: number;
  limit: number;
}
