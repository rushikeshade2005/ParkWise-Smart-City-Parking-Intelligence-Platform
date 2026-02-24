import Review from "../models/Review.model.js";
import Booking from "../models/Booking.model.js";
import ParkingArea from "../models/ParkingArea.model.js";

/**
 * @desc Add review (only booked users)
 */
export const addReview = async (req, res) => {
  try {
    const { parkingAreaId, rating, comment } = req.body;

    // Check if user booked this parking area
    const hasBooking = await Booking.findOne({
      user: req.user.id,
      bookingStatus: "CONFIRMED",
    }).populate({
      path: "parkingSlot",
      populate: { path: "parkingArea" },
    });

    if (
      !hasBooking ||
      hasBooking.parkingSlot.parkingArea._id.toString() !== parkingAreaId
    ) {
      return res
        .status(403)
        .json({ message: "You can review only booked parking areas" });
    }

    // Create review
    const review = await Review.create({
      user: req.user.id,
      parkingArea: parkingAreaId,
      rating,
      comment,
    });

    // Update parking area rating
    const reviews = await Review.find({ parkingArea: parkingAreaId });

    const avgRating =
      reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    await ParkingArea.findByIdAndUpdate(parkingAreaId, {
      averageRating: avgRating.toFixed(1),
      totalReviews: reviews.length,
    });

    res.status(201).json({
      message: "Review added successfully",
      review,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};