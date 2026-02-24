import express from "express";
import {
  adminDashboardAnalytics,
  userAnalytics,
} from "../controllers/analytics.controller.js";

import { protect } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";

const router = express.Router();

// Admin analytics
router.get("/admin", protect, authorize("ADMIN"), adminDashboardAnalytics);

// User analytics
router.get("/user", protect, userAnalytics);

export default router;