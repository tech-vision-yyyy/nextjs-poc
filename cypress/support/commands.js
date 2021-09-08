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

import { OktaAuth } from "@okta/okta-auth-js";

Cypress.Commands.add("loginByOktaApi", (username, password) => {
  cy.request({
    method: "POST",
    url: `https://${Cypress.env("okta_domain")}/api/v1/authn`,
    body: {
      username,
      password,
    },
  }).then(({ body }) => {
    const user = body._embedded.user;
    const config = {
      issuer: `https://${Cypress.env("okta_domain")}/oauth2/default`,
      clientId: Cypress.env("okta_client_id"),
      redirectUri: "http://localhost:3000/implicit/callback",
      scope: ["openid", "email"],
    };

    const authClient = new OktaAuth(config);

    return authClient.token
      .getWithoutPrompt({ sessionToken: body.sessionToken })
      .then(({ tokens }) => {
        const userItem = {
          token: tokens.accessToken.value,
          user: {
            sub: user.id,
            email: user.profile.login,
            given_name: user.profile.firstName,
            family_name: user.profile.lastName,
            preferred_username: user.profile.login,
          },
        };

        window.localStorage.setItem("oktaCypress", JSON.stringify(userItem));

        log.snapshot("after");
        log.end();
      });
  });
});
