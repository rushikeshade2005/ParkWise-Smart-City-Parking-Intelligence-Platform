import cron from "node-cron";
import Booking from "../models/Booking.model.js";
import ParkingSlot from "../models/ParkingSlot.model.js";

/**
 * Auto-cancel unpaid bookings and release slots
 * Runs every 5 minutes
 */
export const startSlotReleaseJob = () => {
  cron.schedule("*/5 * * * *", async () => {
    try {
      const expiryTime = new Date(Date.now() - 10 * 60 * 1000); // 10 minutes

      const expiredBookings = await Booking.find({
        bookingStatus: "PENDING",
        paymentStatus: "PENDING",
        createdAt: { $lte: expiryTime },
      });

      for (const booking of expiredBookings) {
        // Release parking slot
        const slot = await ParkingSlot.findById(booking.parkingSlot);
        if (slot) {
          slot.status = "AVAILABLE";
          await slot.save();
        }

        // Cancel booking
        booking.bookingStatus = "CANCELLED";
        await booking.save();
      }

      if (expiredBookings.length > 0) {
        console.log(
          `⏱️ Released ${expiredBookings.length} expired parking slots`
        );
      }
    } catch (error) {
      console.error("Slot release cron error:", error.message);
    }
  });
};