import { describe, test, expect } from "vitest";

const { 
    hasBookingConflict
} = require("../utils");

describe("hasBookingConflict", () => {
    test("returns true for conflicting booking", () => {
        const bookings = [
            { date: "2024-01-01", time: "10:00" },
            { date: "2024-01-01", time: "15:00" }
        ];

        expect(hasBookingConflict(bookings, "2024-01-01", "10:00")).toBe(true);
    });

    test("returns false for non-conflicting booking", () => {
        const bookings = [
            { date: "2024-01-01", time: "10:00" },
            { date: "2024-01-01", time: "15:00" }
        ];

        expect(hasBookingConflict(bookings, "2024-01-01", "12:00")).toBe(false);
    });
});