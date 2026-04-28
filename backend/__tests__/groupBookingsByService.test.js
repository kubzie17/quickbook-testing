import { describe, test, expect } from "vitest";

const {
    groupBookingsByService
} = require("../utils");

describe("groupBookingsByService function", () => {
    test("groups bookings by service", () => {
        const bookings = [
            { id: 1, service: "Haircut", date: "2024-01-01" },
            { id: 2, service: "Massage", date: "2024-01-02" },
            { id: 3, service: "Haircut", date: "2024-01-03" }
        ];
        
        const result = groupBookingsByService(bookings);
        expect(result).toEqual({
            "Haircut": [
                { id: 1, service: "Haircut", date: "2024-01-01" },
                { id: 3, service: "Haircut", date: "2024-01-03" }
            ],
            "Massage": [
                { id: 2, service: "Massage", date: "2024-01-02" }
            ]
        });
    });

    test("returns empty object for empty bookings array", () => {
        const bookings = [];
        const result = groupBookingsByService(bookings);
        expect(result).toEqual({});
    });
});
        