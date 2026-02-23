import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import parkingRoutes from "./routes/parking.routes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/parking", parkingRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("ParkWise API is running");
});

export default app;