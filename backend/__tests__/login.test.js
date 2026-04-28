const { 
  validateLogin,
}= require("../utils");


describe("validateLogin", () => {
  test("valid credentials return success", () => {
    const result = validateLogin("student@example.com", "Password123");

    expect(result.success).toBe(true);
    expect(result.message).toBe("Login successful");
    expect(result.user.email).toBe("student@example.com");
  });

  test("invalid credentials return failure", () => {
    const result = validateLogin("admin", "password1");

    expect(result.success).toBe(false);
    expect(result.message).toBe("Invalid email or password");
  });
});
