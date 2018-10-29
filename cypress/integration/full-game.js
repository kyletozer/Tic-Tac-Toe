describe('Playing through a game', () => {
  
  beforeEach(() => {
    cy.visit('/')
    cy.startGame()
  })
  
  it('should play through a sequence and start a new game immediately after', () => {
    cy.performSequence([0, 3, 1, 4, 2])
  })
})