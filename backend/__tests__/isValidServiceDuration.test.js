import { describe, test, expect } from "vitest";

const { isValidServiceDuration } = require("../utils");

describe("isValidServiceDuration", () => {
    const services = [
        { name: "Haircut", duration: 30 },
        { name: "Free Consultation", duration: 0 }, // <-- make it truly zero
        { name: "Deep Tissue Massage", duration: 90 }
    ];
    
    test("valid service with positive duration returns true", () => {
        expect(isValidServiceDuration("Haircut", services)).toBe(true);
    });

    test("service with zero duration returns false", () => {
        expect(isValidServiceDuration("Free Consultation", services)).toBe(false);
    });

    test("non-existing service returns false", () => {
        expect(isValidServiceDuration("NonExistingService", services)).toBe(false);
    });

});