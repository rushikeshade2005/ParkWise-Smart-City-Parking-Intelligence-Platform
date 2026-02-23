import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import parkingRoutes from "./routes/parking.routes.js";
import paymentRoutes from "./routes/payment.routes.js"; // ✅ ADD THIS
import bookingRoutes from "./routes/booking.routes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/parking", parkingRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes); // ✅ ADD THIS


// Health check
app.get("/", (req, res) => {
  res.send("ParkWise API is running");
});

app.get("/debug-payments", (req, res) => {
  res.send("Payments routes are connected");
});

export default app;