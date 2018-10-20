describe('A full game', () => {

  before(() => cy.visit('/'))

  it('should prompt the user to choose a side', () => {
    
    cy
      .get('.side-x')
      .click()

    cy
      .get('.overlay')
      .should('not.be.visible')
  })

  it('should place a marker on a tile that has been clicked', () => {

    cy
      .get('.square')
      .first()
      .click()
  })
})