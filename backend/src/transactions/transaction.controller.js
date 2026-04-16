import transactionModel from "./transaction.model.js";
import moment from "moment";

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

export const getAllTransaction = async (req, res) => {
  try {
    const { frequency, selectedDate, type, userid } = req.body;

    // Failsafe: Ensure we only fetch transactions for the logged-in user
    if (!userid) {
      return res.status(400).json({ 
        success: false, 
        message: "User ID is required for this operation" 
      });
    }

    const query = {
      userid: userid,
      ...(frequency !== "custom"
        ? {
            date: {
              // Using .toDate() ensures perfect compatibility with MongoDB Date types
              $gte: moment().subtract(Number(frequency), "d").toDate(),
            },
          }
        : {
            date: {
              $gte: new Date(selectedDate[0]),
              $lte: new Date(selectedDate[1]),
            },
          }),
      ...(type !== "all" && { type }),
    };

    const transactions = await transactionModel.find(query);
    res.status(200).json(transactions);
  } catch (error) {
    console.log("❌ Get Transaction Error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

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
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    await transactionModel.findOneAndDelete({ _id: req.body.transactionId });
    res.status(200).json({
      success: true,
      message: "Transaction Deleted Successfully!",
    });
  } catch (error) {
    console.log("❌ Delete Transaction Error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};