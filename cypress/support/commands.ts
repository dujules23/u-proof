// / <reference types="cypress" />

export {};

declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string): Chainable<void>;
    }
  }
}

Cypress.Commands.add("login", (email: string) => {
  cy.visit("/");
  cy.get("#email").type(email);
  cy.get('button[type="submit"]').click();
});
