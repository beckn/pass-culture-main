/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
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
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

// TODO Albéric: can be re-added when this issue is solved: https://github.com/testing-library/cypress-testing-library/issues/252
// import '@testing-library/cypress/add-commands'

Cypress.Commands.add('login', (email: string, password: string) => {
  return cy
    .visit('http://localhost:3001/connexion')
    .get('#email')
    .type(email)
    .get('#password')
    .type(password)
    .get('button[type=submit]')
    .click()
})

Cypress.Commands.add('setFeatureFlags', (features: Feature[]) => {
  return cy.request({
    method: 'PATCH',
    url: 'http://localhost:5001/testing/features',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      features,
    }),
  })
})

export {}
