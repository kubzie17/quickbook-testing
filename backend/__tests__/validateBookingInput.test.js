import { describe, test, expect } from "vitest";

const { validateBookingInput } = require("../utils");

describe("validateBookingInput", () => {
  test("valid booking passes validation", () => {
    const result = validateBookingInput({
      name: "Test",
      email: "test@example.com",
      service: "Haircut",
      date: "2026-04-20",
      time: "10:00"
    });

    expect(result.success).toBe(true);
  });

  test("missing field fails validation", () => {
    const result = validateBookingInput({
      name: "Test",
      email: "",
      service: "Haircut",
      date: "2026-04-20",
      time: "10:00"
    });

    expect(result.success).toBe(false);
    expect(result.message).toBe("All fields are required");
  });

    test("all fields missing fails validation", () => {
    const result = validateBookingInput({
      name: "",
      email: "",
      service: "",
      date: "",
      time: ""
    });

    expect(result.success).toBe(false);
    expect(result.message).toBe("All fields are required");
  });

  test("partial missing fields fails validation", () => {
    const result = validateBookingInput({
      name: "Test",
      email: "",
      service: "Haircut",
      date: "",
      time: "10:00"
    });

    expect(result.success).toBe(false);
    expect(result.message).toBe("All fields are required");
  });   

  test("valid booking with extra fields still passes validation", () => {
    const result = validateBookingInput({
      name: "Test",
      email: "test@example.com",
      service: "Haircut",
      date: "2026-04-20",
      time: "10:00",
      extraField: "extraValue"
    });

    expect(result.success).toBe(true);
  });

});