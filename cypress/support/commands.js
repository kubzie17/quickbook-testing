Cypress.Commands.add("login", (email, password) => {
  cy.visit("/login");

  cy.get('[data-testid="login-email"]').type(email);
  cy.get('[data-testid="login-password"]').type(password);
  cy.get('[data-testid="login-submit"]').click();
});
