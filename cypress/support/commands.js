// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { signOut } from "next-auth/client";

Cypress.Commands.add("login", (email, password) => {
  cy.visit("/api/auth/signin");

  cy.get("input[name='email']").type(Cypress.env("preview_email"));
  cy.get("input[name='password']").type(Cypress.env("preview_password"));
  cy.contains("button", "Sign in with Credentials").click();
});

Cypress.Commands.add("signout", () => {
  signOut({ callbackUrl: `/` });
});
