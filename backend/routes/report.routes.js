import express from "express";
import {
  downloadRevenueCSV,
  downloadRevenuePDF,
} from "../controllers/report.controller.js";

import { protect } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";

const router = express.Router();

router.get("/revenue/csv", protect, authorize("ADMIN"), downloadRevenueCSV);
// router.get("/revenue/csv", downloadRevenueCSV);
router.get("/revenue/pdf", protect, authorize("ADMIN"), downloadRevenuePDF);

export default router;