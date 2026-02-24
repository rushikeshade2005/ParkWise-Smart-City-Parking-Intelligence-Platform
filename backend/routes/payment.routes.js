import express from "express";
import { confirmPayment } from "../controllers/payment.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

// router.post("/confirm", protect, confirmPayment);
router.post("/confirm", confirmPayment);

export default router;