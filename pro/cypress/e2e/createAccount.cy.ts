describe('Account creation', () => {
  it('should create account', () => {
    cy.visit('http://localhost:3001/inscription')
      .get('#lastName')
      .type('LEMOINE')
      .get('#firstName')
      .type('Jean')
      .get('#email')
      .type(`jean${Math.random()}@example.com`)
      .get('#password')
      .type('ValidPassword12!')
      .get('#countryCode')
      .select('FR')
      .get('#phoneNumber')
      .type('612345678')
      .get('#siren')
      .type('306138900')
      .get('input[name=contactOk]')
      .click()
      .get('button[type=submit]')
      .click()
      .url()
      .should('be.equal', 'http://localhost:3001/inscription/confirmation')
  })
})

export {}
