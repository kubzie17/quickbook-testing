describe("QuickBook E2E", () => {
  beforeEach(() => {
    cy.intercept("GET", "https://quickbook-testing.onrender.com/services").as("getServices");
    cy.intercept("POST", "https://quickbook-testing.onrender.com/login").as("postLogin");
    cy.intercept("POST", "https://quickbook-testing.onrender.com/bookings").as("postBooking");
    cy.intercept("GET", "https://quickbook-testing.onrender.com/bookings").as("getBookings");
    cy.intercept("DELETE", /https:\/\/quickbook-testing\.onrender\.com\/bookings\/\d+/).as("deleteBooking");
  });

  it("loads the home page", () => {
    cy.visit("/");
    cy.contains("QuickBook");
    cy.contains("Welcome to QuickBook");
  });

  it("logs in successfully", () => {
    cy.visit("/login");

    cy.get('[data-testid="login-email"]').type("student@example.com");
    cy.get('[data-testid="login-password"]').type("Password123");
    cy.get('[data-testid="login-submit"]').click();

    cy.wait("@postLogin", { timeout: 20000 });
    cy.get('[data-testid="login-message"]', { timeout: 20000 })
      .should("contain", "Login successful");
  });

  it("shows an error for failed login", () => {
    cy.visit("/login");

    cy.get('[data-testid="login-email"]').type("student@example.com");
    cy.get('[data-testid="login-password"]').type("wrong");
    cy.get('[data-testid="login-submit"]').click();

    cy.wait("@postLogin", { timeout: 20000 });
    cy.get('[data-testid="login-message"]', { timeout: 20000 })
      .should("contain", "Invalid email or password");
  });

  it("creates a booking successfully", () => {
    cy.visit("/book");

    cy.wait("@getServices", { timeout: 20000 });
    cy.get('[data-testid="booking-service"] option', { timeout: 20000 })
      .should("have.length.greaterThan", 1);

    cy.get('[data-testid="booking-name"]').type("Cypress User");
    cy.get('[data-testid="booking-email"]').type("cypress@example.com");
    cy.get('[data-testid="booking-service"]').select("Haircut");
    cy.get('[data-testid="booking-date"]').type("2026-04-25");
    cy.get('[data-testid="booking-time"]').type("10:30");
    cy.get('[data-testid="booking-submit"]').click();

    cy.wait("@postBooking", { timeout: 20000 });
    cy.get('[data-testid="booking-message"]', { timeout: 20000 })
      .should("contain", "Booking created successfully");
  });

  it("deletes a booking from My Bookings", () => {
    cy.visit("/book");

    cy.wait("@getServices", { timeout: 20000 });
    cy.get('[data-testid="booking-service"] option', { timeout: 20000 })
      .should("have.length.greaterThan", 1);

    cy.get('[data-testid="booking-name"]').type("Delete Me");
    cy.get('[data-testid="booking-email"]').type("delete@example.com");
    cy.get('[data-testid="booking-service"]').select("Consultation");
    cy.get('[data-testid="booking-date"]').type("2026-04-26");
    cy.get('[data-testid="booking-time"]').type("11:00");
    cy.get('[data-testid="booking-submit"]').click();

    cy.wait("@postBooking", { timeout: 20000 });

    cy.visit("/bookings");
    cy.wait("@getBookings", { timeout: 20000 });

    cy.contains("Delete Me", { timeout: 20000 }).should("exist");
    cy.contains("Delete Me")
      .parent()
      .find("button")
      .click();

    cy.wait("@deleteBooking", { timeout: 20000 });
    cy.get('[data-testid="delete-message"]', { timeout: 20000 })
      .should("contain", "Booking cancelled successfully");
  });
});