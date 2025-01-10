describe("Past Messages", () => {
  it("allows user to access past message", () => {
    // visits site
    cy.visit("/");

    // Clicks past messages link
    cy.get('a[href*="past-messages"]').click();

    //
    cy.get("#message-card-6742cc28316c92c1d7e16b60")
      .should("be.visible")
      .click();

    cy.contains("Testing");
    cy.get("button").contains("Edit");
    cy.get("button").contains("Back");
  });
});
