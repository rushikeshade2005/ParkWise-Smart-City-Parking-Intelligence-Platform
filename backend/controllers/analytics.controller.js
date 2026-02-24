import Booking from "../models/Booking.model.js";
import ParkingSlot from "../models/ParkingSlot.model.js";

/**
 * @desc Admin dashboard analytics
 * @route GET /api/analytics/admin
 */
export const adminDashboardAnalytics = async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments({
      bookingStatus: "CONFIRMED",
    });

    const revenueAgg = await Booking.aggregate([
      { $match: { paymentStatus: "SUCCESS" } },
      { $group: { _id: null, totalRevenue: { $sum: "$totalAmount" } } },
    ]);

    const totalRevenue = revenueAgg[0]?.totalRevenue || 0;

    const totalSlots = await ParkingSlot.countDocuments();
    const occupiedSlots = await ParkingSlot.countDocuments({
      status: "OCCUPIED",
    });

    res.json({
      totalBookings,
      totalRevenue,
      slots: {
        total: totalSlots,
        occupied: occupiedSlots,
        available: totalSlots - occupiedSlots,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @desc User booking analytics
 * @route GET /api/analytics/user
 */
export const userAnalytics = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id });

    const totalSpent = bookings.reduce(
      (sum, b) => sum + (b.totalAmount || 0),
      0
    );

    res.json({
      totalBookings: bookings.length,
      totalSpent,
      bookings,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};