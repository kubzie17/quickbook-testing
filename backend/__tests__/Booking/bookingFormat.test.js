const {
  formatBookingSummary,
  formatDetailedBooking,
} = require("../../utils");

const booking = {
  id: 1,
  name: "Alice",
  email: "alice@test.com",
  service: "Haircut",
  date: "2026-05-01",
  time: "10:00",
};

describe("formatBookingSummary", () => {
  test("returns correct summary string", () => {
    const result = formatBookingSummary(booking);

    expect(result).toBe("Alice booked Haircut on 2026-05-01 at 10:00");
  });
});

describe("formatDetailedBooking", () => {
  test("returns correct detailed string", () => {
    const result = formatDetailedBooking(booking);

    expect(result).toBe("Alice (alice@test.com) has booked a Haircut on 2026-05-01 at 10:00");
  });
});
