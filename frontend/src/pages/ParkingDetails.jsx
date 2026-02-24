import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SlotGrid from "../components/SlotGrid";
import TimeSelector from "../components/TimeSelector";
import PriceSummary from "../components/PriceSummary";
import { getParkingById } from "../services/parking.service";

const ParkingDetails = () => {
  const { id } = useParams();
  const [parking, setParking] = useState(null);
  const [slot, setSlot] = useState(null);
  const [time, setTime] = useState({ start: "", end: "" });

  useEffect(() => {
    getParkingById(id).then(setParking);
  }, [id]);

  if (!parking) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">{parking.name}</h1>
      <p className="text-gray-600">{parking.address}</p>

      <SlotGrid slots={parking.slots} selected={slot} onSelect={setSlot} />

      <TimeSelector time={time} setTime={setTime} />

      <PriceSummary
        pricePerHour={parking.basePricePerHour}
        time={time}
        slot={slot}
      />
    </div>
  );
};

export default ParkingDetails;