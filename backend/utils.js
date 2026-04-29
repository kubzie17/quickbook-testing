function isValidEmail(email) {
  if (!email) {
    return false;
  }

  return email.includes("@") && email.includes(".");
}

function formatName(name) {
  if (!name) {
    return "";
  }

  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

function isValidTimeFormat(time) {
  return /^\d{2}:\d{2}$/.test(time);
}

function isPastDate(date) {
  const today = new Date().toISOString().split("T")[0];
  return date < today;
}

function getTotalBookings(bookings) {
  return bookings.length;
}

function getBookingById(bookings, bookingId) {
  return bookings.find((booking) => booking.id === bookingId) || null;
}

function getBookingsByEmail(bookings, email) {
  return bookings.filter((booking) => booking.email === email);
}

function countBookingsByService(bookings, serviceName) {
  return bookings.filter((booking) => booking.service === serviceName).length;
}

function isValidService(service, services) {
  return services.some((item) => item.name === service);
}

function isValidServiceDuration(service, services) {
  const found = services.find((item) => item.name === service);

  if (!found) {
    return false;
  }

  return found.duration > 0;
}

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

function formatBookingSummary(booking) {
  return `${booking.name} booked ${booking.service} on ${booking.date} at ${booking.time}`;
}

function formatDetailedBooking(booking) {
  return `${booking.name} (${booking.email}) has booked a ${booking.service} on ${booking.date} at ${booking.time}`;
}

function hasDuplicateBooking(bookings, bookingData) {
  return bookings.some(
    (booking) =>
      booking.email === bookingData.email &&
      booking.service === bookingData.service &&
      booking.date === bookingData.date &&
      booking.time === bookingData.time
  );
}

function hasBookingConflict(bookings, newBooking) {
  return bookings.some(
    (booking) =>
      booking.date === newBooking.date &&
      booking.time === newBooking.time
  );
}

function isWithinWorkingHours(time) {
  const [hour] = time.split(":").map(Number);
  return hour >= 9 && hour < 17;
}

function getUpcomingBookings(bookings, date) {
  return bookings.filter((booking) => booking.date >= date);
}

function deleteBookingById(bookings, bookingId) {
  const initialLength = bookings.length;
  const updatedBookings = bookings.filter((booking) => booking.id !== bookingId);

  if (updatedBookings.length === initialLength) {
    return {
      success: false,
      message: "Booking not found",
      updatedBookings
    };
  }

  return {
    success: true,
    message: "Booking jch§§a successfully",
    updatedBookings
  };
}

function deleteBookingsByEmail(bookings, email) {
  return bookings.filter((booking) => booking.email !== email);
}

function sortBookingsByDate(bookings) {
  return [...bookings].sort((a, b) => {
    const first = `${a.date}T${a.time}`;
    const second = `${b.date}T${b.time}`;
    return first.localeCompare(second);
  });
}

function getLatestBooking(bookings) {
  if (bookings.length === 0) {
    return null;
  }

  return [...bookings].sort((a, b) => {
    const first = `${a.date}T${a.time}`;
    const second = `${b.date}T${b.time}`;
    return second.localeCompare(first);
  })[0];
}

function groupBookingsByService(bookings) {
  return bookings.reduce((acc, booking) => {
    if (!acc[booking.service]) {
      acc[booking.service] = [];
    }

    acc[booking.service].push(booking);
    return acc;
  }, {});
}

module.exports = {
  isValidEmail,
  formatName,
  isValidTimeFormat,
  isPastDate,
  getTotalBookings,
  getBookingById,
  getBookingsByEmail,
  countBookingsByService,
  isValidService,
  isValidServiceDuration,
  validateLogin,
  validateBookingInput,
  createBooking,
  formatBookingSummary,
  formatDetailedBooking,
  hasDuplicateBooking,
  hasBookingConflict,
  isWithinWorkingHours,
  getUpcomingBookings,
  deleteBookingById,
  deleteBookingsByEmail,
  sortBookingsByDate,
  getLatestBooking,
  groupBookingsByService
};
