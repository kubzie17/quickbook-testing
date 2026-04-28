import { describe, test, expect } from "vitest";

const { validateLogin } = require("../utils");

describe("validateLogin", () => {
  test("valid credentials return success", () => {
    const result = validateLogin("student@example.com", "Password123");

    expect(result.success).toBe(true);
    expect(result.message).toBe("Login successful");
    expect(result.user.email).toBe("student@example.com");
  });

  test("invalid credentials return failure", () => {
    const result = validateLogin("student@example.com", "wrong");

    expect(result.success).toBe(false);
    expect(result.message).toBe("Invalid email or password");
  });

  test("exisiting user with wrong password returns failure", () => {
    const result = validateLogin("student@example.com", "wrong");

    expect(result.success).toBe(false);
    expect(result.message).toBe("Invalid email or password");
  });

  test("missing email return failure", () => {
    const result = validateLogin("", "Password123");

    expect(result.success).toBe(false);
    expect(result.message).toBe("Invalid email or password");
  });

  test("missing password return failure", () => {
    const result = validateLogin("student@example.com", "");
    
    expect(result.success).toBe(false);
    expect(result.message).toBe("Invalid email or password");
  });

  test("non-existing user returns failure", () => {
    const result = validateLogin("nonexistent@example.com", "Password123");

    expect(result.success).toBe(false);
    expect(result.message).toBe("Invalid email or password");
  });

  test("existing user with correct password returns success", () => {
    const result = validateLogin("student@example.com", "Password123");

    expect(result.success).toBe(true);
    expect(result.message).toBe("Login successful");
    expect(result.user.email).toBe("student@example.com");
  });
/*
  test("admin user with correct password returns success", () => {
    const result = validateLogin("admin", "password1");

    expect(result.success).toBe(true);
    expect(result.message).toBe("Login successful");
    expect(result.user.email).toBe("admin");
  });*/

});