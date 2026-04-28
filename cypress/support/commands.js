// Custom command: login via the UI
Cypress.Commands.add("login", (email, password) => {
  cy.visit("/login");
  cy.get('[data-testid="login-email"]').type(email);
  cy.get('[data-testid="login-password"]').type(password);
  cy.get('[data-testid="login-submit"]').click();
});

// Custom command: create a booking via the UI
Cypress.Commands.add("createBooking", (name, email, service, date, time) => {
  cy.visit("/book");
  cy.wait("@getServices", { timeout: 20000 });
  cy.get('[data-testid="booking-name"]').type(name);
  cy.get('[data-testid="booking-email"]').type(email);
  cy.get('[data-testid="booking-service"]').select(service);
  cy.get('[data-testid="booking-date"]').type(date);
  cy.get('[data-testid="booking-time"]').type(time);
  cy.get('[data-testid="booking-submit"]').click();
});
