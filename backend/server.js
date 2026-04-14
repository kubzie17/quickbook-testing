const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const services = [
  { id: 1, name: "Haircut", duration: 30 },
  { id: 2, name: "Consultation", duration: 45 },
  { id: 3, name: "Follow-up Session", duration: 20 }
];

let bookings = [];

app.get("/", (req, res) => {
  res.json({ message: "QuickBook API is running" });
});

app.get("/services", (req, res) => {
  res.json(services);
});

app.get("/bookings", (req, res) => {
  res.json(bookings);
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "student@example.com" && password === "Password123") {
    return res.json({
      success: true,
      message: "Login successful",
      user: {
        email: "student@example.com",
        role: "user"
      }
    });
  }

  return res.status(401).json({
    success: false,
    message: "Invalid email or password"
  });
});

app.post("/bookings", (req, res) => {
  const { name, email, service, date, time } = req.body;

  if (!name || !email || !service || !date || !time) {
    return res.status(400).json({
      success: false,
      message: "All fields are required"
    });
  }

  const newBooking = {
    id: bookings.length + 1,
    name,
    email,
    service,
    date,
    time
  };

  bookings.push(newBooking);

  return res.status(201).json({
    success: true,
    message: "Booking created successfully",
    booking: newBooking
  });
});

app.delete("/bookings/:id", (req, res) => {
  const bookingId = Number(req.params.id);
  const initialLength = bookings.length;

  bookings = bookings.filter((booking) => booking.id !== bookingId);

  if (bookings.length === initialLength) {
    return res.status(404).json({
      success: false,
      message: "Booking not found"
    });
  }

  return res.json({
    success: true,
    message: "Booking cancelled successfully"
  });
});

app.listen(PORT, () => {
  console.log(`QuickBook API running on port ${PORT}`);
});