const {
  isPastDate,
} = require("../utils");

describe("isPastDate", () => {
  test("past date returns true", () => {
    const result = isPastDate("2020-01-01");

    expect(result).toBe(true);
  });

  test("future date returns false", () => {
    const result = isPastDate("2099-12-31");

    expect(result).toBe(false);
  });
});
