describe("Support Page", () => {
  beforeEach(() => {
    cy.login("email@email.com");
  });

  it("allows user to access support page", () => {
    // visits site
    cy.visit("/support");
  });

  it("allows user to click the support link from the nav bar", () => {
    // Clicks Support link in nav bar
    cy.get("#support-link").click();

    // Asserts URL is correct
    cy.url().should("include", "/support");
  });

  it("allows user to submit a support ticket", () => {
    cy.visit("/support");

    // Fills out Support form
    cy.get("#task").type("Test Task");
    cy.get("#name").type("Test Name");
    cy.get("#email").type("test@email.com");
    cy.get("#priority").select("Low");
    cy.get("#tag").select("New Feature");
    cy.get("#message").type(
      "This is a test description for the support ticket."
    );

    // Clicks Submit Ticket button
    cy.get("#action-button").click();

    cy.wait(800);

    //Asserts Success Toast and message
    cy.get("li").contains("Support ticket submitted successfully!");
  });

  it("trigger email validation", () => {
    cy.visit("/support");

    // Fills out Support form
    cy.get("#task").type("Test Task");
    cy.get("#name").type("Test Name");
    cy.get("#email").type("email"); // Invalid email to trigger error
    cy.get("#priority").select("Low");
    cy.get("#tag").select("New Feature");
    cy.get("#message").type(
      "This is a test description for the support ticket."
    );

    // Clicks Submit Ticket button
    cy.get("#action-button").click();
  });
});
