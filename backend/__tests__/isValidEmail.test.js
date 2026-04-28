import { describe, test, expect } from "vitest";

const {
    isValidEmail
} = require("../utils");

describe("isValidEmail", () => {
    test("valid email returns true", () => {
        expect(isValidEmail("test@example.com")).toBe(true);
    });

    test("invalid email returns false", () => {
        expect(isValidEmail("invalid-email")).toBe(false);
    });

    test("email without @ returns false", () => {
        expect(isValidEmail("testexample.com")).toBe(false);
    });

    test("email without domain returns false", () => {
        expect(isValidEmail("test@")).toBe(false);
    });
});