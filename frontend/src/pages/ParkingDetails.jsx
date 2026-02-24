import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import SlotGrid from "../components/SlotGrid.jsx";
import TimeSelector from "../components/TimeSelector.jsx";
import PriceSummary from "../components/PriceSummary.jsx";
import BookingConfirmationModal from "../components/BookingConfirmationModal.jsx";
import PaymentModal from "../components/PaymentModal.jsx";
import ReviewForm from "../components/ReviewForm.jsx";
import ReviewList from "../components/ReviewList.jsx";

import { getParkingById } from "../services/parking.service";
import { createBooking } from "../services/booking.service";
import { confirmPayment } from "../services/payment.service";
import { getReviews } from "../services/review.service";
import { useAuth } from "../context/AuthContext";

const ParkingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [parking, setParking] = useState(null);
  const [slot, setSlot] = useState(null);
  const [time, setTime] = useState({ start: "", end: "" });

  const [openConfirm, setOpenConfirm] = useState(false);
  const [openPayment, setOpenPayment] = useState(false);

  const [bookingId, setBookingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getParkingById(id).then(setParking);
    loadReviews();
  }, [id]);

  const loadReviews = () => {
    getReviews(id).then(setReviews);
  };

  if (!parking) return <p className="p-6">Loading...</p>;

  const hours =
    time.start && time.end
      ? Math.max(
          (new Date(`1970-01-01T${time.end}`) -
            new Date(`1970-01-01T${time.start}`)) /
            (1000 * 60 * 60),
          1
        )
      : 0;

  const totalPrice = hours * parking.basePricePerHour;

  // STEP 1: Create booking (UNPAID)
  const confirmBooking = async () => {
    try {
      setLoading(true);

      const booking = await createBooking({
        parkingAreaId: parking._id,
        slotId: slot._id,
        startTime: time.start,
        endTime: time.end,
      });

      setBookingId(booking._id);
      setOpenConfirm(false);
      setOpenPayment(true);
    } catch {
      alert("Booking failed");
    } finally {
      setLoading(false);
    }
  };

  // STEP 2: Confirm dummy UPI payment
  const handlePayment = async () => {
    try {
      setLoading(true);
      await confirmPayment(bookingId);
      alert("✅ Payment successful");
      navigate("/my-bookings");
    } catch {
      alert("❌ Payment failed");
    } finally {
      setLoading(false);
      setOpenPayment(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">{parking.name}</h1>
      <p className="text-gray-600">{parking.address}</p>

      <SlotGrid slots={parking.slots} selected={slot} onSelect={setSlot} />
      <TimeSelector time={time} setTime={setTime} />
      <PriceSummary
        pricePerHour={parking.basePricePerHour}
        time={time}
        slot={slot}
      />

      <button
        className="w-full bg-indigo-600 text-white py-3 rounded mt-4 disabled:opacity-50"
        disabled={!slot || !time.start || !time.end}
        onClick={() => (user ? setOpenConfirm(true) : navigate("/login"))}
      >
        {user ? "Book Parking" : "Login to Book"}
      </button>

      {/* Booking confirmation */}
      <BookingConfirmationModal
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        onConfirm={confirmBooking}
        parking={parking}
        slot={slot}
        time={time}
        price={totalPrice}
        loading={loading}
      />

      {/* Dummy UPI Payment */}
      <PaymentModal
        open={openPayment}
        onClose={() => setOpenPayment(false)}
        onConfirm={handlePayment}
        loading={loading}
      />

      {/* Reviews */}
      <div className="pt-6 space-y-4">
        <h2 className="text-2xl font-bold">Reviews</h2>
        <ReviewList reviews={reviews} />
        {user && <ReviewForm parkingAreaId={id} onAdded={loadReviews} />}
      </div>
    </div>
  );
};

export default ParkingDetails;