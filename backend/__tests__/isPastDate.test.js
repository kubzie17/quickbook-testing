import { describe, test, expect } from "vitest";

const {
    isPastDate
} = require("../utils");

describe("isPastDate", () => {
   test("returns true for past dates", () => {
        expect(isPastDate("2020-01-01")).toBe(true);
    });

    test("returns false for future dates", () => {
        expect(isPastDate("2028-01-01")).toBe(false);
    });

    test("returns false for today's date", () => {
        const today = new Date().toISOString().split("T")[0];
        expect(isPastDate(today)).toBe(false);
    });
});