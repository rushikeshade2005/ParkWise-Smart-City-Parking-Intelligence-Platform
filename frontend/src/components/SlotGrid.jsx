const SlotGrid = ({ slots = [], selected, onSelect }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Select Slot</h2>
      <div className="grid grid-cols-4 gap-3">
        {slots.map((slot) => (
          <button
            key={slot._id}
            onClick={() => onSelect(slot)}
            disabled={!slot.isAvailable}
            className={`p-3 rounded border text-center
              ${selected?._id === slot._id ? "bg-indigo-600 text-white" : "bg-white"}
              ${!slot.isAvailable && "opacity-40 cursor-not-allowed"}
            `}
          >
            {slot.slotNumber}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SlotGrid;