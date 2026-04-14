import transactionModel from "./transaction.model.js";
import moment from "moment";

// 📤 1. ADD TRANSACTION
export const addTransaction = async (req, res) => {
  try {
    const newTransaction = new transactionModel(req.body);
    await newTransaction.save();
    res.status(201).json({
      success: true,
      message: "Transaction Created Successfully",
    });
  } catch (error) {
    console.log("❌ Add Transaction Error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// 📥 2. GET ALL TRANSACTIONS (Includes Date & Type Filters)
export const getAllTransaction = async (req, res) => {
  try {
    const { frequency, selectedDate, type, userid } = req.body;

    const query = {
      userid: userid,
      ...(frequency !== "custom"
        ? {
            date: {
              // String-based comparison for YYYY-MM-DD
              $gte: moment().subtract(Number(frequency), "d").format("YYYY-MM-DD"),
            },
          }
        : {
            date: {
              $gte: selectedDate[0],
              $lte: selectedDate[1],
            },
          }),
      ...(type !== "all" && { type }),
    };

    const transactions = await transactionModel.find(query);
    res.status(200).json(transactions);
  } catch (error) {
    console.log("❌ Get Transaction Error:", error);
    res.status(500).json(error);
  }
};

// ✏️ 3. EDIT TRANSACTION
export const editTransaction = async (req, res) => {
  try {
    await transactionModel.findOneAndUpdate(
      { _id: req.body.transactionId },
      req.body.payload
    );
    res.status(200).json({
      success: true,
      message: "Transaction Updated Successfully",
    });
  } catch (error) {
    console.log("❌ Edit Transaction Error:", error);
    res.status(500).json(error);
  }
};

// 🗑️ 4. DELETE TRANSACTION
export const deleteTransaction = async (req, res) => {
  try {
    await transactionModel.findOneAndDelete({ _id: req.body.transactionId });
    res.status(200).json({
      success: true,
      message: "Transaction Deleted Successfully!",
    });
  } catch (error) {
    console.log("❌ Delete Transaction Error:", error);
    res.status(500).json(error);
  }
};