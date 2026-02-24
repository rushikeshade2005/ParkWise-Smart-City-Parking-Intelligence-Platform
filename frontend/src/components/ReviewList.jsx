const ReviewList = ({ reviews }) => {
  if (reviews.length === 0)
    return <p className="text-gray-600">No reviews yet.</p>;

  return (
    <div className="space-y-3">
      {reviews.map((r) => (
        <div key={r._id} className="border rounded p-3">
          <p className="font-semibold">{r.rating} ⭐</p>
          <p className="text-sm text-gray-700">{r.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;