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

    // Create dummy payment record
    const payment = await Payment.create({
      booking: booking._id,
      user: booking.user,
      amount: booking.totalAmount,
      paymentMethod: "UPI_QR",
      paymentStatus: "SUCCESS",
    });

    // Update booking
    booking.paymentStatus = "PAID";
    booking.bookingStatus = "CONFIRMED";
    await booking.save();

    // Update slot
    const slot = await ParkingSlot.findById(booking.parkingSlot);
    slot.status = "OCCUPIED";
    await slot.save();

    res.json({
      message: "Payment successful, booking confirmed",
      payment,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};