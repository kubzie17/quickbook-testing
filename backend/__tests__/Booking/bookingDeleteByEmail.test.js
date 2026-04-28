const {
  deleteBookingsByEmail,
} = require("../../utils");

describe("deleteBookingsByEmail", () => {
  test("removes all bookings for given email", () => {
    const bookings = [
      { id: 1, name: "Alice", email: "alice@test.com" },
      { id: 2, name: "Bob", email: "bob@test.com" },
      { id: 3, name: "Alice", email: "alice@test.com" },
    ];

    const result = deleteBookingsByEmail(bookings, "alice@test.com");

    expect(result.length).toBe(1);
    expect(result[0].name).toBe("Bob");
  });

  test("returns all bookings if email not found", () => {
    const bookings = [
      { id: 1, name: "Alice", email: "alice@test.com" },
    ];

    const result = deleteBookingsByEmail(bookings, "nobody@test.com");

    expect(result.length).toBe(1);
  });
});
