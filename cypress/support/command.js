cypress.commands.add("login", (email, password) => {
    cy.visit("/login");
    cy.get('[data-testid="login-email"]').type(email);
    cy.get('[data-testid="login-password"]').type(password);
    cy.get('[data-testid="login-submit"]').click();
  });

  cy.intercept("POST", "/api/login").as("postLogin");
  cy.intercept("POST", "/api/bookings").as("postBooking");
  cy.intercept("DELETE", "/api/bookings/*").as("deleteBooking");
  cy.intercept("GET", "/api/bookings").as("getBookings");

Cypress.Commands.add("createBooking", (name, email, service, date, time) => {
  cy.visit("/book");
  cy.get('[data-testid="booking-name"]').type(name);
  cy.get('[data-testid="booking-email"]').type(email);
  cy.get('[data-testid="booking-service"]').select(service);
  cy.get('[data-testid="booking-date"]').type(date);
  cy.get('[data-testid="booking-time"]').type(time);
  cy.get('[data-testid="booking-submit"]').click();
});

Cypress.Commands.add("deleteBooking", (bookingId) => {
  cy.request("DELETE", `https://quickbook-testing.onrender.com/bookings/${bookingId}`);
});

Cypress.Commands.add("getBookings", () => {
  return cy.request("GET", "https://quickbook-testing.onrender.com/bookings");
});