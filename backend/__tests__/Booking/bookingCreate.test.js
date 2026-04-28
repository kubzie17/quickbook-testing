const {
  createBooking,
} = require("../../utils");

describe("createBooking", () => {
  test("creates booking with incremented id", () => {
    const bookings = [{ id: 1, name: "A" }];

    const result = createBooking(bookings, {
      name: "B",
      email: "b@test.com",
      service: "Consultation",
      date: "2026-04-21",
      time: "11:00",
    });

    expect(result.id).toBe(2);
    expect(result.name).toBe("B");
  });
});