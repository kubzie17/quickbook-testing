const {
  isValidEmail,
} = require("../utils");

describe("isValidEmail", () => {
  test("valid email returns true", () => {
    const result = isValidEmail("test@example.com");

    expect(result).toBe(true);
  });

  test("empty string returns false", () => {
    const result = isValidEmail("");

    expect(result).toBe(false);
  });

  test("null returns false", () => {
    const result = isValidEmail(null);

    expect(result).toBe(false);
  });
});
