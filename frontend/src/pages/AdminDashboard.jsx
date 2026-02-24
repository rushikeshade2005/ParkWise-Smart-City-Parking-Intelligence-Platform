import { useEffect, useState } from "react";
import api from "../services/api";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("/analytics/overview").then((res) => {
      setStats(res.data);
    });
  }, []);

  if (!stats) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="border rounded p-4">
          <p className="text-gray-600">Total Parkings</p>
          <p className="text-2xl font-bold">{stats.totalParkings}</p>
        </div>

        <div className="border rounded p-4">
          <p className="text-gray-600">Total Bookings</p>
          <p className="text-2xl font-bold">{stats.totalBookings}</p>
        </div>

        <div className="border rounded p-4">
          <p className="text-gray-600">Total Revenue</p>
          <p className="text-2xl font-bold">₹{stats.totalRevenue}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;