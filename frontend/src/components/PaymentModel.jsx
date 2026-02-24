const PaymentModal = ({ open, onClose, onConfirm, loading }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm text-center space-y-4">
        <h2 className="text-xl font-bold">UPI QR Payment (Demo)</h2>

        <div className="border rounded p-4 bg-gray-100">
          <p className="text-sm text-gray-600">Scan this QR to Pay</p>
          <div className="text-6xl mt-2">📱</div>
        </div>

        <button
          onClick={onConfirm}
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded disabled:opacity-50"
        >
          {loading ? "Processing..." : "Confirm Payment"}
        </button>

        <button
          onClick={onClose}
          className="text-sm text-gray-500"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PaymentModal;