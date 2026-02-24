import api from "./api";

/**
 * Create a new parking booking
 */
export const createBooking = async ({
  parkingAreaId,
  slotId,
  startTime,
  endTime,
}) => {
  const res = await api.post("/bookings", {
    parkingAreaId,
    slotId,
    startTime,
    endTime,
  });
  return res.data;
};

/**
 * Get logged-in user's bookings
 */
export const getMyBookings = async () => {
  const res = await api.get("/bookings/my");
  return res.data;
};