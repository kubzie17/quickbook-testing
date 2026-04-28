const {
  getTotalBookings,
  getBookingById,
  getBookingsByEmail,
  countBookingsByService,
} = require("../../utils");

const bookings = [
  { id: 1, name: "Alice", email: "alice@test.com", service: "Haircut", date: "2026-05-01", time: "10:00" },
  { id: 2, name: "Bob", email: "bob@test.com", service: "Consultation", date: "2026-05-02", time: "11:00" },
  { id: 3, name: "Alice", email: "alice@test.com", service: "Consultation", date: "2026-05-03", time: "14:00" },
];

describe("getTotalBookings", () => {
  test("returns correct count", () => {
    const result = getTotalBookings(bookings);

    expect(result).toBe(3);
  });

  test("returns 0 for empty array", () => {
    const result = getTotalBookings([]);

    expect(result).toBe(0);
  });
});

describe("getBookingById", () => {
  test("returns booking when found", () => {
    const result = getBookingById(bookings, 2);

    expect(result.name).toBe("Bob");
  });

  test("returns null when not found", () => {
    const result = getBookingById(bookings, 99);

    expect(result).toBeNull();
  });
});

describe("getBookingsByEmail", () => {
  test("returns all bookings for email", () => {
    const result = getBookingsByEmail(bookings, "alice@test.com");

    expect(result.length).toBe(2);
  });

  test("returns empty array for unknown email", () => {
    const result = getBookingsByEmail(bookings, "nobody@test.com");

    expect(result).toEqual([]);
  });
});

describe("countBookingsByService", () => {
  test("returns correct count for service", () => {
    const result = countBookingsByService(bookings, "Consultation");

    expect(result).toBe(2);
  });

  test("returns 0 for unknown service", () => {
    const result = countBookingsByService(bookings, "Massage");

    expect(result).toBe(0);
  });
});
