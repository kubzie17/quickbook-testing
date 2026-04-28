import { describe, test, expect } from "vitest";

const { hasDuplicateBooking } = require("../utils");

describe("hasDuplicateBooking", () => {
    // Fix: function expects (bookings, bookingData) where bookingData
    // is an object with email, service, date, and time properties
    test("returns true for duplicate booking", () => {
        const bookings = [
            { email: "a@test.com", service: "Haircut", date: "2024-01-01", time: "10:00" }
        ];
        const newBooking = { email: "a@test.com", service: "Haircut", date: "2024-01-01", time: "10:00" };

        expect(hasDuplicateBooking(bookings, newBooking)).toBe(true);
    });

    test("returns false for non-duplicate booking", () => {
        const bookings = [
            { email: "a@test.com", service: "Haircut", date: "2024-01-01", time: "10:00" }
        ];
        const newBooking = { email: "b@test.com", service: "Haircut", date: "2024-01-01", time: "10:00" };

        expect(hasDuplicateBooking(bookings, newBooking)).toBe(false);
    });
});
