describe("Formatting Editor End-to-End Tests", () => {
  beforeEach(() => {
    cy.login("email@email.com");
  });

  it("should apply bold formatting", () => {
    cy.get("#message").within(() => {
      cy.get("#bold-button").click();
      cy.get('[contenteditable="true"]').click().type("This is a test text.");
      cy.get('[contenteditable="true"]')
        .invoke("html")
        .should("contain", "<strong>This is a test text.</strong>");
    });
  });

  it("should apply italic formatting", () => {
    cy.get("#message").within(() => {
      cy.get("#italic-button").click();
      cy.get('[contenteditable="true"]').click().type("This is a test text.");
      cy.get('[contenteditable="true"]')
        .invoke("html")
        .should("contain", "<em>This is a test text.</em>");
    });
  });

  it("should apply strikethrough formatting", () => {
    cy.get("#message").within(() => {
      cy.get("#strikethrough-button").click();
      cy.get('[contenteditable="true"]').click().type("This is a test text.");
      cy.get('[contenteditable="true"]')
        .invoke("html")
        .should("contain", "<s>This is a test text.</s>");
    });
  });

  // Note Highlighter test requires custom class for mark tag to verify. Semantic HTML does not allow for easy selection of mark tag otherwise.
  it("should apply highlighter formatting", () => {
    cy.get("#message").within(() => {
      cy.get("#highlight-button").click();
      cy.get('[contenteditable="true"]').click().type("This is a test text.");
      cy.get('[contenteditable="true"]')
        .find("mark")
        .should("exist")
        .and("have.class", "my-custom-class");
    });
  });

  it("should apply multiple formatting styles", () => {
    cy.get("#message").within(() => {
      cy.get("#bold-button").click();
      cy.get("#italic-button").click();
      cy.get('[contenteditable="true"]').click().type("This is a test text.");
      cy.get('[contenteditable="true"]')
        .invoke("html")
        .should("contain", "<strong><em>This is a test text.</em></strong>");
    });
  });
});
