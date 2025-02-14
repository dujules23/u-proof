describe("Login", () => {
  // beforeEach(() => {
  //   cy.login("email@email.com");
  // });

  it("stops user from accessing pages without logging in", () => {
    cy.visit("/past-messages");

    cy.contains("form", "Sign In").should("be.visible");
  });

  it("logs in the user", () => {
    cy.login("email@email.com");

    // Asserts Nav Links
    cy.contains("uProof").should("be.visible");
    cy.contains("Past Messages").should("be.visible");
    cy.contains("Log Out").should("be.visible");

    // Asserts Message for form
    cy.contains("Submit Your Message").should("be.visible");

    // Asserts Message form
    cy.contains("Name").should("be.visible");
    cy.contains("Email").should("be.visible");
    cy.contains("Locations").should("be.visible");
    cy.contains("Ministry").should("be.visible");
    cy.contains("Subject").should("be.visible");
    cy.contains("Message").should("be.visible");

    // Asserts Submit button
    cy.contains("Send Message").should("be.visible");
  });

  it("logs out the user", () => {
    cy.login("email@email.com");

    cy.get("#logout").click();

    cy.contains("form", "Sign In").should("be.visible");
  });

  it("shows error for unauthorized user", () => {
    cy.login("test@email.com");

    cy.get("#error-message")
      .contains("User not found. Please check your login details.")
      .should("be.visible");
  });
});
