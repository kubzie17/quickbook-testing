const express = require("express");
const cors = require("cors");
const {
  validateLogin,
  validateBookingInput,
  createBooking,
  deleteBookingById
} = require("./utils");

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
  const result = validateLogin(email, password);

  if (result.success) {
    return res.json(result);
  }

  return res.status(401).json(result);
});

app.post("/bookings", (req, res) => {
  const validation = validateBookingInput(req.body);

  if (!validation.success) {
    return res.status(400).json(validation);
  }

  const newBooking = createBooking(bookings, req.body);
  bookings.push(newBooking);

  return res.status(201).json({
    success: true,
    message: "Booking created successfully",
    booking: newBooking
  });
});

app.delete("/bookings/:id", (req, res) => {
  const bookingId = Number(req.params.id);
  const result = deleteBookingById(bookings, bookingId);

  bookings = result.updatedBookings;

  if (!result.success) {
    return res.status(404).json({
      success: false,
      message: result.message
    });
  }

  return res.json({
    success: true,
    message: result.message
  });
});

app.listen(PORT, () => {
  console.log(`QuickBook API running on port ${PORT}`);
});
