import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";

// 1. Import Routes
import userRoutes from "./user/user.routes.js"; 
import transactionRoutes from "./transactions/transaction.routes.js";

// 2. Config & Directory Setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();
const PORT = process.env.PORT || 8080;

// 3. Middlewares (Must come BEFORE routes)
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// 4. API Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/transactions", transactionRoutes);

// 5. Root/Test Route
app.get("/", (req, res) => {
  res.send("Ghost's Expense App API is running! 🚀");
});

// 6. Database Connection & Server Start
mongoose.connect(process.env.DB_URL)
  .then(() => {
    console.log("✅ Database connected!");
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(`❌ DB Connection Error: ${err.message}`));