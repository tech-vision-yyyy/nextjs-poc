/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const path = require("path");

require("dotenv").config({
  path: path.join(__dirname, "..", "..", ".env.local"),
});

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  console.log(`AUTH_USERNAME ${process.env.AUTH_USERNAME}`);
  console.log(`OKTA_DOMAIN ${process.env.OKTA_DOMAIN}`);
  console.log(`OKTA_CLIENT_ID ${process.env.OKTA_CLIENT_ID}`);

  config.env.auth_username = process.env.AUTH_USERNAME;
  config.env.auth_password = process.env.AUTH_PASSWORD;
  config.env.okta_domain = process.env.OKTA_DOMAIN;
  config.env.okta_client_id = process.env.OKTA_CLIENT_ID;

  return config;
};
