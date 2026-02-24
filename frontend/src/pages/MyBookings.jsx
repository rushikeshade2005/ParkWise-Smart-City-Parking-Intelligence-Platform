import { useEffect, useState } from "react";
import { getMyBookings } from "../services/booking.service";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyBookings()
      .then(setBookings)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">My Bookings</h1>

      {bookings.length === 0 ? (
        <p className="text-gray-600">No bookings found.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => (
            <div
              key={b._id}
              className="border rounded p-4 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{b.parkingArea?.name}</p>
                <p className="text-sm text-gray-600">
                  Slot: {b.parkingSlot?.slotNumber}
                </p>
                <p className="text-sm text-gray-600">
                  {b.startTime} → {b.endTime}
                </p>
              </div>

              <div className="text-right">
                <p className="font-bold">₹{b.totalPrice}</p>
                <p className="text-xs text-green-600">
                  {b.paymentStatus}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;