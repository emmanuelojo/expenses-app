import express from "express";
import {
  createTransaction,
  deleteTransaction,
  getAllTransactions,
  getTransaction,
  updateTransaction,
} from "../controllers/transactionController.js";
import { verifyUser } from "../utils/verifyUser.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = express.Router();

// require auth for all transaction routes
router.use(requireAuth);

router.get("/", verifyUser, getAllTransactions);

router.get("/:id", getTransaction);

router.patch("/:id", updateTransaction);

router.post("/", createTransaction);

router.delete("/:id", deleteTransaction);

export default router;
