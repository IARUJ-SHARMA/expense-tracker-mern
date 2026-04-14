import express from "express";
// 🕵️‍♂️ Added the dot to match the naming pattern
import { loginController, registerController } from "./user.controller.js";

const router = express.Router();

router.post("/login", loginController);
router.post("/register", registerController);

export default router;