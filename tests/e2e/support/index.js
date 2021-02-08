// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Component Testing resets
require('@cypress/vue/dist/support');

// Import commands.js using ES2015 syntax:
// import './commands'

// Alternatively you can use CommonJS syntax:
require('./commands');

// Import any global stylesheets here
// require('../../src/styles/index.scss') // 💅

// Ignore errors
Cypress.on('uncaught:exception', () => false); // https://github.com/quasarframework/quasar/issues/2233
