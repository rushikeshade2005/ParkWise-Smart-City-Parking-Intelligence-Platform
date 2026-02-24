const TimeSelector = ({ time, setTime }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Select Time</h2>
      <div className="flex gap-4">
        <input
          type="time"
          value={time.start}
          onChange={(e) => setTime({ ...time, start: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="time"
          value={time.end}
          onChange={(e) => setTime({ ...time, end: e.target.value })}
          className="border p-2 rounded"
        />
      </div>
    </div>
  );
};

export default TimeSelector;