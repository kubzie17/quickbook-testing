import { describe, test, expect } from "vitest";

const { isValidServiceDuration } = require("../utils");

describe("isValidServiceDuration", () => {
    const services = [
        { name: "Haircut", duration: 30 },
        { name: "Free Consultation", duration: 0 },
        { name: "Deep Tissue Massage", duration: 90 }
    ];

    // Fix: function signature is (services, serviceName, duration)
    test("valid service with correct duration returns true", () => {
        expect(isValidServiceDuration(services, "Haircut", 30)).toBe(true);
    });

    test("valid service with wrong duration returns false", () => {
        expect(isValidServiceDuration(services, "Haircut", 60)).toBe(false);
    });

    test("non-existing service returns false", () => {
        expect(isValidServiceDuration(services, "NonExistingService", 30)).toBe(false);
    });
});
