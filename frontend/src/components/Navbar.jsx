import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          ParkWise
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/">Home</Link>

          {!user ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          ) : (
            <>
              {/* USER LINK */}
              <Link to="/my-bookings">My Bookings</Link>

              {/* ADMIN LINK */}
              {user.role === "PARKING_ADMIN" && (
                <Link to="/admin/dashboard">Admin Dashboard</Link>
              )}

              <button
                onClick={logout}
                className="text-red-600 font-semibold"
              >
                Logout
              </button>
            </>
          )}
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden text-2xl">
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-2">
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>

          {!user ? (
            <>
              <Link to="/login" onClick={() => setOpen(false)}>Login</Link>
              <Link to="/register" onClick={() => setOpen(false)}>Register</Link>
            </>
          ) : (
            <>
              <Link to="/my-bookings" onClick={() => setOpen(false)}>
                My Bookings
              </Link>

              {user.role === "PARKING_ADMIN" && (
                <Link to="/admin/dashboard" onClick={() => setOpen(false)}>
                  Admin Dashboard
                </Link>
              )}

              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="text-red-600"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;