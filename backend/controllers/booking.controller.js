import Booking from "../models/Booking.model.js";
import ParkingSlot from "../models/ParkingSlot.model.js";
import ParkingArea from "../models/ParkingArea.model.js";

export const createBooking = async (req, res) => {
  try {
    const { parkingSlotId, startTime, endTime } = req.body;

    const slot = await ParkingSlot.findById(parkingSlotId).populate(
      "parkingArea"
    );

    if (!slot || slot.status !== "AVAILABLE") {
      return res.status(400).json({ message: "Slot not available" });
    }

    const parkingArea = slot.parkingArea;

    // ⏱️ Calculate hours
    const start = new Date(startTime);
    const end = new Date(endTime);
    const hours = Math.ceil((end - start) / (1000 * 60 * 60));

    // 💰 Base price
    let pricePerHour = parkingArea.basePricePerHour;

    // 🔥 Peak hour pricing
    const hourNow = start.getHours();
    if (hourNow >= 8 && hourNow <= 20) {
      pricePerHour *= 1.2; // +20%
    } else {
      pricePerHour *= 0.9; // -10%
    }

    // 🅿️ Availability pricing
    const availabilityRatio =
      parkingArea.availableSlots / parkingArea.totalSlots;

    if (availabilityRatio < 0.3) {
      pricePerHour *= 1.3; // +30%
    }

    pricePerHour = Math.round(pricePerHour);

    const totalAmount = pricePerHour * hours;

    // Create booking
    const booking = await Booking.create({
      user: req.user.id,
      parkingSlot: parkingSlotId,
      startTime,
      endTime,
      pricePerHour,
      totalAmount,
      bookingStatus: "PENDING",
      paymentStatus: "PENDING",
    });

    // Reserve slot
    slot.status = "RESERVED";
    await slot.save();

    res.status(201).json({
      message: "Booking created with dynamic pricing",
      pricing: {
        hours,
        pricePerHour,
        totalAmount,
      },
      booking,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};