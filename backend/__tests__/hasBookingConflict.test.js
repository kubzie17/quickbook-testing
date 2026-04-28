import { describe, test, expect } from "vitest";

const { hasBookingConflict } = require("../utils");

describe("hasBookingConflict", () => {
    // Fix: function expects (bookings, newBooking) where newBooking
    // is an object with date and time properties
    test("returns true for conflicting booking", () => {
        const bookings = [
            { date: "2024-01-01", time: "10:00" },
            { date: "2024-01-01", time: "15:00" }
        ];
        const newBooking = { date: "2024-01-01", time: "10:00" };

        expect(hasBookingConflict(bookings, newBooking)).toBe(true);
    });

    test("returns false for non-conflicting booking", () => {
        const bookings = [
            { date: "2024-01-01", time: "10:00" },
            { date: "2024-01-01", time: "15:00" }
        ];
        const newBooking = { date: "2024-01-01", time: "12:00" };

        expect(hasBookingConflict(bookings, newBooking)).toBe(false);
    });
});
