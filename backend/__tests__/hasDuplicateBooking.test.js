import { describe, test, expect } from "vitest";

const {
    hasDuplicateBooking
} = require("../utils");

describe("hasDuplicateBooking", () => {
    test("returns true for duplicate booking", () => {
        const bookings = [
            { date: "2024-01-01", time: "10:00" },
            { date: "2024-01-01", time: "10:00" }
        ];

        expect(hasDuplicateBooking(bookings, "2024-01-01", "10:00")).toBe(true);
    });

    test("returns false for non-duplicate booking", () => {
        const bookings = [
            { date: "2024-01-01", time: "10:00" },
            { date: "2024-01-01", time: "11:00" }
        ];

        expect(hasDuplicateBooking(bookings, "2024-01-01", "10:00")).toBe(false);
    });
}); 
