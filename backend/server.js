import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js";
import { startSlotReleaseJob } from "./jobs/slotRelease.job.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    startSlotReleaseJob(); // ✅ START CRON

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });