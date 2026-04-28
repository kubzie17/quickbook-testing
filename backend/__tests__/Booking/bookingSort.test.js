const {
  sortBookingsByDate,
  getLatestBooking,
  getUpcomingBookings,
  groupBookingsByService,
} = require("../../utils");

const bookings = [
  { id: 1, name: "Alice", email: "alice@test.com", service: "Haircut", date: "2026-05-01", time: "10:00" },
  { id: 2, name: "Bob", email: "bob@test.com", service: "Consultation", date: "2026-05-02", time: "11:00" },
  { id: 3, name: "Alice", email: "alice@test.com", service: "Consultation", date: "2026-05-03", time: "14:00" },
];

describe("sortBookingsByDate", () => {
  test("sorts bookings in ascending date/time order", () => {
    const unsorted = [bookings[2], bookings[0], bookings[1]];
    const result = sortBookingsByDate(unsorted);

    expect(result[0].id).toBe(1);
    expect(result[1].id).toBe(2);
    expect(result[2].id).toBe(3);
  });
});

describe("getLatestBooking", () => {
  test("returns the most recent booking", () => {
    const result = getLatestBooking(bookings);

    expect(result.id).toBe(3);
  });

  test("returns null for empty array", () => {
    const result = getLatestBooking([]);

    expect(result).toBeNull();
  });
});

describe("getUpcomingBookings", () => {
  test("returns bookings on or after given date", () => {
    const result = getUpcomingBookings(bookings, "2026-05-02");

    expect(result.length).toBe(2);
  });

  test("returns empty array when no upcoming bookings", () => {
    const result = getUpcomingBookings(bookings, "2099-01-01");

    expect(result.length).toBe(0);
  });
});

describe("groupBookingsByService", () => {
  test("groups bookings correctly", () => {
    const result = groupBookingsByService(bookings);

    expect(result["Haircut"].length).toBe(1);
    expect(result["Consultation"].length).toBe(2);
  });

  test("returns empty object for empty array", () => {
    const result = groupBookingsByService([]);

    expect(result).toEqual({});
  });
});
