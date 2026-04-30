const {
  validateLogin,
  validateBookingInput,
  createBooking,
  deleteBookingById
} = require("../utils");

describe("validateLogin", () => {
  test("valid credentials return success", () => {
    const result = validateLogin("student@example.com", "Passwordabc");

    expect(result.success).toBe(true);
    expect(result.message).toBe("Login successful");
    expect(result.user.email).toBe("student@example.com");
  });

  test("invalid credentials return failure", () => {
    const result = validateLogin("student@example.com", "wrong");

    expect(result.success).toBe(false);
    expect(result.message).toBe("Invalid email or password");
  });
});

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
});

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
});

describe("deleteBookingById", () => {
  test("deletes existing booking", () => {
    const bookings = [
      { id: 1, name: "A" },
      { id: 2, name: "B" }
    ];

    const result = deleteBookingById(bookings, 1);

    expect(result.success).toBe(true);
    expect(result.updatedBookings.length).toBe(1);
  });

  test("returns failure if booking not found", () => {
    const bookings = [{ id: 1, name: "A" }];

    const result = deleteBookingById(bookings, 99);

    expect(result.success).toBe(false);
    expect(result.message).toBe("Booking not found");
  });
});
