const BookingConfirmationModal = ({
  open,
  onClose,
  onConfirm,
  parking,
  slot,
  time,
  price,
  loading,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold">Confirm Booking</h2>

        <p><strong>Parking:</strong> {parking.name}</p>
        <p><strong>Slot:</strong> {slot.slotNumber}</p>
        <p><strong>Time:</strong> {time.start} - {time.end}</p>
        <p><strong>Total Price:</strong> ₹{price}</p>

        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 bg-indigo-600 text-white rounded disabled:opacity-50"
          >
            {loading ? "Processing..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmationModal;