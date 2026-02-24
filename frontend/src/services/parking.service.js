import api from "./api";

// Get all parking areas
export const getAllParkings = async () => {
  const res = await api.get("/parking/areas");
  return res.data;
};

// Get single parking by ID (FIX)
export const getParkingById = async (id) => {
  const res = await api.get(`/parking/${id}`);
  return res.data;
};