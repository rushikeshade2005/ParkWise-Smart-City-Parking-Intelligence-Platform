import api from "./api";

export const addReview = async (data) => {
  const res = await api.post("/reviews", data);
  return res.data;
};

export const getReviews = async (parkingAreaId) => {
  const res = await api.get(`/reviews/${parkingAreaId}`);
  return res.data;
};