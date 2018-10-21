describe('Starting a new game', () => {
  
  beforeEach(() => {
    cy.visit('/')

    cy
      .get('.overlay')
      .as('overlay')
  })

  it('should prompt the user to choose a side', () => {
    cy
      .get('@overlay')
      .should('be.visible')
  })

  it('should reveal the game board after the user chooses a side', () => {
    cy.chooseSide('x')

    cy
      .get('@overlay')
      .should('not.be.visible')
  })
})