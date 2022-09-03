import mongoose from "mongoose";

const TransactionSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: false,
    },
    customer: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    transactionType: {
      type: String,
      required: true,
    },
    transactionDate: {
      type: Date,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", TransactionSchema);
