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
      <div className="bg-white rounded-lg p-6 w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold">Confirm Booking</h2>

        <div className="text-sm text-gray-700 space-y-1">
          <p><b>Parking:</b> {parking.name}</p>
          <p><b>Slot:</b> {slot.slotNumber}</p>
          <p><b>From:</b> {time.start}</p>
          <p><b>To:</b> {time.end}</p>
          <p><b>Total Price:</b> ₹{price}</p>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-indigo-600 text-white rounded disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Booking..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmationModal;