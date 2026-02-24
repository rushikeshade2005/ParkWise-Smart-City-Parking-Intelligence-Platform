const PriceSummary = ({ pricePerHour, time, slot }) => {
  if (!slot || !time.start || !time.end) return null;

  const hours =
    (new Date(`1970-01-01T${time.end}`) -
      new Date(`1970-01-01T${time.start}`)) /
    3600000;

  const total = Math.max(0, hours * pricePerHour);

  return (
    <div className="p-4 border rounded bg-gray-50">
      <p>Slot: <strong>{slot.slotNumber}</strong></p>
      <p>Total Price: <strong>₹{total}</strong></p>

      <button className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded">
        Book Now
      </button>
    </div>
  );
};

export default PriceSummary;