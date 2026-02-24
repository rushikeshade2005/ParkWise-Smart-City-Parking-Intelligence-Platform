import api from "./api";

export const confirmPayment = async (bookingId) => {
  const res = await api.post("/payments/confirm", { bookingId });
  return res.data;
};