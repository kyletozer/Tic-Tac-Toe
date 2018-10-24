describe('Playing through a game', () => {
  
  beforeEach(() => {
    cy.visit('/')
    cy.chooseSide('x')
  })
  
  it('should play through a sequence', () => {
    cy.chooseSquare(4)
    cy.chooseSquare()
  })
})