const {
  validateBookingInput,
} = require("../../utils");

describe("validateBookingInput", () => {
  test("valid booking passes validation", () => {
    const result = validateBookingInput({
      name: "Test",
      email: "test@example.com",
      service: "Haircut",
      date: "2026-04-20",
      time: "10:00",
    });

    expect(result.success).toBe(true);
  });

  test("missing field fails validation", () => {
    const result = validateBookingInput({
      name: "Test",
      email: "",
      service: "Haircut",
      date: "2026-04-20",
      time: "10:00",
    });

    expect(result.success).toBe(false);
    expect(result.message).toBe("All fields are required");
  });

  describe("validateBookingInput", () => {
    test("return false when night is negative", () => {
      const booking = { nights: -1 };
      const result = validateBookingInput(booking);
      
      expect(result.success).toBe(false);
    });
  });
});