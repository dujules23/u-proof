describe("Create Message Request", () => {
  it("creates message using the form", () => {
    // Visits application
    cy.visit("/");

    // Fills out Message form
    cy.get("#name").type("Samuel B.");
    cy.get("#email").type("email@email.com");
    cy.get("#locations").select("Florence");
    cy.get("#ministry").select("Music");
    cy.get("#subject").type("New Rehearsal Times This Week!");
    cy.get("#message").type(
      "Hello team! There are new times for rehearsal this week. On Monday we will have a 5pm rehearsal in preparation for the Birthday Sunday celebration. Try to arrive at 4:30pm to make sure sound check is done. Thanks! "
    );

    // Clicks Send Message button
    cy.get("#action-button").click();

    cy.wait(200);

    //Asserts Success Toast and message
    cy.get("li").contains("Message sent for review!");
  });
});
