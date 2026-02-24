import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import ParkingList from "./pages/ParkingList";
import ParkingDetails from "./pages/ParkingDetails";
import Register from "./pages/Register";
import Login from "./pages/Login";
import MyBookings from "./pages/MyBookings";
import AdminDashboard from "./pages/AdminDashboard";
import AdminCreateParking from "./pages/AdminCreateParking";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<ParkingList />} />
        <Route path="/parkings/:id" element={<ParkingDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/create-parking" element={<AdminCreateParking />} />
      </Routes>
    </>
  );
}

export default App;