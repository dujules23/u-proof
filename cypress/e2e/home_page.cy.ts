describe("The Home Page", () => {
  it("successfully loads", () => {
    // Visits homepage
    cy.visit("/");

    cy.contains("form", "Sign In").should("be.visible");

    cy.contains("form", "Email:").should("be.visible");
    cy.get("#dark-mode-button").should("be.visible");
    cy.get("#submit").should("be.visible");

    // Asserts Logo  and Title of the page is visible  and correct

    cy.get("img").should("be.visible");
    cy.get("#app-name").contains("uProof").should("be.visible");
  });
});
