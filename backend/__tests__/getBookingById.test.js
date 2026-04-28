import { describe, test, expect } from "vitest";

const {
    getBookingById
} = require("../utils");

describe("getBookingById", () => {
    test("returns booking for valid id", () => {
        const bookings = [
            { id: 1, name: "A" },
            { id: 2, name: "B" }
        ];

        const result = getBookingById(bookings, 1);
        expect(result).toEqual({ id: 1, name: "A" });
    });

    test("returns null for non-existing id", () => {
        const bookings = [
            { id: 1, name: "A" },
            { id: 2, name: "B" }
        ];

        const result = getBookingById(bookings, 3);
        expect(result).toBeNull();
    });

    test("returns null for empty bookings array", () => {
        const bookings = [];

        const result = getBookingById(bookings, 1);
        expect(result).toBeNull();  
    });
});