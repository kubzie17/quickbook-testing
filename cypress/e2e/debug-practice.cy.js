// =============================================
// DEBUG PRACTICE — COUNTER TESTS
// =============================================
// These tests verify the counter component on /debug.
// Exercise 10 introduces a logic bug (count + 2 instead of count + 1)
// to demonstrate how Cypress catches BEHAVIOUR failures,
// not just missing elements.
//
// Key concept: The element exists, the click works, but the
// RESULT is wrong. This is different from a selector failure
// where Cypress can't find the element at all.

describe("Debug Practice — Counter", () => {
  // Visit the debug page before each test.
  // Each test starts fresh — no state carried over.
  beforeEach(() => {
    cy.visit("/debug");
  });

  // Sanity check — make sure the counter starts at zero.
  // If this fails, something is wrong with the initial state,
  // not with any button click logic.
  it("starts with count at 0", () => {
    cy.get('[data-testid="count-value"]').should("contain", "Count: 0");
  });

  // This is the test that catches the logic bug.
  // When count + 2 is used instead of count + 1:
  //   - Cypress finds the button ✅ (selector works)
  //   - Cypress clicks it ✅ (interaction works)
  //   - Cypress checks the result ❌ (expected "Count: 1", got "Count: 2")
  //
  // The error message tells you EXACTLY what went wrong:
  //   "expected <p> to contain Count: 1, but the text was Count: 2"
  // That points you straight to the increment function.
  it("increases count by 1 when clicking Increase", () => {
    cy.get('[data-testid="increase-count"]').click();

    // This assertion is the heart of the test.
    // It doesn't just check "did something change?" — it checks
    // "did the RIGHT thing change by the RIGHT amount?"
    cy.get('[data-testid="count-value"]').should("contain", "Count: 1");
  });

  // Verify the success message appears after clicking.
  // This tests a side effect — not just the count changing,
  // but also the feedback message updating.
  it("shows success message after increasing", () => {
    cy.get('[data-testid="increase-count"]').click();

    cy.get('[data-testid="debug-message"]')
      .should("be.visible")
      .and("contain", "Count increased successfully");
  });

  // Test the reset functionality.
  // First increase the count (so it's not already 0),
  // then reset and verify it goes back to 0.
  // Without the initial click, this test would pass even
  // if the reset button did nothing — because count was already 0.
  it("resets count back to 0", () => {
    cy.get('[data-testid="increase-count"]').click();
    cy.get('[data-testid="count-value"]').should("contain", "Count: 1");

    cy.get('[data-testid="reset-count"]').click();
    cy.get('[data-testid="count-value"]').should("contain", "Count: 0");
  });

  // Test multiple clicks to verify the counter increments correctly.
  // If the bug was count + 2, clicking 3 times would show 6 instead of 3.
  // This catches bugs that a single-click test might miss
  // (e.g. if the first click was hardcoded to return 1).
  it("increments correctly after multiple clicks", () => {
    cy.get('[data-testid="increase-count"]').click();
    cy.get('[data-testid="increase-count"]').click();
    cy.get('[data-testid="increase-count"]').click();

    cy.get('[data-testid="count-value"]').should("contain", "Count: 3");
  });
});
