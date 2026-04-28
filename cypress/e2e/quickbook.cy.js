describe("QuickBook E2E", () => {
  beforeEach(() => {
    // Intercept all API calls so we can wait on them and avoid flaky tests.
    // cy.intercept() sets up a "spy" on network requests matching the pattern.
    // .as() gives it an alias we can reference later with cy.wait("@alias").
    cy.intercept("GET", "https://quickbook-testing.onrender.com/services").as("getServices");
    cy.intercept("POST", "https://quickbook-testing.onrender.com/login").as("postLogin");
    cy.intercept("POST", "https://quickbook-testing.onrender.com/bookings").as("postBooking");
    cy.intercept("GET", "https://quickbook-testing.onrender.com/bookings").as("getBookings");
    cy.intercept("DELETE", /https:\/\/quickbook-testing\.onrender\.com\/bookings\/\d+/).as("deleteBooking");
  });

  // =============================================
  // STARTER TESTS (provided)
  // =============================================

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

    // Longer timeout for this test — it often runs first and hits
    // the Render cold start (free tier takes ~30s to wake up)
    cy.wait("@postLogin", { timeout: 60000 });
    cy.get('[data-testid="login-message"]', { timeout: 20000 })
      .should("contain", "Login successful");
  });

  // =============================================
  // CORE TASKS
  // =============================================

  // Task 1 — Failed login
  // Key concept: We use the CORRECT email but WRONG password.
  // The exercise specifically says student@example.com with an incorrect password.
  it("Task 1: fails to log in with wrong password", () => {
    cy.visit("/login");

    cy.get('[data-testid="login-email"]').type("student@example.com");
    cy.get('[data-testid="login-password"]').type("WrongPassword!");
    cy.get('[data-testid="login-submit"]').click();

    cy.wait("@postLogin", { timeout: 20000 });
    cy.get('[data-testid="login-message"]', { timeout: 20000 })
      .should("contain", "Invalid email or password");
  });

  // Task 2 — Empty bookings page
  // Key concept: We use cy.intercept() to STUB the response, returning
  // an empty array. This makes the test independent of server state —
  // it doesn't matter if other tests or users have created bookings.
  // This is called "mocking" or "stubbing" a network response.
  it("Task 2: shows empty state when no bookings exist", () => {
    cy.intercept("GET", "https://quickbook-testing.onrender.com/bookings", []).as("getEmptyBookings");

    cy.visit("/bookings");

    cy.wait("@getEmptyBookings", { timeout: 20000 });
    cy.get('[data-testid="no-bookings"]', { timeout: 20000 })
      .should("be.visible")
      .and("contain", "No bookings found");
  });

  // =============================================
  // BUILD TASKS
  // =============================================

  // Task 3 — Successful booking creation
  // Key concept: We wait for services to load BEFORE interacting with the
  // dropdown, otherwise Cypress might try to select an option that doesn't
  // exist yet.
  it("Task 3: creates a booking successfully", () => {
    cy.visit("/book");

    cy.wait("@getServices", { timeout: 20000 });

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

  // Task 4 — Booking validation failure
  // Key concept: We deliberately leave the service field blank (empty string)
  // to trigger server-side validation. The backend checks all fields are present.
  it("Task 4: shows validation error when a field is missing", () => {
    cy.visit("/book");

    cy.wait("@getServices", { timeout: 20000 });

    cy.get('[data-testid="booking-name"]').type("Incomplete User");
    cy.get('[data-testid="booking-email"]').type("incomplete@example.com");
    // Deliberately skip selecting a service
    cy.get('[data-testid="booking-date"]').type("2026-04-25");
    cy.get('[data-testid="booking-time"]').type("10:00");
    cy.get('[data-testid="booking-submit"]').click();

    cy.wait("@postBooking", { timeout: 20000 });
    cy.get('[data-testid="booking-message"]', { timeout: 20000 })
      .should("contain", "All fields are required");
  });

  // Task 5 — Bookings page shows a created booking
  // Key concept: We create a booking first, then navigate to /bookings
  // and verify it appears. This uses the custom command we defined.
  it("Task 5: shows a created booking in the bookings list", () => {
    cy.createBooking("List Test", "list@example.com", "Consultation", "2026-04-26", "11:00");

    cy.wait("@postBooking", { timeout: 20000 });
    cy.get('[data-testid="booking-message"]', { timeout: 20000 })
      .should("contain", "Booking created successfully");

    cy.visit("/bookings");
    cy.wait("@getBookings", { timeout: 20000 });

    cy.get('[data-testid="bookings-list"]', { timeout: 20000 })
      .should("contain", "List Test")
      .and("contain", "Consultation");
  });

  // =============================================
  // CHALLENGE TASKS
  // =============================================

  // Task 6 — Delete a booking
  // Key concept: Instead of hardcoding a booking ID (which is fragile),
  // we create a booking, go to the list, find it by name, then use
  // .within() to click the Delete button inside THAT specific list item.
  it("Task 6: deletes a booking successfully", () => {
    cy.createBooking("Delete Me", "delete@example.com", "Consultation", "2026-04-26", "11:00");

    cy.wait("@postBooking", { timeout: 20000 });
    cy.get('[data-testid="booking-message"]', { timeout: 20000 })
      .should("contain", "Booking created successfully");

    cy.visit("/bookings");
    cy.wait("@getBookings", { timeout: 20000 });

    // Find the list item containing "Delete Me" and click its Delete button
    cy.get('[data-testid="bookings-list"]', { timeout: 20000 })
      .contains("li", "Delete Me")
      .within(() => {
        cy.get("button").click();
      });

    cy.wait("@deleteBooking", { timeout: 20000 });
    cy.get('[data-testid="delete-message"]', { timeout: 20000 })
      .should("contain", "Booking cancelled successfully");
  });

  // Task 7 — Full flow test
  // Key concept: This is an integration test that chains multiple user
  // actions together. It proves the whole happy path works end-to-end.
  it("Task 7: full flow — login, book, verify, delete", () => {
    // Step 1: Login
    cy.visit("/login");
    cy.get('[data-testid="login-email"]').type("student@example.com");
    cy.get('[data-testid="login-password"]').type("Password123");
    cy.get('[data-testid="login-submit"]').click();
    cy.wait("@postLogin", { timeout: 20000 });
    cy.get('[data-testid="login-message"]', { timeout: 20000 })
      .should("contain", "Login successful");

    // Step 2: Create a booking
    cy.visit("/book");
    cy.wait("@getServices", { timeout: 20000 });
    cy.get('[data-testid="booking-name"]').type("Flow Test");
    cy.get('[data-testid="booking-email"]').type("flow@example.com");
    cy.get('[data-testid="booking-service"]').select("Haircut");
    cy.get('[data-testid="booking-date"]').type("2026-04-27");
    cy.get('[data-testid="booking-time"]').type("14:00");
    cy.get('[data-testid="booking-submit"]').click();
    cy.wait("@postBooking", { timeout: 20000 });
    cy.get('[data-testid="booking-message"]', { timeout: 20000 })
      .should("contain", "Booking created successfully");

    // Step 3: Verify booking appears in list
    cy.visit("/bookings");
    cy.wait("@getBookings", { timeout: 20000 });
    cy.get('[data-testid="bookings-list"]', { timeout: 20000 })
      .should("contain", "Flow Test");

    // Step 4: Delete the booking
    cy.get('[data-testid="bookings-list"]')
      .contains("li", "Flow Test")
      .within(() => {
        cy.get("button").click();
      });

    cy.wait("@deleteBooking", { timeout: 20000 });
    cy.get('[data-testid="delete-message"]', { timeout: 20000 })
      .should("contain", "Booking cancelled successfully");
  });

  // Task 8 — Stronger assertions
  // Key concept: .should() can chain multiple assertions. This makes tests
  // more robust — if ANY assertion fails, the test fails with a clear message.
  it("Task 8: booking creation with stronger assertions", () => {
    cy.visit("/book");
    cy.wait("@getServices", { timeout: 20000 });

    // Check the dropdown has more than just the placeholder option
    cy.get('[data-testid="booking-service"]')
      .find("option")
      .should("have.length.greaterThan", 1);

    // Check specific services exist in the dropdown
    cy.get('[data-testid="booking-service"]').should("contain", "Haircut");
    cy.get('[data-testid="booking-service"]').should("contain", "Consultation");

    // Fill and submit
    cy.get('[data-testid="booking-name"]').type("Strong Test");
    cy.get('[data-testid="booking-email"]').type("strong@example.com");
    cy.get('[data-testid="booking-service"]').select("Follow-up Session");
    cy.get('[data-testid="booking-date"]').type("2026-04-28");
    cy.get('[data-testid="booking-time"]').type("09:00");
    cy.get('[data-testid="booking-submit"]').click();

    cy.wait("@postBooking", { timeout: 20000 });

    // Check the exact message text and that it's visible
    cy.get('[data-testid="booking-message"]', { timeout: 20000 })
      .should("be.visible")
      .and("have.text", "Booking created successfully");
  });

  // =============================================
  // STRETCH TASKS
  // =============================================

  // Task 9 — Page structure checks
  // Key concept: These tests verify the DOM structure exists without
  // performing any actions. Good for catching broken layouts or missing elements.
  it("Task 9: login page has required form elements", () => {
    cy.visit("/login");

    cy.get('[data-testid="login-email"]').should("exist").and("be.visible");
    cy.get('[data-testid="login-password"]').should("exist").and("be.visible");
    cy.get('[data-testid="login-submit"]').should("exist").and("be.visible");
  });

  it("Task 9: booking page has required form elements", () => {
    cy.visit("/book");
    cy.wait("@getServices", { timeout: 20000 });

    cy.get('[data-testid="booking-name"]').should("exist").and("be.visible");
    cy.get('[data-testid="booking-email"]').should("exist").and("be.visible");
    cy.get('[data-testid="booking-service"]').should("exist").and("be.visible");
    cy.get('[data-testid="booking-date"]').should("exist").and("be.visible");
    cy.get('[data-testid="booking-time"]').should("exist").and("be.visible");
    cy.get('[data-testid="booking-submit"]').should("exist").and("be.visible");
  });

  // Task 10 — Cleaner tests using custom commands
  // Key concept: Custom commands (defined in commands.js) abstract away
  // repetitive steps. cy.login() and cy.createBooking() make tests
  // much easier to read at a glance.
  it("Task 10: clean full flow using custom commands", () => {
    // Login using custom command
    cy.login("student@example.com", "Password123");
    cy.wait("@postLogin", { timeout: 20000 });
    cy.get('[data-testid="login-message"]', { timeout: 20000 })
      .should("contain", "Login successful");

    // Create booking using custom command
    cy.createBooking("Clean Test", "clean@example.com", "Haircut", "2026-04-29", "15:00");
    cy.wait("@postBooking", { timeout: 20000 });
    cy.get('[data-testid="booking-message"]', { timeout: 20000 })
      .should("contain", "Booking created successfully");

    // Verify booking exists
    cy.visit("/bookings");
    cy.wait("@getBookings", { timeout: 20000 });
    cy.get('[data-testid="bookings-list"]', { timeout: 20000 })
      .should("contain", "Clean Test");
  });

  // =============================================
  // EXTRA STRETCH TASKS
  // =============================================

  // Task 11 — Services dropdown options
  // Key concept: We check the dropdown contains all three expected services.
  // This catches issues where the API returns incomplete data.
  it("Task 11: service dropdown contains all expected services", () => {
    cy.visit("/book");
    cy.wait("@getServices", { timeout: 20000 });

    cy.get('[data-testid="booking-service"]').should("contain", "Haircut");
    cy.get('[data-testid="booking-service"]').should("contain", "Consultation");
    cy.get('[data-testid="booking-service"]').should("contain", "Follow-up Session");
  });

  // Task 12 — Booking with each service
  // Key concept: We test each service individually to make sure they all
  // work. If one service has a bug, this test will catch it.
  it("Task 12: creates a booking for each service", () => {
    const services = ["Haircut", "Consultation", "Follow-up Session"];

    services.forEach((service) => {
      cy.visit("/book");
      cy.wait("@getServices", { timeout: 20000 });

      cy.get('[data-testid="booking-name"]').type("Multi Service");
      cy.get('[data-testid="booking-email"]').type("multi@example.com");
      cy.get('[data-testid="booking-service"]').select(service);
      cy.get('[data-testid="booking-date"]').type("2026-04-30");
      cy.get('[data-testid="booking-time"]').type("10:00");
      cy.get('[data-testid="booking-submit"]').click();

      cy.wait("@postBooking", { timeout: 20000 });
      cy.get('[data-testid="booking-message"]', { timeout: 20000 })
        .should("contain", "Booking created successfully");
    });
  });

  // Task 13 — Confirm deleted booking disappears
  // Key concept: After deleting, we assert the booking name is no longer
  // anywhere on the page. .should("not.exist") waits for the element to
  // be removed from the DOM entirely.
  it("Task 13: deleted booking disappears from the list", () => {
    cy.createBooking("Vanish Test", "vanish@example.com", "Haircut", "2026-04-25", "16:00");

    cy.wait("@postBooking", { timeout: 20000 });
    cy.get('[data-testid="booking-message"]', { timeout: 20000 })
      .should("contain", "Booking created successfully");

    cy.visit("/bookings");
    cy.wait("@getBookings", { timeout: 20000 });

    cy.get('[data-testid="bookings-list"]', { timeout: 20000 })
      .contains("li", "Vanish Test")
      .within(() => {
        cy.get("button").click();
      });

    cy.wait("@deleteBooking", { timeout: 20000 });

    // After deletion, the name should no longer appear in the list
    cy.get('[data-testid="bookings-list"]').should("not.contain", "Vanish Test");
  });

  // Task 14 — Use .within()
  // Key concept: .within() scopes all Cypress commands to a specific DOM
  // element. This is crucial when multiple bookings exist — you want to
  // click the delete button for a SPECIFIC booking, not just any delete button.
  it("Task 14: uses .within() to delete a specific booking", () => {
    // Create two bookings so the list has multiple items
    cy.createBooking("Keep Me", "keep@example.com", "Haircut", "2026-04-25", "09:00");
    cy.wait("@postBooking", { timeout: 20000 });

    cy.createBooking("Remove Me", "remove@example.com", "Consultation", "2026-04-25", "10:00");
    cy.wait("@postBooking", { timeout: 20000 });

    cy.visit("/bookings");
    cy.wait("@getBookings", { timeout: 20000 });

    // Use .within() to scope the delete click to only the "Remove Me" booking
    cy.get('[data-testid="bookings-list"]', { timeout: 20000 })
      .contains("li", "Remove Me")
      .within(() => {
        cy.get("button").click();
      });

    cy.wait("@deleteBooking", { timeout: 20000 });
    cy.get('[data-testid="delete-message"]', { timeout: 20000 })
      .should("contain", "Booking cancelled successfully");

    // "Keep Me" should still be in the list
    cy.get('[data-testid="bookings-list"]').should("contain", "Keep Me");
  });

  // Task 15 — Services page loads
  // Key concept: Simple smoke test — does the page render with the
  // expected heading?
  it("Task 15: services page loads with heading", () => {
    cy.visit("/services");

    cy.contains("h2", "Services").should("be.visible");
  });

  // Task 16 — Services are displayed
  // Key concept: We wait for the API response, then check that at least
  // one service name appears on the page.
  it("Task 16: services page displays at least one service", () => {
    cy.visit("/services");
    cy.wait("@getServices", { timeout: 20000 });

    cy.contains("Haircut").should("be.visible");
  });

  // Task 17 — Multiple services exist
  // Key concept: .find("li") gets all list items inside the element.
  // .should("have.length.greaterThan", 1) asserts there are at least 2.
  it("Task 17: services page shows more than one service", () => {
    cy.visit("/services");
    cy.wait("@getServices", { timeout: 20000 });

    cy.get("ul")
      .find("li")
      .should("have.length.greaterThan", 1);
  });

  // Task 18 — Service details are correct
  // Key concept: We check that each service item shows both a name AND
  // a duration. The app renders them as "Haircut - 30 minutes".
  it("Task 18: service items show name and duration", () => {
    cy.visit("/services");
    cy.wait("@getServices", { timeout: 20000 });

    // Check that at least one service item contains both a name and duration
    cy.get('[data-testid="service-item"]').first()
      .should("contain", "Haircut")
      .and("contain", "30 minutes");

    // Verify all service items have the expected format
    cy.get('[data-testid="service-item"]').each(($item) => {
      cy.wrap($item).should("contain", "minutes");
    });
  });
});
