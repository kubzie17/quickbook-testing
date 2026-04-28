const {
  deleteBookingById,
  deleteBookingByName
} = require("../../utils");

describe("deleteBookingById", () => {
  test("deletes existing booking", () => {
    const bookings = [
      { id: 1, name: "A" },
      { id: 2, name: "B" },
    ];

    const result = deleteBookingById(bookings, 1);

    expect(result.success).toBe(true);
    expect(result.updatedBookings.length).toBe(1);
  });

  test("returns failure if booking not found", () => {
    const bookings = [{ id: 1, name: "A" }];

    const result = deleteBookingById(bookings, 99);

    expect(result.success).toBe(false);
    expect(result.message).toBe("Booking not found");
  });
});