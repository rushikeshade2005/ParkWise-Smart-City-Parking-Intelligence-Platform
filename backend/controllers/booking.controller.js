import Booking from "../models/Booking.model.js";
import ParkingSlot from "../models/ParkingSlot.model.js";

/**
 * @desc    Create a new booking
 * @route   POST /api/bookings
 * @access  User
 */
export const createBooking = async (req, res) => {
  try {
    const { parkingSlotId, startTime, endTime } = req.body;

    // Check slot
    const slot = await ParkingSlot.findById(parkingSlotId);
    if (!slot || slot.status !== "AVAILABLE") {
      return res.status(400).json({ message: "Slot not available" });
    }

    // Create booking
    const booking = await Booking.create({
      user: req.user.id,
      parkingSlot: parkingSlotId,
      startTime,
      endTime,
      bookingStatus: "PENDING",
      paymentStatus: "PENDING",
    });

    // Mark slot as reserved
    slot.status = "RESERVED";
    await slot.save();

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};