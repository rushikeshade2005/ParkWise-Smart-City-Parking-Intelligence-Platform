import express from "express";
import {
  createParkingArea,
  addParkingSlots,
  getAllParkingAreas,
} from "../controllers/parking.controller.js";

import { protect } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";

const router = express.Router();

// Admin routes
router.post(
  "/area",
  protect,
  authorize("PARKING_ADMIN"),
  createParkingArea
);

router.post(
  "/slots",
  protect,
  authorize("PARKING_ADMIN"),
  addParkingSlots
);

// Public/User route
router.get("/areas", getAllParkingAreas);

export default router;