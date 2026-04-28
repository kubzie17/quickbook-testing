const {
  isValidTimeFormat,
  isWithinWorkingHours,
} = require("../utils");

describe("isValidTimeFormat", () => {
  test("valid time returns true", () => {
    const result = isValidTimeFormat("10:30");

    expect(result).toBe(true);
  });

  test("single digit hour returns false", () => {
    const result = isValidTimeFormat("1:30");

    expect(result).toBe(false);
  });

  test("non-time string returns false", () => {
    const result = isValidTimeFormat("hello");

    expect(result).toBe(false);
  });
});

describe("isWithinWorkingHours", () => {
  test("09:00 is within working hours", () => {
    const result = isWithinWorkingHours("09:00");

    expect(result).toBe(true);
  });

  test("16:00 is within working hours", () => {
    const result = isWithinWorkingHours("16:00");

    expect(result).toBe(true);
  });

  test("17:00 is outside working hours", () => {
    const result = isWithinWorkingHours("17:00");

    expect(result).toBe(false);
  });

  test("08:00 is outside working hours", () => {
    const result = isWithinWorkingHours("08:00");

    expect(result).toBe(false);
  });
});
