describe("Accessing Notifications", () => {
  beforeEach(() => {
    cy.login("email@email.com");
  });

  it("can see the notification button", () => {
    cy.visit("/");

    cy.get("#notification-button").should("be.visible");
  });

  it("can view recent notifications", () => {
    cy.visit("/");

    cy.get("#notification-button").click();

    cy.get("#notification-modal").should("be.visible");

    cy.get("#notification-close").click();

    cy.get("#notification-modal").should("not.exist");
  });

  it("can delete notification and route to the message page", () => {
    cy.visit("/");

    cy.get("#notification-button").click();

    cy.get("#notification").first().click();

    cy.get("#message-container").should("be.visible");

    cy.get("#notification-close").click();
  });
});
