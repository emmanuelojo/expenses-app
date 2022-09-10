export interface Transaction {
  _id: string;
  title: string;
  customer?: string;
  amount: number;
  transactionType: string;
  transactionDate: Date | string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  __v?: number;
  userId?: string;
}
