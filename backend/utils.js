function validateLogin(email, password) {
  if (email === "student@example.com" && password === "Password123") {
    return {
      success: true,
      message: "Login successful",
      user: {
        email: "student@example.com",
        role: "user"
      }
    };
  }

  return {
    success: false,
    message: "Invalid email or password"
  };
}

function validateBookingInput({ name, email, service, date, time }) {
  if (!name || !email || !service || !date || !time) {
    return {
      success: false,
      message: "All fields are required"
    };
  }

  return {
    success: true
  };
}

function createBooking(bookings, bookingData) {
  return {
    id: bookings.length + 1,
    name: bookingData.name,
    email: bookingData.email,
    service: bookingData.service,
    date: bookingData.date,
    time: bookingData.time
  };
}

function deleteBookingById(bookings, bookingId) {
  const initialLength = bookings.length;
  const updatedBookings = bookings.filter((b) => b.id !== bookingId);

  if (updatedBookings.length === initialLength) {
    return {
      success: false,
      message: "Booking not found",
      updatedBookings
    };
  }

  return {
    success: true,
    message: "Booking cancelled successfully",
    updatedBookings
  };
}

module.exports = {
  validateLogin,
  validateBookingInput,
  createBooking,
  deleteBookingById
};
