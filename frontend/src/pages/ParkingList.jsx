import { useEffect, useState } from "react";
import ParkingCard from "../components/ParkingCard";
import { getAllParkings } from "../services/parking.service";

const ParkingList = () => {
  const [parkings, setParkings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadParkings = async () => {
      const data = await getAllParkings();
      setParkings(data);
      setLoading(false);
    };

    loadParkings();
  }, []);

  if (loading) {
    return <p className="text-center">Loading parking areas...</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-indigo-600 mb-6">
        Available Parking Areas
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {parkings.map((parking) => (
          <ParkingCard key={parking.id} parking={parking} />
        ))}
      </div>
    </div>
  );
};

export default ParkingList;