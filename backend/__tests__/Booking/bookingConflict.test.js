const {
  hasDuplicateBooking,
  hasBookingConflict,
} = require("../../utils");

const bookings = [
  { id: 1, name: "Alice", email: "alice@test.com", service: "Haircut", date: "2026-05-01", time: "10:00" },
  { id: 2, name: "Bob", email: "bob@test.com", service: "Consultation", date: "2026-05-02", time: "11:00" },
];

describe("hasDuplicateBooking", () => {
  test("returns true for duplicate", () => {
    const duplicate = { email: "alice@test.com", service: "Haircut", date: "2026-05-01", time: "10:00" };
    const result = hasDuplicateBooking(bookings, duplicate);

    expect(result).toBe(true);
  });

  test("returns false for non-duplicate", () => {
    const unique = { email: "alice@test.com", service: "Haircut", date: "2026-06-01", time: "10:00" };
    const result = hasDuplicateBooking(bookings, unique);

    expect(result).toBe(false);
  });
});

describe("hasBookingConflict", () => {
  test("returns true when date and time clash", () => {
    const conflict = { date: "2026-05-01", time: "10:00" };
    const result = hasBookingConflict(bookings, conflict);

    expect(result).toBe(true);
  });

  test("returns false when no clash", () => {
    const noConflict = { date: "2026-05-01", time: "15:00" };
    const result = hasBookingConflict(bookings, noConflict);

    expect(result).toBe(false);
  });
});
