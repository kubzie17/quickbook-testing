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

  it("logs in successfully using custom command", () => {
  cy.login("student@example.com", "Password123");

  cy.wait("@postLogin", { timeout: 20000 });
  cy.get('[data-testid="login-message"]', { timeout: 20000 })
    .should("contain", "Login successful");
});

it("shows an error for failed login using custom command", () => {
  cy.login("student@example.com", "wrong");

  cy.wait("@postLogin", { timeout: 20000 });
  cy.get('[data-testid="login-message"]', { timeout: 20000 })
    .should("contain", "Invalid email or password");
});

it("increases the counter", () => {
  cy.visit("/debug");

  cy.get('[data-testid="count-value"]').should("contain", "Count: 0");
  cy.get('[data-testid="increase-count"]').click();
  cy.get('[data-testid="count-value"]').should("contain", "Count: 1");
});

it("debug page increases the counter", () => { 
  cy.visit("/debug"); 
  cy.get('[data-testid="count-value"]').should("contain", "Count: 0"); 
  cy.get('[data-testid="increase-count"]').click(); 
  cy.get('[data-testid="count-value"]').should("contain", "Count: 1"); 
}); 

it("debug page shows the typed name", () => { 
  cy.visit("/debug"); 
  cy.get('[data-testid="debug-name"]').type("Aisha"); 
  cy.get('[data-testid="name-output"]').should("contain", "Hello, Aisha"); 
}); 
});
