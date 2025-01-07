describe("The Home Page", () => {
  it("successfully loads", () => {
    // Visits homepage
    cy.visit("/");

    // Asserts Nav Links
    cy.contains("uProof").should("be.visible");
    cy.contains("Past Messages").should("be.visible");

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
});
