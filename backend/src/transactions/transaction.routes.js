import express from "express";
import {
  addTransaction,
  getAllTransaction,
  editTransaction,
  deleteTransaction,
} from "./transaction.controller.js";

const router = express.Router();

// Add a transaction
router.post("/add-transaction", addTransaction);

// Get all transactions
router.post("/get-transaction", getAllTransaction);

// Edit a transaction
router.post("/edit-transaction", editTransaction);

// Delete a transaction
router.post("/delete-transaction", deleteTransaction);

export default router;