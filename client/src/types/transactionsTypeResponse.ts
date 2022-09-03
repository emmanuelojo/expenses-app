import { Transaction } from "../models/Transaction";
import { apiResponse } from "./apiResponseTypes";

export interface TransactionsResponse extends apiResponse {
  data: Transaction[];
}
