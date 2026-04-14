import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    userid: { type: String, required: [true, "userid is required"] },
    amount: { type: Number, required: [true, "amount is required"] },
    type: { type: String, required: [true, "type is required"] },
    category: { type: String, required: [true, "category is required"] },
    reference: { type: String },
    description: { type: String }, // You have both, but we search 'reference'
    date: { type: Date, required: [true, "date is required"] }, // ✅ CHANGED TO DATE
  },
  { timestamps: true }
);

const transactionModel = mongoose.model("transactions", transactionSchema);

export default transactionModel;