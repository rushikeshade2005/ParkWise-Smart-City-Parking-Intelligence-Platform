import { useState } from "react";
import { addReview } from "../services/review.service";

const ReviewForm = ({ parkingAreaId, onAdded }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const submitReview = async () => {
    try {
      setLoading(true);
      await addReview({ parkingAreaId, rating, comment });
      setRating(5);
      setComment("");
      onAdded();
    } catch (err) {
      alert(err.response?.data?.message || "Review failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border rounded p-4 space-y-3">
      <h3 className="font-semibold">Add Review</h3>

      <select
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        className="border p-2 w-full"
      >
        {[5, 4, 3, 2, 1].map((r) => (
          <option key={r} value={r}>
            {r} Star{r > 1 && "s"}
          </option>
        ))}
      </select>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your review"
        className="border p-2 w-full"
      />

      <button
        onClick={submitReview}
        disabled={loading}
        className="bg-indigo-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </div>
  );
};

export default ReviewForm;