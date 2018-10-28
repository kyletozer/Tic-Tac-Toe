describe('Playing through a game', () => {
  
  beforeEach(() => {
    cy.visit('/')
    cy.chooseSide('x')
  })
  
  it('should play through a sequence and start a new game immediately after', () => {
    cy.chooseSquare(0)
    cy.chooseSquare(7)
    cy.chooseSquare(1)
    cy.chooseSquare(6)
    cy.chooseSquare(2)
    cy.chooseSide('o')
  })
})