import Transaction from "../models/Transaction.js";
import mongoose from "mongoose";

export const createTransaction = async (req, res, next) => {
  const {
    title,
    customer,
    amount,
    transactionType,
    transactionDate,
    ...others
  } = req.body;

  let errorText;

  if (!title && !amount && !transactionType && !transactionDate) {
    errorText = "Please fill all compulsory fields!";
  } else if (!title || !title.length) {
    errorText = "Transaction title is required.";
  } else if (!customer || !customer.length) {
    errorText = "Name is required.";
  } else if (!amount) {
    errorText = "Amount is required.";
  } else if (!transactionType || !transactionType.length) {
    errorText = "Transaction type is required.";
  } else if (!transactionDate || !transactionDate.length) {
    errorText = "Transaction date is required.";
  } else {
    errorText = "";
  }

  if (errorText.length > 0) {
    return res.status(400).json({
      code: 400,
      data: null,
      message: "Failed",
      error: errorText,
    });
  }

  try {
    const userId = req.user._id;

    const savedTransaction = await Transaction.create({
      title,
      customer,
      amount,
      transactionType,
      transactionDate,
      others,
      userId,
    });

    res.status(200).json({
      code: 200,
      data: savedTransaction,
      message: "Success",
    });
  } catch (error) {
    next(error);
  }
};

export const getAllTransactions = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const transations = await Transaction.find({ userId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      code: 200,
      data: transations,
      message: "Success",
    });
  } catch (error) {
    next(error);
  }
};

export const getTransaction = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({
        code: 404,
        error: "No such transaction",
        message: "Error",
      });
    }

    const transaction = await Transaction.findById(req.params.id);

    res.status(200).json({
      code: 200,
      data: transaction,
      message: "Success",
    });
  } catch (error) {
    next(error);
  }
};

export const updateTransaction = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({
        code: 404,
        error: "No such transaction",
        message: "Error",
      });
    }

    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      code: 200,
      data: transaction,
      message: "Success",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTransaction = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({
        code: 404,
        error: "No such transaction",
        message: "Error",
      });
    }

    const transaction = await Transaction.findByIdAndDelete(req.params.id);

    res.status(200).json({
      code: 200,
      data: "Transaction deleted successfully",
      message: "Success",
    });
  } catch (error) {
    next(error);
  }
};
