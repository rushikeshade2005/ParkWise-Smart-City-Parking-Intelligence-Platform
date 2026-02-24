import { useState } from "react";
import LocationPickerMap from "../components/LocationPickerMap";
import api from "../services/api";

const AdminCreateParking = () => {
  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    basePricePerHour: "",
  });

  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  const submitParking = async () => {
    if (!location) {
      alert("Please select parking location on map");
      return;
    }

    try {
      setLoading(true);
      await api.post("/parking/area", {
        ...form,
        location,
      });
      alert("Parking created successfully");
    } catch (err) {
      alert("Failed to create parking");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Create Parking Area</h1>

      <input
        placeholder="Parking Name"
        className="border p-2 w-full"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Address"
        className="border p-2 w-full"
        onChange={(e) => setForm({ ...form, address: e.target.value })}
      />

      <input
        placeholder="City"
        className="border p-2 w-full"
        onChange={(e) => setForm({ ...form, city: e.target.value })}
      />

      <input
        placeholder="Base Price Per Hour"
        type="number"
        className="border p-2 w-full"
        onChange={(e) =>
          setForm({ ...form, basePricePerHour: e.target.value })
        }
      />

      <div>
        <p className="font-semibold mb-2">Select Location on Map</p>
        <LocationPickerMap setLocation={setLocation} />
        {location && (
          <p className="text-sm text-gray-600 mt-2">
            Selected: Lat {location.lat}, Lng {location.lng}
          </p>
        )}
      </div>

      <button
        onClick={submitParking}
        disabled={loading}
        className="bg-indigo-600 text-white px-6 py-2 rounded"
      >
        {loading ? "Saving..." : "Create Parking"}
      </button>
    </div>
  );
};

export default AdminCreateParking;