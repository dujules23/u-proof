describe("Change Dark Mode", () => {
  it("changes the mode from button click", () => {
    // Visits application
    cy.visit("/");

    // Timer so that app can track users dark mode settings on their machine.
    cy.wait(300);

    // cy.get("body").should("have.css", "bg-primary-dark");

    // User clicks the dark mode button, changing the mode of the app
    cy.get("#dark-mode-button").click();

    // Assert background of app has changed.
    // cy.get("#secondary-default-container").should(
    //   "have.css",
    //   "bg-primary-light"
    // );
  });
});
