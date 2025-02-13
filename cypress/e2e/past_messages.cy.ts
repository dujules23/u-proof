describe("Past Messages", () => {
  beforeEach(() => {
    cy.login("email@email.com");
  });

  it("allows user to access past message", () => {
    // visits site
    // cy.visit("/");

    // Clicks past messages link
    cy.get('a[href*="past-messages"]').click();

    //
    cy.get("#0").should("be.visible").click();

    cy.contains("Testing");
    cy.get("button").contains("Edit");
    cy.get("button").contains("Back");
  });

  const message1 = "This is being edited to be clearer.";
  const message2 = "This is being edited again to be even better.";

  it("allows user to edit a message", () => {
    cy.get('a[href*="past-messages"]').click();

    cy.get("#0").should("be.visible").click();

    cy.get("button").contains("Edit").click();

    cy.get("#message").type(message1);

    cy.get("button").contains("Submit Edit").click();

    cy.get("li").contains("Message has been updated!");
  });

  it("allows user to go back to past messages screen", () => {
    cy.get('a[href*="past-messages"]').click();

    cy.get("#0").should("be.visible").click();

    cy.get("button").contains("Back").click();

    cy.get("h1").contains("Past Messages");
  });

  it("allows user to search for a message using search bar", () => {
    cy.get('a[href*="past-messages"]').click();

    cy.get("#search")
      .should("have.attr", "placeholder", "Search...")
      .type("Terry");

    cy.get("span").contains("Awaiting Approval");
    cy.get("div").contains("A new addition from SNK!");
  });

  it("allows user to move through past message pages", () => {
    cy.get('a[href*="past-messages"]').click();

    cy.get("#page-counter").contains("Page 1 of 3");

    cy.get("#right-arrow").click();

    cy.get("div").contains("Praise Team Updates");
    cy.get("#page-counter").contains("Page 2 of 3");

    cy.get("#left-arrow").click();

    cy.get("div").contains("Ed");
    cy.get("div").contains("Edmond");
    cy.get("div").contains("Ryu");
    cy.get("div").contains("Mai");
    cy.get("div").contains("Terry");

    cy.get("#page-counter").contains("Page 1 of 3");
  });

  it("allows user to delete a message", () => {
    cy.get('a[href*="past-messages"]').click();

    cy.get("#right-arrow").click();

    cy.wait(300);

    cy.get("#2").click();

    cy.get("button").contains("Delete").click();

    cy.get("#modal").should("be.visible");

    cy.get("button").contains("Delete").click();
  });
});
