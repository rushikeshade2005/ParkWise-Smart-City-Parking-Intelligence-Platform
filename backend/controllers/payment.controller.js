import Payment from "../models/Payment.model.js";
import Booking from "../models/Booking.model.js";
import ParkingSlot from "../models/ParkingSlot.model.js";

/**
 * @desc    Confirm dummy UPI payment
 * @route   POST /api/payments/confirm
 * @access  User
 */
export const confirmPayment = async (req, res) => {
  try {
    const { bookingId } = req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Prevent double payment
    if (booking.paymentStatus === "PAID") {
      return res.status(400).json({ message: "Booking already paid" });
    }

    // Create dummy payment record
    const payment = await Payment.create({
      booking: booking._id,
      user: booking.user,
      amount: booking.totalPrice,
      paymentMethod: "UPI_QR",
      paymentStatus: "SUCCESS",
    });

    // Update booking
    booking.paymentStatus = "PAID";
    booking.bookingStatus = "CONFIRMED";
    await booking.save();

    // Update slot availability
    const slot = await ParkingSlot.findById(booking.parkingSlot);
    if (slot) {
      slot.isAvailable = false;
      await slot.save();
    }

    res.status(200).json({
      message: "Payment successful, booking confirmed",
      payment,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};