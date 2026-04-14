import express from "express";
// 🚨 THE FIX: Go up two levels to reach the root 'controllers' folder
import { 
  addTransaction, 
  getAllTransaction, 
  deleteTransaction, 
  editTransaction 
} from "../../controllers/transactionCtrl.js"; 

const router = express.Router();

router.post("/add-transaction", addTransaction);
router.post("/get-transaction", getAllTransaction);
router.post("/edit-transaction", editTransaction);
router.post("/delete-transaction", deleteTransaction);

export default router;