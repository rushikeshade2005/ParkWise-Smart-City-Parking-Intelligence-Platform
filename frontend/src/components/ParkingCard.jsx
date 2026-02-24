import { Link } from "react-router-dom";

const ParkingCard = ({ parking }) => {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-5">
      <h3 className="text-xl font-semibold text-indigo-600 mb-1">
        {parking.name}
      </h3>

      <p className="text-sm text-gray-500 mb-2">
        {parking.address}, {parking.city}
      </p>

      <div className="flex justify-between items-center mb-3">
        <span className="text-sm text-gray-600">
          Slots: {parking.availableSlots}/{parking.totalSlots}
        </span>

        <span className="font-bold text-green-600">
          ₹{parking.pricePerHour}/hr
        </span>
      </div>

      <Link
        to={`/parkings/${parking.id}`}
        className="block text-center bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
      >
        View & Book
      </Link>
    </div>
  );
};

export default ParkingCard;