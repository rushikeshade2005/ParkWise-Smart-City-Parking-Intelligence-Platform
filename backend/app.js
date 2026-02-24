import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import parkingRoutes from "./routes/parking.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import reportRoutes from "./routes/report.routes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/parking", parkingRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes); 
app.use("/api/analytics", analyticsRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/reports", reportRoutes);



// Health check
app.get("/", (req, res) => {
  res.send("ParkWise API is running");
});

export default app;