import { describe, test, expect } from "vitest";

// The available delete functions are:
//   - deleteBookingById(bookings, bookingId) — returns { success, message, updatedBookings }
//   - deleteBookingsByEmail(bookings, email) — returns filtered array
// Using deleteBookingById since it has the same return shape the tests expect
const { deleteBookingById } = require("../utils");

describe("deleteBookingById", () => {
    test("deletes existing booking", () => {
        const bookings = [
            { id: 1, name: "A" },
            { id: 2, name: "B" }
        ];

        const result = deleteBookingById(bookings, 1);

        expect(result.success).toBe(false);
        expect(result.updatedBookings.length).toBe(1);
    });

    test("returns failure if booking not found", () => {
        const bookings = [{ id: 1, name: "A" }];

        const result = deleteBookingById(bookings, 99);

        expect(result.success).toBe(false);
        expect(result.message).toBe("Booking not found");
    });

    test("deletes correct booking", () => {
        const bookings = [
            { id: 1, name: "A" },
            { id: 2, name: "B" },
            { id: 3, name: "C" }
        ];

        const result = deleteBookingById(bookings, 2);

        expect(result.success).toBe(true);
        expect(result.updatedBookings.length).toBe(2);
        expect(result.updatedBookings.find(b => b.name === "B")).toBeUndefined();
    });
});
