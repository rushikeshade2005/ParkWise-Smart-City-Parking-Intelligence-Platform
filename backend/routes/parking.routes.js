import express from "express";
import {
  createParkingArea,
  addParkingSlots,
  getAllParkingAreas,
  getNearbyParkingAreas,
} from "../controllers/parking.controller.js";

import { protect } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";

const router = express.Router();

// ================= ADMIN ROUTES =================

// Add new parking area
router.post(
  "/area",
  protect,
  authorize("PARKING_ADMIN"),
  createParkingArea
);

// Add parking slots
router.post(
  "/slots",
  protect,
  authorize("PARKING_ADMIN"),
  addParkingSlots
);

// ================= USER / PUBLIC ROUTES =================

// Get all parking areas
router.get("/areas", getAllParkingAreas);

// 🔥 Get nearby parking areas (MAP BASED SEARCH)
router.get("/nearby", getNearbyParkingAreas);

export default router;