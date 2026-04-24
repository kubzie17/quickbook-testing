# QuickBook Cypress Exercises

## Rules
- Work only in `cypress/e2e/quickbook.cy.js`
- Do not change the app code unless your instructor asks you to
- Start with **Core**
- Move to **Build** when you finish
- Try **Challenge** if you finish early

## Starter file
You have been given a starter Cypress file with:
- a `beforeEach()` block
- a home page test
- a successful login test

Use those as examples for the tasks below.

---

## Core Tasks

### Task 1 — Failed login
Create a test that:
- visits `/login`
- enters `student@example.com`
- enters an incorrect password
- clicks the submit button
- checks that the message says `Invalid email or password`

---

### Task 2 — Empty bookings page
Create a test that:
- visits `/bookings`
- waits for bookings to load
- checks that the empty state message is shown

Hint: there is a `data-testid` on the empty state message.

---

## Build Tasks

### Task 3 — Successful booking creation
Create a test that:
- visits `/book`
- waits for services to load
- fills in the booking form
- selects `Haircut`
- submits the form
- checks the success message

Suggested test data:
- Name: `Cypress User`
- Email: `cypress@example.com`
- Date: `2026-04-25`
- Time: `10:30`

---

### Task 4 — Booking validation failure
Create a test that:
- visits `/book`
- leaves one required field blank
- submits the form
- checks that the message says `All fields are required`

Suggested idea:
- leave the `service` field blank

---

### Task 5 — Bookings page shows a created booking
Create a test that:
- creates a booking first
- visits `/bookings`
- checks that the booking appears in the list

Suggested test data:
- Name: `List Test`
- Email: `list@example.com`
- Service: `Consultation`
- Date: `2026-04-26`
- Time: `11:00`

---

## Challenge Tasks

### Task 6 — Delete a booking
Create a test that:
- creates a booking
- visits `/bookings`
- finds the created booking
- clicks the Delete button
- checks that the delete success message is shown

Suggested test data:
- Name: `Delete Me`
- Email: `delete@example.com`
- Service: `Consultation`
- Date: `2026-04-26`
- Time: `11:00`

---

### Task 7 — Full flow test
Create one longer test that:
- loads the home page
- logs in successfully
- creates a booking
- visits `/bookings`
- confirms the booking is present
- deletes the booking
- confirms the delete message appears

---

### Task 8 — Stronger assertions
Improve one of your existing tests by adding more assertions.

Examples:
- check that a dropdown has more than one option
- check that a list exists before using it
- check the exact visible message

---

## Stretch Tasks

### Task 9 — Page structure checks
Create tests that confirm key page elements exist, for example:
- login email input
- login password input
- booking form fields
- booking submit button

---

### Task 10 — Write cleaner tests
Refactor one of your tests to make it easier to read.

Ideas:
- use clearer test names
- keep steps grouped logically
- keep assertions close to the action they verify
- Create login custom command and use 

## Extra Stretch Tasks — Fast Finishers

### Task 11 — Services dropdown options
Visit `/book` and check that the service dropdown contains:
- Haircut
- Consultation
- Follow-up Session

### Task 12 — Booking with each service
Create one booking for each service:
- Haircut
- Consultation
- Follow-up Session

### Task 13 — Confirm deleted booking disappears
After deleting a booking, assert that the deleted booking name no longer appears on the page.

### Task 14 — Use `.within()`
Find a specific booking in the bookings list and click the delete button inside that booking only. NB edit current delete tests, no need to create a new one

### Task 15 — Services page loads

Create a test that:

- visits `/services`
- checks that the page heading is visible

Expected text:
Services

---

### Task 16 — Services are displayed

Create a test that:

- visits `/services`
- waits for services to load
- checks that at least one service appears

Hint:
You can check for text like:
- Haircut
- Consultation

---

### Task 17 — Multiple services exist

Create a test that:

- visits `/services`
- checks that there is more than one list item

Hint:
Use `.find("li")` or similar

---

### Task 18 — Service details are correct

Create a test that:

- visits `/services`
- checks that a service shows BOTH:
  - a name
  - a duration

Example:
Haircut - 30 minutes

---

## Hints

### Useful routes
- `/`
- `/login`
- `/book`
- `/bookings`

### Useful selectors
- `login-email`
- `login-password`
- `login-submit`
- `login-message`
- `booking-name`
- `booking-email`
- `booking-service`
- `booking-date`
- `booking-time`
- `booking-submit`
- `booking-message`
- `bookings-list`
- `no-bookings`
- `delete-message`

### Useful Cypress commands
- `cy.visit()`
- `cy.get()`
- `cy.type()`
- `cy.click()`
- `cy.select()`
- `cy.contains()`
- `cy.wait()`
- `.should()`

---

## Checkpoints

### Checkpoint 1
You have:
- one passing failed-login test
- one passing empty-bookings test

### Checkpoint 2
You have:
- one passing booking creation test
- one passing booking validation failure test

### Checkpoint 3
You have:
- one passing delete-booking test
- at least one improved test with stronger assertions
