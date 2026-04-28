import { describe, test, expect } from "vitest";

const {
  deleteBookingByName
} = require("../utils");

describe("deleteBookingByName", () => {
  test("deletes existing booking", () => {
    const bookings = [
      { id: 1, name: "A" },
      { id: 2, name: "B" }
    ];

    const result = deleteBookingByName(bookings, "A");

    expect(result.success).toBe(true);
    expect(result.updatedBookings.length).toBe(1);
  });

    test("returns failure if booking not found", () => {
    const bookings = [{ id: 1, name: "A" }];

    const result = deleteBookingByName(bookings, "Z");

    expect(result.success).toBe(false);
    expect(result.message).toBe("Booking not found");
  });

  test("deletes correct booking", () => {
    const bookings = [
      { id: 1, name: "A" },
      { id: 2, name: "B" },
      { id: 3, name: "C" }
    ];

    const result = deleteBookingByName(bookings, "B");
    
    expect(result.success).toBe(true);
    expect(result.updatedBookings.length).toBe(2);
    expect(result.updatedBookings.find(b => b.name === "B")).toBeUndefined();
  });

});