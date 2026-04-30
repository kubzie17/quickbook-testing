import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import BookAppointment from "./pages/BookAppointment";
import MyBookings from "./pages/MyBookings";
import Services from "./pages/Services";

export default function App() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1>QuickBook</h1>

      <nav style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/book">Book Appointment</Link>
        <Link to="/bookings">My Bookings</Link>
        <Link to="/services">Services Provided</Link>
        <Link to="/debug">Debug</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/book" element={<BookAppointment />} />
        <Route path="/bookings" element={<MyBookings />} />
        <Route path="/services" element={<Services />} />
        <Route path="/debug" element={<DebugPractice />} />
      </Routes>
    </div>
  );
}
