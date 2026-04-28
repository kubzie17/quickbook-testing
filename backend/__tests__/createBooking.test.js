import { describe, test, expect } from "vitest";

const {
  createBooking
} = require("../utils");

describe("createBooking", () => {
  test("creates booking with incremented id", () => {
    const bookings = [{ id: 1, name: "A" }];

    const result = createBooking(bookings, {
      name: "B",
      email: "b@test.com",
      service: "Consultation",
      date: "2026-04-21",
      time: "11:00"
    });

    expect(result.id).toBe(2);
    expect(result.name).toBe("B");
  });

    test("creates booking with correct data", () => {
    const bookings = [];

    const result = createBooking(bookings, {
      name: "C",
      email: "c@test.com",
      service: "Treatment",
      date: "2026-04-22",
      time: "12:00"
    });

    expect(result.id).toBe(1);
    expect(result.name).toBe("C");
  });

  test("anything with 0 or less night duration is invalid", () => {
    const bookings = [{ id: 1, name: "A" }];

    const result = createBooking(bookings, {
      name: "D",
      email: "d@test.com",
      service: "Treatment",
      date: "2026-04-23",
      time: "13:00"
    });

    expect(result.id).toBe(2);
    expect(result.name).toBe("D");
  });

});