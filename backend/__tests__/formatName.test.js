const {
  formatName,
} = require("../utils");

describe("formatName", () => {
  test("capitalises first letter and lowercases rest", () => {
    const result = formatName("alice");

    expect(result).toBe("Alice");
  });

  test("handles all uppercase input", () => {
    const result = formatName("ALICE");

    expect(result).toBe("Alice");
  });

  test("returns empty string for null", () => {
    const result = formatName(null);

    expect(result).toBe("");
  });

  test("returns empty string for empty input", () => {
    const result = formatName("");

    expect(result).toBe("");
  });
});
